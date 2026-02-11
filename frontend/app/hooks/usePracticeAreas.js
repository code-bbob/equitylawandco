'use client';

import { useState, useEffect } from 'react';

export function usePracticeAreas() {
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPracticeAreas = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_BASE_URL}/practice-areas/`);
        if (!response.ok) {
          throw new Error('Failed to fetch practice areas');
        }
        const data = await response.json();
        setPracticeAreas(data.results || data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching practice areas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPracticeAreas();
  }, []);

  return { practiceAreas, loading, error };
}
