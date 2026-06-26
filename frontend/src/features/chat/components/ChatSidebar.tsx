import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { toast } from '@/lib/toast'
import { useChatStore } from '@/store/chatStore'
import { useAuth } from '@/hooks/useAuth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { RenameDialog } from '@/features/documents/components/RenameDialog'
import type { Conversation } from '@/types/chat'

function ConversationRow({ conversation, isActive }: { conversation: Conversation; isActive: boolean }) {
  const setActive = useChatStore((s) => s.setActive)
  const renameConversation = useChatStore((s) => s.renameConversation)
  const deleteConversation = useChatStore((s) => s.deleteConversation)
  const [renameOpen, setRenameOpen] = useState(false)

  return (
    <div
      onClick={() => setActive(conversation.id)}
      className={cn(
        'group flex cursor-pointer items-center gap-3 px-4 py-3 transition-all',
        isActive ? 'border-r-2 border-primary bg-white/10 text-primary' : 'text-on-surface-variant hover:bg-white/5',
      )}
    >
      <Icon name={conversation.icon} className="text-[20px]" />
      <span className="flex-1 truncate font-label-md text-label-md">{conversation.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={(e) => e.stopPropagation()}
          className="rounded-full p-1 opacity-0 transition-opacity hover:bg-white/10 group-hover:opacity-100"
        >
          <Icon name="more_vert" size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={() => setRenameOpen(true)}>
            <Icon name="edit" size={16} className="mr-2" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              deleteConversation(conversation.id)
              toast.info(`Deleted "${conversation.name}"`)
            }}
          >
            <Icon name="delete" size={16} className="mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialName={conversation.name}
        label="Conversation name"
        onRename={(name) => {
          renameConversation(conversation.id, name)
          toast.success('Conversation renamed')
        }}
      />
    </div>
  )
}

export function ChatSidebar({ className }: { className?: string }) {
  const conversations = useChatStore((s) => s.conversations)
  const activeId = useChatStore((s) => s.activeId)
  const createConversation = useChatStore((s) => s.createConversation)
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleNewAnalysis() {
    createConversation()
    toast.success('Started a new analysis')
  }

  function handleLogout() {
    logout()
    toast.info('You have been signed out.')
    navigate('/login')
  }

  return (
    <aside
      className={cn(
        'h-full w-64 flex-shrink-0 flex-col border-r border-white/5 bg-surface-container/95 px-4 py-stack-gap-lg backdrop-blur-md',
        className,
      )}
    >
      <div className="mb-8">
        <button
          onClick={handleNewAnalysis}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-label-md text-label-md font-bold text-on-primary transition-all active:scale-95"
        >
          <Icon name="add" filled />
          New Analysis
        </button>
      </div>
      <div className="custom-scrollbar flex-grow space-y-6 overflow-y-auto">
        <div>
          <h3 className="mb-3 px-4 font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
            Recent Projects
          </h3>
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <ConversationRow key={conversation.id} conversation={conversation} isActive={conversation.id === activeId} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 px-4 font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
            Navigation
          </h3>
          <nav className="space-y-1">
            <button
              onClick={() => navigate('/app/dashboard')}
              className="flex w-full items-center gap-3 px-4 py-3 text-on-surface-variant transition-all hover:bg-white/5"
            >
              <Icon name="insights" className="text-[20px]" />
              <span className="font-label-md text-label-md">Analytics</span>
            </button>
            <button
              onClick={() => navigate('/app/settings')}
              className="flex w-full items-center gap-3 px-4 py-3 text-on-surface-variant transition-all hover:bg-white/5"
            >
              <Icon name="tune" className="text-[20px]" />
              <span className="font-label-md text-label-md">Settings</span>
            </button>
          </nav>
        </div>
      </div>
      <div className="mt-auto space-y-1 border-t border-white/5 pt-6">
        <button
          onClick={() => toast.info('Help Center is coming soon.')}
          className="flex w-full items-center gap-3 px-4 py-3 text-on-surface-variant transition-all hover:bg-white/5"
        >
          <Icon name="help_outline" className="text-[20px]" />
          <span className="font-label-md text-label-md">Help Center</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-on-surface-variant transition-all hover:bg-white/5"
        >
          <Icon name="logout" className="text-[20px]" />
          <span className="font-label-md text-label-md">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
