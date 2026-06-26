import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/lib/toast'
import { AuthCard } from './components/AuthCard'
import { SocialAuthRow } from './components/SocialAuthRow'

export function LoginPage() {
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const result = await login(email, password)
      toast.success(`Welcome back, ${result.user.name.split(' ')[0]}!`)
      const redirectTo = (location.state as { from?: string } | null)?.from ?? '/app/dashboard'
      navigate(redirectTo, { replace: true })
    } catch {
      toast.error('Sign in failed. Check your credentials and try again.')
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to your workspace"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={() => toast.info('Password reset link sent (mock). Check your inbox.')}
              className="font-label-md text-[12px] text-on-surface-variant hover:text-primary"
            >
              Forgot password?
            </button>
          </div>
          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="font-label-md text-[13px] text-error">{error}</p>}
        <Button type="submit" size="lg" disabled={isLoading} className="btn-glow w-full">
          {isLoading ? 'Signing in...' : 'Sign in'} <Icon name="arrow_forward" />
        </Button>
        <p className="text-center font-label-md text-[11px] text-on-surface-variant">
          Tip: any email works, password must be 4+ characters.
        </p>
      </form>
      <div className="my-6" />
      <SocialAuthRow />
    </AuthCard>
  )
}
