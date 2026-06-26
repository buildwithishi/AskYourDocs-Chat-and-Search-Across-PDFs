import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'
import { usePageHeader } from '@/hooks/usePageHeader'
import { useDashboardStats } from '@/hooks/useDashboardStats'
import { useDocumentsStore } from '@/store/documentsStore'
import { StatsGrid } from './components/StatsGrid'
import { RecentDocumentsList } from './components/RecentDocumentsList'
import { QuickActions } from './components/QuickActions'
import { WorkspaceInsights } from './components/WorkspaceInsights'

export function DashboardPage() {
  usePageHeader('Overview', 'Welcome back')
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const allDocuments = useDocumentsStore((s) => s.documents)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const recentDocuments = useMemo(() => {
    return [...allDocuments]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 4)
  }, [allDocuments])

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/app/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Welcome back. Your document intelligence is ready."
        actions={
          <form onSubmit={handleSearchSubmit}>
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-80 lg:w-96"
              placeholder="Search knowledge base..."
            />
          </form>
        }
      />

      {stats && !statsLoading && <StatsGrid stats={stats} />}

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
        <RecentDocumentsList documents={recentDocuments} />
        <section className="space-y-stack-gap-lg">
          <QuickActions />
          {stats && (
            <WorkspaceInsights monthlyLimitPercent={stats.monthlyLimitPercent} hoursSaved={stats.hoursSaved} />
          )}
        </section>
      </div>
    </div>
  )
}
