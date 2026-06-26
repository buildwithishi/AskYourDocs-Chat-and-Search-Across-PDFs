import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function GlassPanel({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('glass-panel rounded-2xl', className)} {...props}>
      {children}
    </div>
  )
}
