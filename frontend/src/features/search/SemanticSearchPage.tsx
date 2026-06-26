import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { EmptyState } from '@/components/shared/EmptyState'
import { usePageHeader } from '@/hooks/usePageHeader'
import { useSearch } from '@/hooks/useSearch'
import { SearchResultCard } from './components/SearchResultCard'
import { SearchFiltersBar } from './components/SearchFiltersBar'

export function SemanticSearchPage() {
  usePageHeader('Semantic Search', 'Search across your workspace')
  const { results, isLoading, hasSearched, search } = useSearch()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [tag, setTag] = useState('all')
  const [minRelevance, setMinRelevance] = useState('0')

  useEffect(() => {
    const initialQuery = searchParams.get('q')
    if (initialQuery) search(initialQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    search(query)
  }

  const filteredResults = useMemo(() => {
    return results
      .filter((r) => tag === 'all' || r.tag === tag)
      .filter((r) => r.relevance >= Number(minRelevance))
      .sort((a, b) => b.relevance - a.relevance)
  }, [results, tag, minRelevance])

  return (
    <div>
      <div className="mb-stack-gap-lg flex flex-col items-center text-center">
        <h1 className="mb-2 font-display-xl text-display-xl-mobile text-primary md:text-display-xl">
          Search your knowledge base
        </h1>
        <p className="mb-8 max-w-xl font-body-md text-on-surface-variant">
          Find concepts, not just keywords. Semantic search understands intent across your entire workspace.
        </p>
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
          <Icon name="search" className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Ask a question or describe what you're looking for..."
            className="w-full rounded-full border border-white/10 bg-surface-container/50 py-4 pl-14 pr-32 font-body-lg text-on-surface backdrop-blur-xl transition-all placeholder:text-on-surface-variant/50 focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary px-5 py-2.5 font-label-md text-label-md font-bold text-on-primary transition-all hover:brightness-90 active:scale-95"
          >
            Search
          </button>
        </form>
      </div>

      {hasSearched && (
        <SearchFiltersBar tag={tag} onTagChange={setTag} minRelevance={minRelevance} onMinRelevanceChange={setMinRelevance} />
      )}

      {isLoading && (
        <div className="mx-auto max-w-3xl space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card h-28 animate-pulse rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && hasSearched && filteredResults.length === 0 && (
        <EmptyState
          icon="search_off"
          title="No results found"
          description="Try a different phrase, or adjust your filters and search again."
        />
      )}

      {!isLoading && filteredResults.length > 0 && (
        <div className="mx-auto max-w-3xl space-y-4">
          {filteredResults.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  )
}
