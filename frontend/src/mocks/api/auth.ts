import { request } from './client'
import { currentUser } from '@/mocks/data/users'
import type { AuthSession, User } from '@/types/user'

function base64url(input: string) {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function createMockJwt(user: User) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = base64url(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  )
  const signature = base64url(`mock-signature-${user.id}-${Date.now()}`)
  return `${header}.${payload}.${signature}`
}

export function login(email: string, password: string) {
  if (password.length < 4) {
    return request<AuthSession>(() => {
      throw new Error('Incorrect email or password.')
    }, 500)
  }
  const user: User = { ...currentUser, email }
  return request<AuthSession>(() => ({ user, token: createMockJwt(user) }), 600)
}

export function register(name: string, email: string, password: string) {
  if (password.length < 6) {
    return request<AuthSession>(() => {
      throw new Error('Password must be at least 6 characters.')
    }, 500)
  }
  const user: User = { ...currentUser, name, email }
  return request<AuthSession>(() => ({ user, token: createMockJwt(user) }), 600)
}
