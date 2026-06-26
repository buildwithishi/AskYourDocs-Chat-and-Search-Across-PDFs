import type { ReactNode } from 'react'
import { Icon } from '@/lib/icons'

export interface EmptyStateProps {
  icon: string
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <Icon name={icon} className="text-3xl text-on-surface-variant" />
      </div>
      <h3 className="font-headline-md text-headline-md mb-2 text-primary">{title}</h3>
      {description && <p className="max-w-md text-on-surface-variant">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
