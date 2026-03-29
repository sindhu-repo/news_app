import { useState } from 'react';
import ShareMenu from './ShareMenu';

const categoryStyles = {
  'Companies & Products': {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  'Government & Tariff': {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
  },
  'International News': {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
  'India News': {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
  },
  Others: {
    bg: 'bg-slate-100 dark:bg-slate-700',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-600',
  },
};

export default function NewsCard({ article, index, isSaved, onToggleSave, showRemoveButton, onRemove }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const categoryStyle = categoryStyles[article.category] || categoryStyles['Others'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('.share-menu')) {
      return;
    }
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    onToggleSave(article);
  };

  const handleShareCopied = () => {
    console.log('Link copied!');
  };

  const hasValidImage = article.urlToImage && !imageError;

  return (
    <article
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered
          ? 'shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 -translate-y-1'
          : 'shadow-sm'
      }`}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.5s ease forwards',
        opacity: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-700">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 animate-pulse" />
        )}
        
        {hasValidImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600">
            <div className="text-center text-white p-4">
              <svg className="w-14 h-14 mx-auto mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-xs font-semibold opacity-75">Renewable Energy</p>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 flex items-center gap-2 transition-opacity duration-200">
          <div className="share-menu">
            <ShareMenu article={article} onCopied={handleShareCopied} />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3">
          <span
            className={`inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
          >
            {article.category}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200 leading-snug">
          {article.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 sm:line-clamp-3 mb-4 leading-relaxed">
          {article.description || 'No description available for this article.'}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shrink-0">
              <span className="text-[8px] sm:text-[10px] font-bold text-white">
                {article.source?.[0]?.toUpperCase() || 'N'}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
              {article.source}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSaveClick}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isSaved
                  ? 'text-amber-500 hover:text-amber-600 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                  : 'text-slate-400 dark:text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              aria-label={isSaved ? 'Remove from saved' : 'Save article'}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill={isSaved ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            
            <button
              className="flex items-center gap-1 text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                window.open(article.url, '_blank', 'noopener,noreferrer');
              }}
            >
              <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">Read more</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </article>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse">
      <div className="h-48 sm:h-56 bg-gradient-to-br from-slate-200 dark:from-slate-700 to-slate-300 dark:to-slate-600" />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="h-5 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
        <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
