import { useState } from 'react'
import { Icon } from '@/lib/icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { notifications as seedNotifications } from '@/mocks/data/notifications'

export function NotificationsMenu() {
  const [notifications, setNotifications] = useState(seedNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu onOpenChange={(open) => { if (open) setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))) }}>
      <DropdownMenuTrigger className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5">
        <Icon name="notifications" className="text-on-surface-variant" />
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-primary" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="mb-1 px-3 py-2 font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
          Notifications
        </div>
        {notifications.length === 0 ? (
          <p className="px-3 py-4 text-sm text-on-surface-variant">You&apos;re all caught up.</p>
        ) : (
          notifications.map((n) => (
            <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 whitespace-normal">
              <span className="font-body-md text-sm font-medium text-primary">{n.title}</span>
              <span className="text-xs text-on-surface-variant">{n.description}</span>
              <span className="text-[10px] text-on-surface-variant/70">{n.time}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
