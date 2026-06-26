export interface AppNotification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

export const notifications: AppNotification[] = [
  { id: 'notif-1', title: 'Document ready', description: 'Q4 Financial Forecasts 2024.pdf finished indexing.', time: '2h ago', read: false },
  { id: 'notif-2', title: 'New comment', description: 'Someone mentioned you in Legal Compliance v2.', time: '5h ago', read: false },
  { id: 'notif-3', title: 'Weekly digest', description: 'Your workspace summary for last week is ready.', time: '1d ago', read: true },
]
