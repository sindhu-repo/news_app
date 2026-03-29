# Thuthan - Renewable Energy News Aggregator

A powerful news aggregator that automatically fetches and displays the latest renewable energy news from India and across the globe, with smart categorization, deduplication, and modern sharing capabilities.

## ✨ Features

### 📰 News Aggregation
- **Dual Region Support**: Separate tabs for India and International renewable energy news
- **Smart Categorization**: Automatically classifies news into:
  - Companies & Products
  - Government & Tariff
  - International News
  - Others
- **Deduplication**: Removes duplicate articles based on title similarity
- **24-Hour Filter**: Only shows news from the last 24 hours
- **Auto-Refresh**: Automatically refreshes every 24 hours

### 📤 Sharing Capabilities
- **Multiple Share Options**:
  - Email
  - WhatsApp
  - SMS
  - Twitter/X
  - Facebook
  - LinkedIn
  - Copy Link
- **Single Icon Trigger**: Click share icon to reveal all options
- **Instant Copy**: Copy link to clipboard with visual feedback

### ⭐ Save Articles
- **LocalStorage Persistence**: Save articles to your browser
- **Saved Tab**: View all your saved articles in one place
- **Quick Toggle**: Click bookmark icon to save/unsave
- **Persistent Across Sessions**: Saved articles remain after browser close

### 🎨 User Experience
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Time Display**: Shows "24h ago", "3h ago", "Just now" instead of dates
- **Loading Skeletons**: Smooth loading states
- **Error Handling**: User-friendly error messages with retry options
- **Export Options**: Download news as PDF or JSON

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- NewsAPI account (free at https://newsapi.org)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NewsApp
   ```

2. **Install Server Dependencies**
   ```bash
   cd Server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd Client
   npm install
   ```

4. **Configure Environment**
   
   Create or update `Server/.env`:
   ```env
   PORT=8000
   NEWS_API_KEY=your_newsapi_key_here
   ```
   
   Create or update `Client/.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

5. **Get Your NewsAPI Key**
   - Visit https://newsapi.org/register
   - Sign up for a free account
   - Copy your API key
   - Paste it in the Server/.env file

### Running the Application

1. **Start the Server**
   ```bash
   cd Server
   npm start
   ```
   Server runs on: http://localhost:8000

2. **Start the Client** (in a new terminal)
   ```bash
   cd Client
   npm run dev
   ```
   Client runs on: http://localhost:5173

3. **Open in Browser**
   Navigate to http://localhost:5173

## 🏗️ Project Structure

```
NewsApp/
├── Server/
│   ├── Server.js           # Backend API server
│   ├── package.json        # Server dependencies
│   └── .env                # Environment variables
│
└── Client/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx           # App header with region tabs
    │   │   ├── CategoryFilter.jsx   # Category filter buttons
    │   │   ├── NewsCard.jsx          # Individual news card
    │   │   ├── NewsGrid.jsx         # Grid of news cards
    │   │   ├── ShareMenu.jsx        # Share dropdown menu
    │   │   ├── SavedArticles.jsx    # Saved articles view
    │   │   ├── ExportMenu.jsx       # Export options menu
    │   │   └── Toast.jsx            # Toast notifications
    │   │
    │   ├── hooks/
    │   │   ├── useNews.js           # Fetch and manage news data
    │   │   └── useSavedArticles.js  # Manage localStorage saved articles
    │   │
    │   ├── services/
    │   │   └── api.js               # API calls to backend
    │   │
    │   ├── App.jsx                  # Main application component
    │   └── main.jsx                 # React entry point
    │
    ├── package.json        # Client dependencies
    └── vite.config.js     # Vite configuration
```

## 🎯 Usage Guide

### Switching Regions
- Click **"India News"** tab for India-specific renewable energy news
- Click **"International"** tab for global renewable energy news
- Click **"Saved"** tab to view your saved articles

### Filtering by Category
- Use category buttons to filter news by type
- Categories: All, Companies & Products, Government & Tariff, Others

### Sharing Articles
1. Hover over any news card
2. Click the **share icon** (top-right corner)
3. Select your preferred sharing method

### Saving Articles
1. Click the **bookmark icon** on any news card
2. Article is saved to your browser's localStorage
3. Access saved articles via the **"Saved"** tab

### Exporting News
1. Click the **"Export"** dropdown in the header
2. Choose between **JSON** (raw data) or **PDF** (formatted document)
3. File downloads automatically

### Refreshing News
- Click the **"Refresh"** button to fetch latest news
- News automatically refreshes every 24 hours

## 🔧 API Endpoints

### GET /api/news
Fetches renewable energy news articles.

**Query Parameters:**
- `region` (optional): `'india'` or `'international'`

**Example:**
```bash
GET http://localhost:8000/api/news?region=india
```

**Response:**
```json
{
  "success": true,
  "count": 50,
  "region": "india",
  "data": [
    {
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "source": "News Source",
      "category": "Companies & Products",
      "publishedAt": "2024-01-15T10:30:00Z",
      "region": "india"
    }
  ]
}
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **jsPDF** - PDF export

### Backend
- **Express.js** - Web server
- **Node.js** - Runtime
- **NewsAPI** - News data source

### Features Implemented
- Real-time news aggregation
- Smart deduplication algorithm
- Intelligent categorization
- localStorage persistence
- Multiple sharing platforms
- Auto-refresh mechanism
- Export to PDF/JSON

## 📊 News Categories Explained

### Companies & Products
News about:
- Company mergers, acquisitions, IPOs
- Product launches
- Revenue reports
- Partnerships
- Manufacturing facilities

### Government & Tariff
News about:
- Government policies
- Tariffs and subsidies
- Ministry announcements
- Regulatory changes
- International agreements

### International News
News specifically about:
- India's renewable energy sector
- Indian companies and projects
- India-specific policies

### Others
All other renewable energy news that doesn't fit the above categories.

## 🔒 Data Privacy

- **LocalStorage Only**: Saved articles are stored only in your browser
- **No Server Storage**: We don't store any user data on the server
- **NewsAPI Source**: All news is sourced from NewsAPI
- **No Tracking**: We don't track or share any user activity

## 🚨 Troubleshooting

### "Failed to fetch news"
- Check if the server is running on port 8000
- Verify your NewsAPI key is valid
- Check your internet connection
- Try refreshing the page

### News not loading
- Ensure NewsAPI key has proper permissions
- Check if you've exceeded API rate limits
- Try restarting the server

### Saved articles not persisting
- Check if localStorage is enabled in your browser
- Ensure you're not in private/incognito mode
- Clear browser cache and try again

### Export not working
- Ensure pop-ups are allowed for the site
- Check if you have write permissions
- Try a different browser

## 📝 License

This project is built for educational and demonstration purposes.

## 🙏 Acknowledgments

- **NewsAPI** for providing news data
- **React** community for excellent documentation
- **Tailwind CSS** for beautiful styling utilities

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Dark mode support
- [ ] Email notifications for breaking news
- [ ] Search functionality
- [ ] Custom category filters
- [ ] Article bookmark folders
- [ ] Social media integration
- [ ] Mobile app version
- [ ] News reading time estimate
- [ ] Related articles suggestions
- [ ] Multiple language support

---

**Built with ❤️ for renewable energy enthusiasts**

*Last updated: March 2026*
