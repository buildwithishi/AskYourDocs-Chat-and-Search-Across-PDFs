import { GlassPanel } from '@/components/shared/GlassPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePageHeader } from '@/hooks/usePageHeader'
import { ProfileSettingsTab } from './components/ProfileSettingsTab'
import { WorkspaceSettingsTab } from './components/WorkspaceSettingsTab'
import { BillingSettingsTab } from './components/BillingSettingsTab'
import { ApiKeysSettingsTab } from './components/ApiKeysSettingsTab'
import { ThemeSettingsTab } from './components/ThemeSettingsTab'

export function SettingsPage() {
  usePageHeader('Settings', 'Manage your workspace')

  return (
    <GlassPanel className="p-8">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileSettingsTab />
        </TabsContent>
        <TabsContent value="workspace">
          <WorkspaceSettingsTab />
        </TabsContent>
        <TabsContent value="appearance">
          <ThemeSettingsTab />
        </TabsContent>
        <TabsContent value="billing">
          <BillingSettingsTab />
        </TabsContent>
        <TabsContent value="api-keys">
          <ApiKeysSettingsTab />
        </TabsContent>
      </Tabs>
    </GlassPanel>
  )
}
