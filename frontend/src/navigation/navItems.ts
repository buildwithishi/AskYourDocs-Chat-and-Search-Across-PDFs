export interface NavItem {
  label: string
  path: string
  icon: string
}

export const mainNavItems: NavItem[] = [
  { label: 'Workspace', path: '/app/dashboard', icon: 'folder_open' },
  { label: 'Documents', path: '/app/documents', icon: 'description' },
  { label: 'Collections', path: '/app/collections', icon: 'category' },
  { label: 'Search', path: '/app/search', icon: 'pageview' },
  { label: 'Settings', path: '/app/settings', icon: 'tune' },
]
