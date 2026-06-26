import { useState, type FormEvent } from 'react'
import { Icon } from '@/lib/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassPanel } from '@/components/shared/GlassPanel'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { toast } from '@/lib/toast'
import { useSettingsStore } from '@/store/settingsStore'

export function ApiKeysSettingsTab() {
  const { apiKeys, generateApiKey, revokeApiKey } = useSettingsStore()
  const [open, setOpen] = useState(false)
  const [label, setLabel] = useState('')

  function handleCreate(e: FormEvent) {
    e.preventDefault()
    generateApiKey(label.trim() || 'New key')
    toast.success('API key generated')
    setLabel('')
    setOpen(false)
  }

  async function handleCopy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  function handleRevoke(id: string, keyLabel: string) {
    revokeApiKey(id)
    toast.info(`Revoked "${keyLabel}"`)
  }

  return (
    <div className="max-w-lg space-y-4">
      <GlassPanel className="divide-y divide-white/5 overflow-hidden">
        {apiKeys.length === 0 ? (
          <p className="p-4 text-sm text-on-surface-variant">No API keys yet.</p>
        ) : (
          apiKeys.map((key) => (
            <div key={key.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="font-body-md font-medium text-primary">{key.label}</p>
                <p className="truncate font-code-sm text-code-sm text-on-surface-variant">{key.value}</p>
                <p className="font-label-md text-[11px] text-on-surface-variant">Created {key.createdAt}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(key.value)}
                  className="rounded-full p-2 transition-colors hover:bg-white/10"
                  aria-label="Copy key"
                >
                  <Icon name="content_copy" className="text-on-surface-variant" />
                </button>
                <button
                  onClick={() => handleRevoke(key.id, key.label)}
                  className="rounded-full p-2 transition-colors hover:bg-white/10"
                  aria-label="Revoke key"
                >
                  <Icon name="delete" className="text-on-surface-variant" />
                </button>
              </div>
            </div>
          ))
        )}
      </GlassPanel>
      <Button onClick={() => setOpen(true)}>
        <Icon name="add" /> Generate new key
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate API key</DialogTitle>
            <DialogDescription>Give this key a label so you can identify it later.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Production" autoFocus />
            <Button type="submit" className="w-full">
              Generate
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
