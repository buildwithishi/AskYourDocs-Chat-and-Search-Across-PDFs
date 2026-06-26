import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { AppRoutes } from '@/router/routes'
import { useThemeStore } from '@/store/themeStore'

export default function App() {
  const theme = useThemeStore((s) => s.theme)
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    useThemeStore.getState().setTheme(theme)
    setResolvedTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark')
  }, [theme])

  return (
    <>
      <AppRoutes />
      <Toaster
        theme={resolvedTheme}
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: 'glass-panel !border-white/10 !text-on-surface',
            title: '!text-on-surface',
            description: '!text-on-surface-variant',
          },
        }}
      />
    </>
  )
}
