import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/lib/toast'
import { useSettingsStore } from '@/store/settingsStore'

export function WorkspaceSettingsTab() {
  const { workspaceName, retentionDays, setWorkspace } = useSettingsStore()
  const [name, setName] = useState(workspaceName)
  const [retention, setRetention] = useState(retentionDays)
  const [isSaving, setIsSaving] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setWorkspace(name, retention)
      setIsSaving(false)
      toast.success('Workspace settings saved')
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div className="space-y-2">
        <Label htmlFor="workspace-name">Workspace name</Label>
        <Input id="workspace-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="workspace-retention">Document retention (days)</Label>
        <Input
          id="workspace-retention"
          type="number"
          value={retention}
          onChange={(e) => setRetention(Number(e.target.value))}
        />
      </div>
      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  )
}
