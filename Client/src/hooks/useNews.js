import { useState, useEffect, useCallback } from 'react';
import { fetchNews } from '../services/api';

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNews();
      if (data.success) {
        setArticles(data.data);
        setLastUpdated(new Date());
      } else {
        throw new Error(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  useEffect(() => {
    const AUTO_REFRESH_INTERVAL = 24 * 60 * 60 * 1000;
    
    const interval = setInterval(() => {
      console.log('Auto-refreshing news...');
      loadNews();
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [loadNews]);

  return { articles, loading, error, lastUpdated, refresh: loadNews };
};
