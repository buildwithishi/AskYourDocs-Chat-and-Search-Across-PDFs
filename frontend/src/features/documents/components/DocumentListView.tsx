import { useState } from 'react'
import { Icon } from '@/lib/icons'
import { StatusChip } from '@/components/shared/StatusChip'
import { GlassPanel } from '@/components/shared/GlassPanel'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from '@/lib/toast'
import { useDocumentsStore } from '@/store/documentsStore'
import type { AppDocument } from '@/types/document'
import { RenameDialog } from './RenameDialog'

const ICONS: Record<AppDocument['extension'], string> = {
  pdf: 'picture_as_pdf',
  docx: 'description',
  txt: 'article',
  md: 'article',
}

function DocumentListRow({ doc }: { doc: AppDocument }) {
  const renameDocument = useDocumentsStore((s) => s.renameDocument)
  const removeDocument = useDocumentsStore((s) => s.removeDocument)
  const [renameOpen, setRenameOpen] = useState(false)

  function handleDelete() {
    const snapshot = doc
    removeDocument(doc.id)
    toast(`Deleted ${doc.name}`, {
      action: { label: 'Undo', onClick: () => useDocumentsStore.getState().restoreDocument(snapshot) },
    })
  }

  return (
    <div className="flex items-center gap-6 p-5 transition-colors hover:bg-white/[0.03]">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-surface-container-highest">
        <Icon name={ICONS[doc.extension]} className="text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="font-body-md font-semibold text-primary">{doc.name}</h4>
        <p className="font-label-md text-sm text-on-surface-variant">
          {doc.sizeMb} MB • {doc.dateAdded}
        </p>
      </div>
      <StatusChip status={doc.status} />
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-white/10">
          <Icon name="more_vert" size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setRenameOpen(true)}>
            <Icon name="edit" size={16} className="mr-2" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Icon name="delete" size={16} className="mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialName={doc.name}
        label="Document name"
        onRename={(name) => {
          renameDocument(doc.id, name)
          toast.success('Document renamed')
        }}
      />
    </div>
  )
}

export function DocumentListView({ documents }: { documents: AppDocument[] }) {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="divide-y divide-white/5">
        {documents.map((doc) => (
          <DocumentListRow key={doc.id} doc={doc} />
        ))}
      </div>
    </GlassPanel>
  )
}
