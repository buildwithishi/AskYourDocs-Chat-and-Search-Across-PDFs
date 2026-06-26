import { Icon } from '@/lib/icons'

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-surface-container-low/60 px-5 py-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Icon name="smart_toy" filled size={18} className="text-surface" />
      </div>
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-on-surface-variant [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-on-surface-variant [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-on-surface-variant" />
      </div>
    </div>
  )
}
