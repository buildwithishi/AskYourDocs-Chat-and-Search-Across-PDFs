import { useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/lib/toast'

export function UserMenu() {
  const navigate = useNavigate()
  const { session, logout } = useAuth()

  function handleLogout() {
    logout()
    toast.info('You have been signed out.')
    navigate('/login')
  }

  const initials = session?.user.name
    ? session.user.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
    : 'SS'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full transition-transform active:scale-95">
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-3 py-2">
          <p className="truncate font-body-md text-sm font-medium text-primary">{session?.user.name ?? 'Guest'}</p>
          <p className="truncate text-xs text-on-surface-variant">{session?.user.email}</p>
        </div>
        <DropdownMenuItem onClick={() => navigate('/app/settings')}>
          <Icon name="person" size={16} className="mr-2" /> Profile settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/app/settings')}>
          <Icon name="tune" size={16} className="mr-2" /> Workspace settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <Icon name="logout" size={16} className="mr-2" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
