import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.214:8000/api';

export function useAttorneys() {
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttorneys = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/attorneys/`);
        if (!response.ok) {
          throw new Error('Failed to fetch attorneys');
        }
        const data = await response.json();
        setAttorneys(data.results || data);
        setError(null);
      } catch (err) {
        console.error('Error fetching attorneys:', err);
        setError(err.message);
        setAttorneys([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttorneys();
  }, []);

  return { attorneys, loading, error };
}
