const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const fetchNews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
