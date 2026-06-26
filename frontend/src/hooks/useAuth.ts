import { useState } from 'react'
import { login as loginApi, register as registerApi } from '@/mocks/api/auth'
import { useAuthStore } from '@/store/authStore'

export const AUTH_TOKEN_KEY = 'askyourdocs_jwt'

export function useAuth() {
  const { session, setSession } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(email: string, password: string) {
    setIsLoading(true)
    setError(null)
    try {
      const result = await loginApi(email, password)
      setSession(result)
      localStorage.setItem(AUTH_TOKEN_KEY, result.token)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  async function register(name: string, email: string, password: string) {
    setIsLoading(true)
    setError(null)
    try {
      const result = await registerApi(name, email, password)
      setSession(result)
      localStorage.setItem(AUTH_TOKEN_KEY, result.token)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  function logout() {
    setSession(null)
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  return { session, isLoading, error, login, register, logout }
}
