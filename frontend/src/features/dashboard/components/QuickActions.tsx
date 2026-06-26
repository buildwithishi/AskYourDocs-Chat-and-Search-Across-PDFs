import { useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'

export function QuickActions() {
  const navigate = useNavigate()
  return (
    <div className="space-y-4">
      <h3 className="font-headline-md text-headline-md text-primary">Quick Actions</h3>
      <button
        onClick={() => navigate('/app/documents')}
        className="group glass-card flex w-full items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:bg-primary hover:text-on-primary"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-white/20">
          <Icon name="cloud_upload" className="text-primary group-hover:text-on-primary" />
        </div>
        <div className="text-left">
          <p className="mb-1 font-headline-md text-headline-md leading-none">Upload New</p>
          <p className="font-label-md text-xs opacity-60">Add PDF, Docx, or MD</p>
        </div>
      </button>
      <button
        onClick={() => navigate('/app/chat')}
        className="group glass-card flex w-full items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-white/10">
          <Icon name="chat_bubble" className="text-primary" />
        </div>
        <div className="text-left">
          <p className="mb-1 font-headline-md text-headline-md leading-none">New Chat</p>
          <p className="font-label-md text-xs text-on-surface-variant">Start fresh synthesis</p>
        </div>
      </button>
    </div>
  )
}
