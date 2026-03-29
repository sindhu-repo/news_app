import { useState, useMemo } from 'react';
import { useNews } from './hooks/useNews';
import { useSavedArticles } from './hooks/useSavedArticles';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NewsGrid from './components/NewsGrid';
import SavedArticles from './components/SavedArticles';
import ExportMenu from './components/ExportMenu';
import Toast from './components/Toast';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'saved'
  const [toast, setToast] = useState(null);
  
  const { articles, loading, error, lastUpdated, refresh } = useNews();
  const { savedArticles, saveArticle, removeArticle, isArticleSaved, getSavedCount, clearAllSaved } = useSavedArticles();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleSave = (article) => {
    if (isArticleSaved(article)) {
      removeArticle(article.url);
      showToast('Article unsaved', 'info');
    } else {
      saveArticle(article);
      showToast('Article saved!', 'success');
    }
  };

  const handleClearAllSaved = () => {
    clearAllSaved();
    showToast('All saved articles cleared', 'info');
  };

  const handleExportSuccess = (format) => {
    showToast(`${format} exported successfully!`, 'success');
  };

  const handleViewSaved = () => {
    setViewMode('saved');
  };

  const handleViewAll = () => {
    setViewMode('all');
  };

  const counts = useMemo(() => {
    const categoryCounts = articles.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {});
    return {
      total: articles.length,
      ...categoryCounts,
    };
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [articles, activeCategory]);

  const displayedArticles = viewMode === 'saved' ? savedArticles : filteredArticles;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header 
        lastUpdated={lastUpdated} 
        onRefresh={refresh} 
        loading={loading}
        savedCount={getSavedCount()}
        onViewSaved={handleViewSaved}
        onViewAll={handleViewAll}
        currentView={viewMode}
      />
      
      <div className="sticky top-[73px] z-40 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="font-medium">
                {viewMode === 'saved' 
                  ? `${savedArticles.length} saved articles`
                  : `${counts.total} articles from last 24 hours`
                }
              </span>
            </div>
            {viewMode === 'all' && (
              <ExportMenu articles={filteredArticles} onSuccess={handleExportSuccess} />
            )}
            {viewMode === 'saved' && savedArticles.length > 0 && (
              <ExportMenu articles={savedArticles} onSuccess={handleExportSuccess} />
            )}
          </div>
        </div>
      </div>

      {viewMode === 'all' && (
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          counts={counts}
        />
      )}

      <main>
        {viewMode === 'saved' ? (
          <SavedArticles
            articles={savedArticles}
            onRemove={removeArticle}
            onClearAll={handleClearAllSaved}
            onBackToAll={handleViewAll}
          />
        ) : (
          <NewsGrid
            articles={displayedArticles}
            loading={loading}
            error={error}
            onRetry={refresh}
            isSaved={isArticleSaved}
            onToggleSave={handleToggleSave}
          />
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-6 sm:py-8 mt-auto">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="flex flex-col items-center text-center gap-4 sm:gap-5">
      
      {/* Logo + Title */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>

        <div>
          <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
            Thuthan
          </span>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            India's Leading Renewable Energy News Aggregator
          </p>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full max-w-xs sm:max-w-md h-px bg-slate-200 dark:bg-slate-700"></div>

      {/* Copyright */}
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Thuthan. All rights reserved.
      </p>

    </div>
  </div>
</footer>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
