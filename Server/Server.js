import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { exec } from "child_process";
import { promisify } from "util";

dotenv.config();

const execPromise = promisify(exec);

async function fetchURL(url) {
  try {
    const { stdout } = await execPromise('curl -s "' + url + '"');
    return JSON.parse(stdout);
  } catch (err) {
    throw new Error('Fetch failed: ' + err.message);
  }
}

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: [
    "https://news-app-thuthan-frontend.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET"],
  credentials: true
}));
app.use(express.json());

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isDuplicate(seenTitles, title) {
  const normalized = normalizeTitle(title);
  
  for (const seen of seenTitles) {
    if (normalized === seen) return true;
    
    const words = normalized.split(' ');
    const seenWords = seen.split(' ');
    const commonWords = words.filter(w => seenWords.includes(w));
    
    if (commonWords.length >= 4 && 
        (commonWords.length / words.length) > 0.6) {
      return true;
    }
  }
  
  return false;
}

function categorizeNews(article) {
  const text = (article.title + ' ' + (article.description || '')).toLowerCase();
  
  const govKeywords = [
    'government', 'policy', 'tariff', 'minister', 'ministry', 
    'subsidy', 'regulation', 'order', ' bill ', 'act ', 
    'commission', 'department', 'mou ', ' agreement ', 
    'pm-kusum', 'pm-kisan', 'gst', 'duty', 'tax benefit',
    'renewable purchase obligation', 'rpo', 'cea', 'mnre',
    'government', 'minister', 'regulation', 'commission'
  ];
  
  const companyKeywords = [
    'company', 'companies', 'product', 'launch', ' launches ',
    'merger', 'acquisition', 'ipo', 'stock', 'share', 
    'revenue', 'quarterly', 'annual report', 'ceo', 
    'funding', 'investment', 'partnership', 'deal',
    'solar panel', 'inverter', 'battery', 'turbine',
    'factory', 'manufacturing', 'plant ', 'project',
    'opens ', 'unveils', 'announces', 'reports'
  ];
  
  const internationalKeywords = [
    'china', 'usa', 'us ', 'uk', 'europe', 'european', 'australia', 
    'japan', 'germany', 'france', 'brazil', 'africa', 'southeast asia',
    'middle east', 'russia', 'global', 'worldwide', 'international'
  ];
  
  if (companyKeywords.some(keyword => text.includes(keyword))) {
    return "Companies & Products";
  }
  
  if (govKeywords.some(keyword => text.includes(keyword))) {
    return "Government & Tariff";
  }
  
  if (internationalKeywords.some(keyword => text.includes(keyword))) {
    return "International News";
  }
  
  return "Others";
}

function isWithinLast24Hours(dateString) {
  const articleDate = new Date(dateString);
  const now = new Date();
  const diffInHours = (now - articleDate) / (1000 * 60 * 60);
  return diffInHours >= 0 && diffInHours <= 24;
}

function removeDuplicates(articles) {
  const seenTitles = [];
  const seenUrls = new Set();
  
  return articles.filter(article => {
    if (!article.title || article.title === '[Removed]') {
      return false;
    }
    
    if (seenUrls.has(article.url)) {
      return false;
    }
    
    if (isDuplicate(seenTitles, article.title)) {
      return false;
    }
    
    seenTitles.push(normalizeTitle(article.title));
    seenUrls.add(article.url);
    return true;
  });
}

