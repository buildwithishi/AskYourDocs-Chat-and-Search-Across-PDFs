import { useState } from 'react'
import { semanticSearch } from '@/mocks/api/search'
import type { SearchResult } from '@/types/search'

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  async function search(query: string) {
    setIsLoading(true)
    setHasSearched(true)
    const data = await semanticSearch(query)
    setResults(data)
    setIsLoading(false)
  }

  return { results, isLoading, hasSearched, search }
}
