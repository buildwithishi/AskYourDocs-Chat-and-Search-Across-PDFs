import type { InputHTMLAttributes } from 'react'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'

export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn('group relative', className)}>
      <Icon
        name="search"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary"
      />
      <input
        type="text"
        className="w-full rounded-full border border-white/10 bg-surface-container/50 py-3 pl-12 pr-6 font-body-md text-on-surface backdrop-blur-xl transition-all placeholder:text-on-surface-variant/60 focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/30"
        {...props}
      />
    </div>
  )
}
