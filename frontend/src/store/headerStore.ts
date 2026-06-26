import { create } from 'zustand'

interface HeaderState {
  title: string
  meta?: string
  setHeader: (title: string, meta?: string) => void
}

export const useHeaderStore = create<HeaderState>((set) => ({
  title: '',
  meta: undefined,
  setHeader: (title, meta) => set({ title, meta }),
}))
