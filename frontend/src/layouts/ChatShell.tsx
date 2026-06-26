import { Outlet, useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { ShaderBackground } from '@/components/shared/ShaderBackground'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ChatSidebar } from '@/features/chat/components/ChatSidebar'
import { NotificationsMenu } from '@/navigation/NotificationsMenu'
import { UserMenu } from '@/navigation/UserMenu'
import { useChatStore } from '@/store/chatStore'
import { toast } from '@/lib/toast'

export function ChatShell() {
  const navigate = useNavigate()
  const createConversation = useChatStore((s) => s.createConversation)

  function handleNewAnalysis() {
    createConversation()
    toast.success('Started a new analysis')
  }

  return (
    <div className="h-screen overflow-hidden bg-surface text-on-surface">
      <ShaderBackground opacity={0.4} />
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-surface/80 px-margin-mobile py-4 shadow-[0_0_20px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-margin-desktop">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger className="rounded-lg p-2 text-on-surface-variant hover:bg-white/5 md:hidden">
              <Icon name="menu" />
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <ChatSidebar className="flex h-full" />
            </SheetContent>
          </Sheet>
          <button onClick={() => navigate('/app/dashboard')} className="font-headline-md text-headline-md font-bold text-primary">
            AskYourDocs
          </button>
          <div className="mx-2 hidden h-4 w-[1px] bg-white/10 sm:block" />
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 sm:flex">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-primary" />
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Enterprise AI Active
            </span>
          </div>
        </div>
        <div className="flex items-center gap-stack-gap-md">
          <NotificationsMenu />
          <button
            onClick={() => navigate('/app/settings')}
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-white/5 active:scale-95"
          >
            <Icon name="settings" />
          </button>
          <UserMenu />
        </div>
      </nav>
      <main className="relative z-10 flex h-screen pt-20">
        <ChatSidebar className="hidden md:flex" />
        <Outlet />
      </main>
      <button
        onClick={handleNewAnalysis}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-surface shadow-2xl transition-transform active:scale-95 md:hidden"
      >
        <Icon name="add" filled size={28} />
      </button>
    </div>
  )
}
