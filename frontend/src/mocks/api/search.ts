import { request } from './client'
import { searchResults } from '@/mocks/data/search'
import type { SearchResult } from '@/types/search'

export function semanticSearch(query: string) {
  if (!query.trim()) return request<SearchResult[]>(() => [], 0)
  return request<SearchResult[]>(() => searchResults, 500)
}
