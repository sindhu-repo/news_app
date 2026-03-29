import { useState, useEffect } from 'react';

const STORAGE_KEY = 'thuthan_saved_articles';

export const useSavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedArticles(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading saved articles:', error);
      setSavedArticles([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArticles));
      } catch (error) {
        console.error('Error saving articles:', error);
      }
    }
  }, [savedArticles, isLoaded]);

  const saveArticle = (article) => {
    if (!isArticleSaved(article)) {
      setSavedArticles(prev => [article, ...prev]);
      return true;
    }
    return false;
  };

  const removeArticle = (articleUrl) => {
    setSavedArticles(prev => prev.filter(a => a.url !== articleUrl));
  };

  const isArticleSaved = (article) => {
    return savedArticles.some(a => a.url === article.url);
  };

  const clearAllSaved = () => {
    setSavedArticles([]);
  };

  const getSavedCount = () => savedArticles.length;

  return {
    savedArticles,
    saveArticle,
    removeArticle,
    isArticleSaved,
    clearAllSaved,
    getSavedCount,
    isLoaded
  };
};
