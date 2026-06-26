import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

export interface RenameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialName: string
  label?: string
  onRename: (name: string) => void
}

export function RenameDialog({ open, onOpenChange, initialName, label = 'Name', onRename }: RenameDialogProps) {
  const [name, setName] = useState(initialName)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onRename(name.trim())
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setName(initialName)
        onOpenChange(next)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
          <DialogDescription>Choose a new name.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rename-input">{label}</Label>
            <Input id="rename-input" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
