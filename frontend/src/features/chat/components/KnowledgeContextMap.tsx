import { Icon } from '@/lib/icons'

export function KnowledgeContextMap() {
  return (
    <div className="mt-8 space-y-4">
      <h4 className="px-1 font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
        Knowledge Context
      </h4>
      <div className="relative h-32 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-container-high to-surface-container-lowest opacity-60">
          <Icon name="hub" className="text-3xl text-on-surface-variant/50" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded border border-white/10 bg-surface/80 px-2 py-1 font-label-md text-[10px] backdrop-blur-sm">
            Live Relationship Map
          </span>
        </div>
      </div>
    </div>
  )
}
