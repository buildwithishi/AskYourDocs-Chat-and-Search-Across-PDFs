import { useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { GlassCard } from '@/components/shared/GlassCard'
import { toast } from '@/lib/toast'
import type { SearchResult } from '@/types/search'
import { RelevanceBadge } from './RelevanceBadge'

export function SearchResultCard({ result }: { result: SearchResult }) {
  const navigate = useNavigate()

  function handleOpen() {
    toast.info(`Opening "${result.documentName}" in chat with this context...`)
    navigate('/app/chat')
  }

  return (
    <GlassCard onClick={handleOpen} className="cursor-pointer rounded-2xl p-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name={result.icon} className="text-secondary" />
          <span className="font-body-md font-semibold text-primary">{result.documentName}</span>
          <span className="rounded border border-white/5 bg-white/5 px-2 py-0.5 font-label-md text-[10px] text-on-surface-variant">
            {result.tag}
          </span>
        </div>
        <span className="font-label-md text-xs text-on-surface-variant">{result.pageRef}</span>
      </div>
      <p className="mb-4 font-body-md text-sm text-on-surface-variant">{result.snippet}</p>
      <RelevanceBadge relevance={result.relevance} />
    </GlassCard>
  )
}
