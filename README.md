# Thuthan - Renewable Energy News Aggregator

A web-based application that automatically fetches and displays the latest renewable energy news from India and across the globe. It provides real-time updates with smart categorization, duplicate removal, and modern sharing features.

## ✨ Features

* Real-time news fetching using Currents API
* Displays only the latest 24-hour news
* Automatic categorization (Companies & Products, Government & Tariff, International News, Others)
* Removes duplicate or similar news articles
* Clean and user-friendly interface with headline, summary, and source link
* Category-based filtering
* Dark mode support
* Save articles using browser localStorage
* Share news via multiple platforms (WhatsApp, Email, LinkedIn, etc.)
* Export news as PDF

## 🚀 Setup Instructions

1. Download and extract the project ZIP file

2. Open the project folder in Visual Studio Code

3. Install Node.js (if not installed)
   Check installation:

   ```
   node -v
   npm -v
   ```

4. Install dependencies

   Backend:

   ```
   cd server
   npm install
   ```

   Frontend:

   ```
   cd client
   npm install
   ```

5. Add API Key

   Create a `.env` file inside the **server** folder and add:

   ```
   CURRENTS_API_KEY=your_api_key_here
   ```

   Get API key:

   * Go to https://currentsapi.services
   * Sign up and login
   * Copy your API key

6. Run the application

   Backend:

   ```
   cd server
   node --watch server.js
   ```

   Frontend:

   ```
   cd client
   npm run dev
   ```

7. Open browser:

   ```
   http://localhost:5173
   ```

## 🛠️ Tech Stack

Frontend:

* React
* Vite
* Tailwind CSS

Backend:

* Node.js
* Express.js

API:

* Currents API

Other:

* jsPDF (PDF export)
* LocalStorage (Save articles)
