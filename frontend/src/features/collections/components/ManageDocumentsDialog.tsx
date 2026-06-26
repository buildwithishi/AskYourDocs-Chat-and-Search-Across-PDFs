import { Icon } from '@/lib/icons'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useDocumentsStore } from '@/store/documentsStore'
import { useCollectionsStore } from '@/store/collectionsStore'
import type { Collection } from '@/types/collection'

export interface ManageDocumentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  collection: Collection
}

export function ManageDocumentsDialog({ open, onOpenChange, collection }: ManageDocumentsDialogProps) {
  const documents = useDocumentsStore((s) => s.documents)
  const addDocuments = useCollectionsStore((s) => s.addDocuments)
  const removeDocument = useCollectionsStore((s) => s.removeDocument)

  function toggle(docId: string, checked: boolean) {
    if (checked) addDocuments(collection.id, [docId])
    else removeDocument(collection.id, docId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage documents</DialogTitle>
          <DialogDescription>Choose which documents belong to &quot;{collection.name}&quot;.</DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          {documents.map((doc) => {
            const checked = collection.documentIds.includes(doc.id)
            return (
              <label
                key={doc.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => toggle(doc.id, e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-white"
                />
                <Icon name="description" size={18} className="text-on-surface-variant" />
                <span className="flex-1 truncate text-sm text-on-surface">{doc.name}</span>
              </label>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
