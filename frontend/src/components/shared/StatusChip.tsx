import { cn } from '@/lib/cn'
import type { DocumentStatus } from '@/types/document'

const STATUS_CONFIG: Record<DocumentStatus, { label: string; dot: string; text: string; pulse?: boolean }> = {
  processing: { label: 'Processing', dot: 'bg-primary', text: 'text-primary', pulse: true },
  indexing: { label: 'Indexing', dot: 'bg-primary', text: 'text-primary', pulse: true },
  ready: { label: 'Ready', dot: 'bg-green-500', text: 'text-on-surface-variant' },
}

export interface StatusChipProps {
  status: DocumentStatus
  className?: string
}

export function StatusChip({ status, className }: StatusChipProps) {
  const config = STATUS_CONFIG[status]
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-2 py-0.5',
        className,
      )}
    >
      <div className={cn('h-1.5 w-1.5 rounded-full', config.dot, config.pulse && 'animate-pulse-dot')} />
      <span className={cn('font-label-md text-[10px] uppercase tracking-wider', config.text)}>
        {config.label}
      </span>
    </div>
  )
}
