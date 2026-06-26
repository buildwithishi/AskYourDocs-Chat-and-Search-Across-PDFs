import type { ReactNode } from 'react'

export interface AuthCardProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="font-headline-lg text-headline-lg text-primary">{title}</h1>
        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
      </div>
      {children}
      {footer && <div className="mt-6 text-center font-body-md text-body-md text-on-surface-variant">{footer}</div>}
    </div>
  )
}
