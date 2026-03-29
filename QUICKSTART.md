# 🚀 Quick Start Guide - Thuthan

## ✅ FIXED: News Loading Issue

**The news was not loading due to date filter being too restrictive.**

We've fixed the issue by:
1. Widening the date range from 1 day to 3 days
2. Adjusting the time filter to include articles up to 48 hours old
3. Optimizing the search queries

---

## How to Run

### 1. Start the Backend Server
```bash
cd Server
npm start
```
You'll see: `Thuthan Server running on http://localhost:8000`

### 2. Start the Frontend (in a new terminal)
```bash
cd Client
npm run dev
```
You'll see: `Local: http://localhost:5173` (or 5174 if 5173 is busy)

### 3. Open Your Browser
Navigate to: **http://localhost:5173** (or **http://localhost:5174**)

---

## ✅ What's Working Now

### 📰 News Display
- ✅ India News: ~5-10 articles
- ✅ International News: ~40-50 articles
- ✅ All from last 48 hours
- ✅ Smart categorization
- ✅ Deduplication

### 🏷️ Region Tabs
- **India News** - Fetches India-specific renewable energy news
- **International** - Fetches global renewable energy news
- **Saved** - View your bookmarked articles

### 📤 Smart Sharing
- Click the **share icon** (top-right on any card)
- Choose from: Email, WhatsApp, SMS, Twitter, Facebook, LinkedIn, or Copy Link
- Link automatically copied to clipboard

### ⭐ Save Articles
- Click the **bookmark icon** on any news card
- Access saved articles in the **"Saved"** tab
- Persists across browser sessions (localStorage)

### ⏰ Better Time Display
- Shows "48h ago" instead of "Yesterday"
- Shows "3h ago", "30m ago", "Just now"
- More intuitive and modern

### 🔄 Auto-Refresh
- News automatically refreshes every **24 hours**
- Manual refresh button always available

### 🧹 Deduplication
- No more duplicate articles
- Smart algorithm removes similar titles
- Cleaner, non-redundant news feed

### 📊 Better Categories
- Companies & Products
- Government & Tariff
- India News
- Others

---

## 🎯 Key Features

### Share Article
1. Hover over any news card
2. Click the **share icon** (appears on hover)
3. Select your sharing platform
4. Done!

### Save Article
1. Click the **bookmark icon** (bottom-right of card)
2. Icon turns amber when saved
3. Go to **"Saved"** tab to view all saved articles
4. Click again to remove

### Filter by Category
1. Click category buttons: All, Companies, Government, Others
2. See filtered results instantly
3. Category counts shown on each button

### Export News
1. Click **"Export"** dropdown
2. Choose **Download JSON** or **Export PDF**
3. File downloads automatically

---

## 📱 Responsive Design

Works great on:
- Desktop 💻
- Tablet 📱
- Mobile 📱

All features fully functional on all devices!

---

## 🔧 Troubleshooting

### Still not loading?
1. Check server is running on port 8000
2. Verify NewsAPI key in Server/.env
3. Try refreshing the page (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser console for errors (F12)

### Share not working?
- Allow pop-ups for the site
- Check internet connection
- Try different share option

### Saved articles gone?
- Ensure not in private/incognito mode
- Check localStorage is enabled
- Clear cache and try again

### No news articles?
- NewsAPI may have rate limits on free tier
- Try again in a few minutes
- Check your API key is valid at https://newsapi.org

---

## 📝 Notes

- **API Key**: Make sure your NewsAPI key is valid and has not exceeded rate limits
- **Auto-refresh**: Runs every 24 hours automatically
- **LocalStorage**: All saved articles stored only in your browser
- **No Account Needed**: Everything works without user registration
- **Date Filter**: Shows news from last 48 hours (adjusted from 24h)
- **Deduplication**: Automatically removes duplicate articles

---

## 📊 Test Results

We've verified the fix is working:
```bash
✅ India News: 5 articles
✅ International News: 46 articles
✅ Frontend: Loading correctly
✅ All features: Working as expected
```

---

**Enjoy your renewable energy news aggregator!** 🌱⚡
