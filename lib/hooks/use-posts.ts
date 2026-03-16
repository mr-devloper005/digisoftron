'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchPosts,
  fetchFeaturedPosts,
  fetchTrendingPosts,
  fetchLatestListings,
  fetchPost,
  fetchPostsByType,
  fetchSearchResults,
} from '@/lib/api/posts'
import type { FeaturedResponse, TrendingResponse, Listing, Post } from '@/types/post'

const realtimeQueryOptions = {
  staleTime: 0,
  refetchOnMount: 'always' as const,
  refetchOnWindowFocus: true,
}

type QueryOptions<T> = {
  enabled?: boolean
  initialData?: T
}

export function usePosts(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['posts', page, pageSize],
    queryFn: () => fetchPosts(page, pageSize),
    ...realtimeQueryOptions,
  })
}

export function useFeaturedPosts(options: QueryOptions<FeaturedResponse> = {}) {
  return useQuery({
    queryKey: ['featured-posts'],
    queryFn: fetchFeaturedPosts,
    ...realtimeQueryOptions,
    ...options,
  })
}

export function useTrendingPosts(options: QueryOptions<TrendingResponse> = {}) {
  return useQuery({
    queryKey: ['trending-posts'],
    queryFn: fetchTrendingPosts,
    ...realtimeQueryOptions,
    ...options,
  })
}

export function useLatestListings(options: QueryOptions<Listing[]> = {}) {
  return useQuery({
    queryKey: ['latest-listings'],
    queryFn: fetchLatestListings,
    ...realtimeQueryOptions,
    ...options,
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
    ...realtimeQueryOptions,
  })
}

export function usePostsByType(type: Post['type']) {
  return useQuery({
    queryKey: ['posts-by-type', type],
    queryFn: () => fetchPostsByType(type),
    ...realtimeQueryOptions,
  })
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchSearchResults(query),
    enabled: query.length >= 2,
    ...realtimeQueryOptions,
  })
}
