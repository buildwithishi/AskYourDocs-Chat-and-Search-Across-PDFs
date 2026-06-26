import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ApiKey {
  id: string
  label: string
  value: string
  createdAt: string
}

interface SettingsState {
  profileName: string
  profileEmail: string
  workspaceName: string
  retentionDays: number
  apiKeys: ApiKey[]
  setProfile: (name: string, email: string) => void
  setWorkspace: (name: string, retentionDays: number) => void
  generateApiKey: (label: string) => ApiKey
  revokeApiKey: (id: string) => void
}

function randomKey() {
  return `sk-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      profileName: 'Sheel Sarena',
      profileEmail: 'sheelsarena@gmail.com',
      workspaceName: "Sheel's Workspace",
      retentionDays: 90,
      apiKeys: [
        { id: 'key-1', label: 'Production', value: 'sk-live-••••••••••••3f9a', createdAt: 'Sep 2, 2024' },
        { id: 'key-2', label: 'Staging', value: 'sk-test-••••••••••••81bc', createdAt: 'Aug 14, 2024' },
      ],
      setProfile: (name, email) => set({ profileName: name, profileEmail: email }),
      setWorkspace: (name, retentionDays) => set({ workspaceName: name, retentionDays }),
      generateApiKey: (label) => {
        const key: ApiKey = {
          id: `key-${Date.now()}`,
          label: label || 'New key',
          value: randomKey(),
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        }
        set({ apiKeys: [key, ...get().apiKeys] })
        return key
      },
      revokeApiKey: (id) => set({ apiKeys: get().apiKeys.filter((k) => k.id !== id) }),
    }),
    { name: 'askyourdocs-settings' },
  ),
)
