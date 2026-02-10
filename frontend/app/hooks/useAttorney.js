import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.214:8000/api';

export function useAttorney(slugOrId) {
  const [attorney, setAttorney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slugOrId) {
      setLoading(false);
      return;
    }

    const fetchAttorney = async () => {
      try {
        setLoading(true);
        // Backend viewset now handles both slug (name) and ID lookups
        const url = `${API_BASE_URL}/attorneys/${slugOrId}/`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Attorney not found');
        }
        const data = await response.json();
        setAttorney(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching attorney:', err);
        setError(err.message);
        setAttorney(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAttorney();
  }, [slugOrId]);

  return { attorney, loading, error };
}
