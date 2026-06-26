import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: '2xl' | '3xl'
}

export function GlassCard({ className, rounded = '2xl', children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn('glass-card', rounded === '3xl' ? 'rounded-3xl' : 'rounded-2xl', className)}
      {...props}
    >
      {children}
    </div>
  )
}
