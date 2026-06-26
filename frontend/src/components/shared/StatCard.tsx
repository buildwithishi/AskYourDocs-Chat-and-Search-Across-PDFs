import type { ReactNode } from 'react'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { GlassCard } from './GlassCard'

export interface StatCardProps {
  icon: string
  iconClassName?: string
  badge: ReactNode
  badgeClassName?: string
  glowClassName?: string
  label: string
  value: string
}

export function StatCard({ icon, iconClassName, badge, badgeClassName, glowClassName, label, value }: StatCardProps) {
  return (
    <GlassCard className="group relative overflow-hidden p-6">
      <div className={cn('absolute -right-4 -top-4 h-24 w-24 blur-3xl transition-all', glowClassName)} />
      <div className="mb-4 flex items-start justify-between">
        <Icon name={icon} className={cn('text-on-surface-variant', iconClassName)} />
        <span
          className={cn(
            'rounded bg-white/5 px-2 py-0.5 font-label-md text-[10px] uppercase tracking-wider text-on-surface-variant',
            badgeClassName,
          )}
        >
          {badge}
        </span>
      </div>
      <div className="space-y-1">
        <p className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">{label}</p>
        <p className="font-headline-lg text-headline-lg text-primary">{value}</p>
      </div>
    </GlassCard>
  )
}
