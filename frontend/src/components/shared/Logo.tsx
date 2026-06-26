import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'

export interface LogoProps {
  subtitle?: string
  className?: string
}

export function Logo({ subtitle = 'Enterprise AI', className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container">
        <Icon name="description" filled className="text-on-primary-container" />
      </div>
      <div>
        <h2 className="font-headline-md text-headline-md leading-tight text-primary">AskYourDocs</h2>
        <p className="text-[10px] font-label-md uppercase tracking-widest text-on-surface-variant">{subtitle}</p>
      </div>
    </div>
  )
}
