import { useEffect } from 'react'
import { useHeaderStore } from '@/store/headerStore'

export function usePageHeader(title: string, meta?: string) {
  const setHeader = useHeaderStore((s) => s.setHeader)
  useEffect(() => {
    setHeader(title, meta)
  }, [title, meta, setHeader])
}
