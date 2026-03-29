import NewsCard from './NewsCard';

export default function SavedArticles({ articles, onRemove, onClearAll, onBackToAll }) {
  const handleClearAll = () => {
    if (window.confirm(`Are you sure you want to remove all ${articles.length} saved articles?`)) {
      onClearAll();
    }
  };

  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center text-center py-16">
          <div className="w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">No saved articles yet</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mb-4">
            Click the bookmark icon on any article to save it for later. Your saved articles will appear here and persist across sessions.
          </p>
          <button
            onClick={onBackToAll}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Back to All News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Saved Articles</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {articles.length} article{articles.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
          >
            Clear All
          </button>
          <button
            onClick={onBackToAll}
            className="px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors duration-200"
          >
            Back to All News
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={article.url} className="relative group">
            <NewsCard 
              article={article} 
              index={index}
              isSaved={true}
              onToggleSave={() => onRemove(article.url)}
            />
            <div className="absolute top-2 left-2 z-10">
              <div className="p-1.5 bg-amber-500 text-white rounded-lg shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
