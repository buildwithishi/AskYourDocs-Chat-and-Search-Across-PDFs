import type { ChatSource } from '@/types/chat'
import { SourceCard } from './SourceCard'
import { KnowledgeContextMap } from './KnowledgeContextMap'

export function SourcesPanel({ sources }: { sources: ChatSource[] }) {
  return (
    <aside className="glass-panel hidden h-full w-80 flex-shrink-0 flex-col border-l border-white/5 px-6 py-stack-gap-lg xl:flex">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-headline-md text-headline-md text-primary">Sources</h3>
        <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-widest text-on-surface-variant">
          {sources.length} Documents
        </span>
      </div>
      <div className="custom-scrollbar space-y-4 overflow-y-auto pr-2">
        {sources.map((source) => (
          <SourceCard key={source.id} source={source} />
        ))}
        <KnowledgeContextMap />
      </div>
    </aside>
  )
}
