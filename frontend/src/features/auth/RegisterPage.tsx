import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/lib/toast'
import { AuthCard } from './components/AuthCard'
import { SocialAuthRow } from './components/SocialAuthRow'

export function RegisterPage() {
  const { register, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const result = await register(name, email, password)
      toast.success(`Welcome to AskYourDocs, ${result.user.name.split(' ')[0]}!`)
      navigate('/app/dashboard', { replace: true })
    } catch {
      toast.error('Could not create your account. Please try again.')
    }
  }

  return (
    <AuthCard
      title="Create your workspace"
      subtitle="Start turning your documents into an intelligence engine"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" type="text" placeholder="Sheel Sarena" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="font-label-md text-[13px] text-error">{error}</p>}
        <Button type="submit" size="lg" disabled={isLoading} className="btn-glow w-full">
          {isLoading ? 'Creating account...' : 'Create account'} <Icon name="arrow_forward" />
        </Button>
      </form>
      <div className="my-6" />
      <SocialAuthRow />
    </AuthCard>
  )
}
