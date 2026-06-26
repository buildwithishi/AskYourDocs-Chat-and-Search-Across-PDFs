import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { ShaderBackground } from '@/components/shared/ShaderBackground'
import { Sidebar } from '@/navigation/Sidebar'
import { TopBar } from '@/navigation/TopBar'
import { useHeaderStore } from '@/store/headerStore'

export function AppShell() {
  const { title, meta } = useHeaderStore()
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen">
      <ShaderBackground opacity={0.2} />
      <Sidebar className="hidden md:flex" />
      <TopBar title={title} meta={meta} />
      <main className="relative z-10 ml-0 mt-16 flex-1 overflow-y-auto px-margin-mobile py-stack-gap-lg md:ml-64 md:px-margin-desktop">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
