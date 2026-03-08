import { useState, useEffect, useCallback } from 'react';
import { getWomen, getFeatured } from '../utils/api';

export function useWomen(initialParams = {}) {
  const [women, setWomen] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchWomen = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getWomen(params);
      setWomen(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchWomen();
  }, [fetchWomen]);

  return {
    women,
    pagination,
    loading,
    error,
    params,
    setParams,
    refetch: fetchWomen,
  };
}

export function useFeatured() {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeatured()
      .then((res) => setFeatured(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to fetch featured'))
      .finally(() => setLoading(false));
  }, []);

  return { featured, loading, error };
}
