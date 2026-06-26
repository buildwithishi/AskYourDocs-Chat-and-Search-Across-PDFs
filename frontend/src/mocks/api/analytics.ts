import { request } from './client'

export interface DashboardStats {
  totalDocs: number
  totalChats: number
  storageUsed: string
  storagePercent: number
  tokenUsage: string
  monthlyLimitPercent: number
  hoursSaved: number
}

export function getDashboardStats() {
  return request<DashboardStats>(() => ({
    totalDocs: 1248,
    totalChats: 852,
    storageUsed: '4.2 GB',
    storagePercent: 82,
    tokenUsage: '88.4k',
    monthlyLimitPercent: 82,
    hoursSaved: 14,
  }))
}
