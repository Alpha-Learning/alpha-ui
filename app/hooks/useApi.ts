"use client";
import { useState, useEffect, useCallback } from 'react';
import { ApiErrorHandler, withErrorHandling } from '../services/api/errorHandler';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await withErrorHandling(apiCall, 'useApi');
    
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setData(result.data);
    }
    
    setLoading(false);
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export interface UseApiMutationState<T, P = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  mutate: (params?: P) => Promise<T | null>;
  reset: () => void;
}

export function useApiMutation<T, P = any>(
  apiCall: (params?: P) => Promise<T>
): UseApiMutationState<T, P> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params?: P): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    const result = await withErrorHandling(() => apiCall(params), 'useApiMutation');
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return null;
    } else if (result.data) {
      setData(result.data);
      setLoading(false);
      return result.data;
    }
    
    setLoading(false);
    return null;
  }, [apiCall]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  };
}

// Hook for handling paginated data
export interface UsePaginatedApiState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  page: number;
  totalPages: number;
  total: number;
}

export function usePaginatedApi<T>(
  apiCall: (page: number, limit: number) => Promise<{
    data: T[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }>,
  limit: number = 10
): UsePaginatedApiState<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = useCallback(async (pageNum: number, append: boolean = false) => {
    setLoading(true);
    setError(null);
    
    const result = await withErrorHandling(() => apiCall(pageNum, limit), 'usePaginatedApi');
    
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      if (append) {
        setData(prev => [...prev, ...result.data!.data]);
      } else {
        setData(result.data.data);
      }
      setTotalPages(result.data.meta.totalPages);
      setTotal(result.data.meta.total);
      setHasMore(result.data.meta.hasNext);
    }
    
    setLoading(false);
  }, [apiCall, limit]);

  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchData(nextPage, true);
    }
  }, [hasMore, loading, page, fetchData]);

  const refresh = useCallback(async () => {
    setPage(1);
    await fetchData(1, false);
  }, [fetchData]);

  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    page,
    totalPages,
    total,
  };
}

// Hook for handling real-time data updates
export function useRealtimeApi<T>(
  apiCall: () => Promise<T>,
  interval: number = 30000, // 30 seconds default
  dependencies: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const result = await withErrorHandling(apiCall, 'useRealtimeApi');
    
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setData(result.data);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
    setLoading(false);
    
    const intervalId = setInterval(fetchData, interval);
    
    return () => clearInterval(intervalId);
  }, [fetchData, interval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
