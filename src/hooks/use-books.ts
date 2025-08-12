import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { searchBooks, getBookDetail } from '@/lib/api';
import { SearchParams } from '@/types';

export function useBookSearch(params: SearchParams) {
  return useQuery({
    queryKey: ['books', 'search', params],
    queryFn: ({ signal }) => searchBooks(params, signal),
    enabled: !!params.query?.trim(),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (error?.name === 'AbortError') return false;
      return failureCount < 3;
    },
  });
}

export function useInfiniteBookSearch(params: Omit<SearchParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['books', 'infinite-search', params],
    queryFn: ({ pageParam, signal }) => 
      searchBooks({ ...params, page: pageParam }, signal),
    enabled: !!params.query?.trim(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * (params.limit || 20);
      return totalFetched < lastPage.totalItems ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    // Enable automatic request cancellation
    retry: (failureCount, error) => {
      // Don't retry cancelled requests
      if (error?.name === 'AbortError') return false;
      return failureCount < 3;
    },
  });
}

export function useBookDetail(key: string) {
  return useQuery({
    queryKey: ['books', 'detail', key],
    queryFn: ({ signal }) => getBookDetail(key, signal),
    enabled: !!key,
    staleTime: 1000 * 60 * 10,
  });
}