import { useEffect, useState } from 'react'
import { getDashboardStats, type DashboardStats } from '@/mocks/api/analytics'

export function useDashboardStats() {
  const [data, setData] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDashboardStats().then((stats) => {
      setData(stats)
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}
