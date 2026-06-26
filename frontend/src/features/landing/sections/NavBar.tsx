import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from '@/lib/toast'
import { useAuthStore } from '@/store/authStore'

export function NavBar() {
  const navigate = useNavigate()
  const session = useAuthStore((s) => s.session)
  const [docSearch, setDocSearch] = useState('')

  function handleDocSearch(e: FormEvent) {
    e.preventDefault()
    toast.info('Sign in to search your workspace.')
    navigate('/login')
  }

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-surface/80 px-margin-mobile py-4 shadow-[0_0_20px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-margin-desktop">
      <div className="flex items-center gap-gutter">
        <Link to="/" className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
          AskYourDocs
        </Link>
        <nav className="ml-stack-gap-lg hidden items-center gap-stack-gap-md md:flex">
          <a className="font-label-md text-label-md font-bold text-primary" href="#hero">
            Home
          </a>
          <a className="rounded-lg px-3 py-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-white/5" href="#features">
            Features
          </a>
          <a className="rounded-lg px-3 py-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-white/5" href="#enterprise">
            Enterprise
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-stack-gap-md">
        <form
          onSubmit={handleDocSearch}
          className="hidden items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 transition-all focus-within:border-primary/20 sm:flex"
        >
          <Icon name="search" className="text-[20px] text-on-surface-variant" />
          <input
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            className="w-32 border-none bg-transparent font-label-md text-label-md text-on-surface outline-none placeholder:text-on-surface-variant/50 focus:ring-0"
            placeholder="Search docs..."
            type="text"
          />
        </form>
        {session ? (
          <Link to="/app/dashboard" className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">
            Dashboard
          </Link>
        ) : (
          <Link to="/login" className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">
            Log in
          </Link>
        )}
        <Link to={session ? '/app/dashboard' : '/login'}>
          <Avatar className="cursor-pointer transition-transform active:scale-95">
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