function isRenewableEnergyArticle(article) {
  const title = (article.title || '').toLowerCase();
  const description = (article.description || '').toLowerCase();
  const text = title + ' ' + description;
  
  const strongRenewableKeywords = [
    'solar panel', 'solar farm', 'solar park', 'solar plant', 'solar power', 'solar energy', 'solar project', 'solar module', 'solar inverter', 'solar manufacturer',
    'wind turbine', 'wind farm', 'wind park', 'wind power', 'wind energy', 'wind project',
    'hydropower', 'hydroelectric', 'hydro power', 'hydropower plant',
    'battery storage', 'battery energy', 'bess', 'energy storage system',
    'ev battery', 'electric vehicle', 'electric car', 'ev charging', 'ev charging station',
    'green hydrogen', 'hydrogen fuel', 'hydrogen energy',
    'renewable energy', 'clean energy project',
    'solar rooftop', 'solar installation'
  ];
  
  const weakRenewableKeywords = [
    'solar', 'wind', 'renewable', 'ev ', 'electric vehicle', 'clean energy', 
    'green energy', 'sustainable energy', 'hydropower', 'battery', 'hydrogen'
  ];
  
  const irrelevantKeywords = [
    'stock market', 'sensex', 'nifty', 'market cap', 'share price', 'stocks', 'trading', 'dividend', 'bonus issue', 'ipo ', 'quarterly results', 'stock analysis',
    'smartphone', 'phone', 'oneplus', 'samsung', 'apple iphone', 'android', 'mobile phone', 'gadget', 'laptop', 'tech review',
    'celebrity', 'actor', 'actress', 'singer', 'bollywood', 'hollywood', 'movie', 'concert', 'fashion', 'clothing', 'jeans', 'dresses', 'style',
    'politics', 'election', 'vote', 'minister', 'government scheme', 'budget', 'tax change',
    'sports', 'cricket', 'football', 'ipl', 'match', 'player', 'tournament',
    'entertainment', 'news', 'weather', 'climate change', 'global warming',
    'cryptocurrency', 'bitcoin', 'crypto', 'nft',
    'recipe', 'food', 'restaurant', 'cooking', 'health', 'fitness', 'diet',
    'real estate', 'property', 'housing', 'home loan',
    'education', 'exam', 'college', 'university', 'student',
    'developer', 'programming', 'software', 'coding', 'tutorial', 'how to',
    'advertisement', 'advertising', 'promo', 'discount', 'sale', 'offer',
    'car review', 'vehicle review', 'bike review', 'scooter review'
  ];
  
  const hasIrrelevantKeyword = irrelevantKeywords.some(kw => text.includes(kw));
  if (hasIrrelevantKeyword) {
    return false;
  }
  
  const hasStrongRenewableKeyword = strongRenewableKeywords.some(kw => text.includes(kw));
  if (hasStrongRenewableKeyword) {
    return true;
  }
  
  const weakCount = weakRenewableKeywords.filter(kw => text.includes(kw)).length;
  return weakCount >= 2;
}

async function fetchCurrentsAPI(query) {
  const url = `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(query)}&language=en&max-results=20&apiKey=${process.env.CURRENTS_API_KEY}`;
  
  console.log(`Fetching: ${query}`);
  
  try {
    const data = await fetchURL(url);
    
    if (data.status !== "ok") {
      console.error(`Currents error for "${query}":`, data.error);
      return [];
    }
    
    if (data.news) {
      console.log(`  -> Got ${data.news.length} articles`);
      return data.news.map(article => ({
        title: article.title || '',
        description: article.description || '',
        url: article.url || '',
        urlToImage: article.image || null,
        pubDate: article.published || new Date().toISOString(),
        source: article.author || 'Unknown'
      }));
    }
    return [];
  } catch (err) {
    console.error(`Error fetching Currents for "${query}":`, err.message);
    return [];
  }
}

async function fetchNews() {
  const indiaQueries = [
    "renewable energy India",
    "solar energy India",
    "wind energy India",
    "electric vehicle India",
    "clean energy India",
    "solar panel India",
    "battery storage India",
    "green hydrogen India",
    "ev India",
    "hydropower India"
  ];
  
  const globalQueries = [
    "renewable energy",
    "solar energy",
    "wind energy",
    "electric vehicle",
    "clean energy"
  ];
  
  const allArticles = [];
  
  console.log('Fetching news from Currents API...');
  
  console.log('Fetching India-specific news...');
  for (const query of indiaQueries) {
    const articles = await fetchCurrentsAPI(query);
    allArticles.push(...articles);
    console.log(`Fetched ${articles.length} articles for: ${query}`);
  }
  
  console.log('Fetching global news...');
  for (const query of globalQueries) {
    const articles = await fetchCurrentsAPI(query);
    allArticles.push(...articles);
    console.log(`Fetched ${articles.length} articles for: ${query}`);
  }
  
  console.log(`Total articles before filtering: ${allArticles.length}`);
  
  const articlesWithTime = allArticles.map(article => {
    const pubDate = new Date(article.pubDate);
    const now = new Date();
    return {
      ...article,
      publishedAt: pubDate.toISOString(),
      hoursAgo: (now - pubDate) / (1000 * 60 * 60)
    };
  });
  
  const recentArticles = articlesWithTime.filter(a => a.hoursAgo >= 0 && a.hoursAgo < 24);
  console.log(`Articles within 24 hours: ${recentArticles.length}`);
  
  const filteredArticles = recentArticles
    .filter(article => article.title && article.title.length > 10)
    .filter(article => isRenewableEnergyArticle(article));
  
  console.log(`After relevance filter: ${filteredArticles.length}`);
  
  return removeDuplicates(filteredArticles);
}

app.get("/", (req, res) => {
  res.send("Thuthan - Renewable Energy News Aggregator");
});

app.get("/api/news", async (req, res) => {
  try {
    const articles = await fetchNews();
    
    const categorizedNews = articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage || null,
      source: article.source,
      category: categorizeNews(article),
      publishedAt: article.publishedAt
    }));
    
    res.json({
      success: true,
      count: categorizedNews.length,
      data: categorizedNews
    });
    
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching news"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Thuthan Server running on http://localhost:${PORT}`);
});