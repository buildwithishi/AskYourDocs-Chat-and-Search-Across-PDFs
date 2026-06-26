import { Outlet } from 'react-router-dom'
import { ShaderBackground } from '@/components/shared/ShaderBackground'
import { Logo } from '@/components/shared/Logo'

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-margin-mobile">
      <ShaderBackground opacity={0.4} />
      <div className="relative z-10 mb-8">
        <Logo subtitle="Enterprise AI" />
      </div>
      <div className="glass-panel relative z-10 w-full max-w-md rounded-3xl p-8 shadow-2xl sm:p-10">
        <Outlet />
      </div>
    </div>
  )
}
