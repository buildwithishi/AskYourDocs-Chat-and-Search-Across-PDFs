import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/shared/Logo'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/lib/toast'
import { mainNavItems } from './navItems'

export function Sidebar({ className }: { className?: string }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    toast.info('You have been signed out.')
    navigate('/login')
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/5 bg-surface-container/95 px-4 py-stack-gap-lg backdrop-blur-md',
        className,
      )}
    >
      <div className="mb-10 px-2">
        <Logo />
      </div>
      <nav className="flex-1 space-y-2">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 transition-all active:opacity-80',
                isActive
                  ? 'border-r-2 border-primary bg-white/10 text-primary'
                  : 'text-on-surface-variant hover:bg-white/5',
              )
            }
          >
            <Icon name={item.icon} />
            <span className="font-label-md text-label-md">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto space-y-2 border-t border-white/5 pt-6">
        <button
          onClick={() => navigate('/app/documents')}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary transition-all hover:brightness-90"
        >
          <Icon name="add" />
          Upload Document
        </button>
        <button
          onClick={() => toast.info('Help Center is coming soon.')}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-on-surface-variant transition-all hover:bg-white/5"
        >
          <Icon name="help_outline" />
          <span className="font-label-md text-label-md">Help</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-on-surface-variant transition-all hover:bg-white/5"
        >
          <Icon name="logout" />
          <span className="font-label-md text-label-md">Logout</span>
        </button>
      </div>
    </aside>
  )
}
