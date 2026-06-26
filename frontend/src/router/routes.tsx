import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import { AuthLayout } from '@/layouts/AuthLayout'
import { ChatShell } from '@/layouts/ChatShell'
import { LandingPage } from '@/features/landing/LandingPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { RegisterPage } from '@/features/auth/RegisterPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { DocumentsPage } from '@/features/documents/DocumentsPage'
import { CollectionsPage } from '@/features/collections/CollectionsPage'
import { SemanticSearchPage } from '@/features/search/SemanticSearchPage'
import { SettingsPage } from '@/features/settings/SettingsPage'
import { ChatPage } from '@/features/chat/ChatPage'
import { ProtectedRoute, GuestRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />

        <Route element={<AppShell />}>
          <Route path="/app/dashboard" element={<DashboardPage />} />
          <Route path="/app/documents" element={<DocumentsPage />} />
          <Route path="/app/collections" element={<CollectionsPage />} />
          <Route path="/app/search" element={<SemanticSearchPage />} />
          <Route path="/app/settings" element={<SettingsPage />} />
        </Route>

        <Route element={<ChatShell />}>
          <Route path="/app/chat" element={<ChatPage />} />
          <Route path="/app/chat/:chatId" element={<ChatPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
