import type { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="mb-stack-gap-lg flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl mb-2 text-primary">{title}</h1>
        {subtitle && <p className="font-body-md text-on-surface-variant">{subtitle}</p>}
      </div>
      {actions && <div>{actions}</div>}
    </header>
  )
}
