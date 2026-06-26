import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/shared/Logo'
import { mainNavItems } from './navItems'
import { NotificationsMenu } from './NotificationsMenu'
import { UserMenu } from './UserMenu'

export interface TopBarProps {
  title: string
  meta?: string
}

export function TopBar({ title, meta }: TopBarProps) {
  const navigate = useNavigate()
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-surface/80 px-margin-mobile shadow-[0_0_20px_rgba(255,255,255,0.03)] backdrop-blur-xl md:left-64 md:px-margin-desktop">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="rounded-lg p-2 text-on-surface-variant hover:bg-white/5 md:hidden">
            <Icon name="menu" />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <div className="mb-8 px-2">
              <Logo />
            </div>
            <nav className="space-y-2">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-4 py-3 transition-all',
                      isActive ? 'bg-white/10 text-primary' : 'text-on-surface-variant hover:bg-white/5',
                    )
                  }
                >
                  <Icon name={item.icon} />
                  <span className="font-label-md text-label-md">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <h2 className="font-headline-md text-headline-md font-bold text-primary">{title}</h2>
        {meta && (
          <>
            <div className="hidden h-4 w-[1px] bg-white/10 sm:block" />
            <p className="hidden font-label-md text-label-md text-on-surface-variant sm:block">{meta}</p>
          </>
        )}
      </div>
      <div className="flex items-center gap-stack-gap-md">
        <NotificationsMenu />
        <button
          onClick={() => navigate('/app/settings')}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5"
        >
          <Icon name="settings" className="text-on-surface-variant" />
        </button>
        <UserMenu />
      </div>
    </header>
  )
}
