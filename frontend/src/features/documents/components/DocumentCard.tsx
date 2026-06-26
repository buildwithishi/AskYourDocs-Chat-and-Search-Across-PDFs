import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { StatusChip } from '@/components/shared/StatusChip'
import { GlassCard } from '@/components/shared/GlassCard'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from '@/lib/toast'
import { useDocumentsStore } from '@/store/documentsStore'
import type { AppDocument } from '@/types/document'
import { RenameDialog } from './RenameDialog'

const EXT_CONFIG: Record<AppDocument['extension'], { icon: string; bg: string; text: string; border: string }> = {
  pdf: { icon: 'picture_as_pdf', bg: 'bg-error-container/20', text: 'text-error', border: 'border-error/10' },
  docx: { icon: 'description', bg: 'bg-secondary-container/20', text: 'text-secondary', border: 'border-secondary/10' },
  txt: { icon: 'article', bg: 'bg-tertiary-container/20', text: 'text-tertiary-fixed-dim', border: 'border-white/10' },
  md: { icon: 'article', bg: 'bg-tertiary-container/20', text: 'text-tertiary-fixed-dim', border: 'border-white/10' },
}

export function DocumentCard({ document }: { document: AppDocument }) {
  const ext = EXT_CONFIG[document.extension]
  const renameDocument = useDocumentsStore((s) => s.renameDocument)
  const removeDocument = useDocumentsStore((s) => s.removeDocument)
  const [renameOpen, setRenameOpen] = useState(false)
  const navigate = useNavigate()

  function handleDelete() {
    const snapshot = document
    removeDocument(document.id)
    toast(`Deleted ${document.name}`, {
      action: {
        label: 'Undo',
        onClick: () => useDocumentsStore.getState().restoreDocument(snapshot),
      },
    })
  }

  return (
    <>
      <GlassCard
        onClick={() => {
          toast.info(`Opening "${document.name}" in chat...`)
          navigate('/app/chat')
        }}
        className="group relative cursor-pointer rounded-xl p-5 hover:border-primary/30"
      >
        <div className="mb-4 flex items-start justify-between">
          <div className={`flex h-14 w-12 items-center justify-center rounded border ${ext.bg} ${ext.text} ${ext.border}`}>
            <Icon name={ext.icon} size={24} />
          </div>
          <div className="flex items-center gap-1">
            <StatusChip status={document.status} />
            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={(e) => e.stopPropagation()}
                className="rounded-full p-1 text-on-surface-variant opacity-0 transition-opacity hover:bg-white/10 group-hover:opacity-100"
              >
                <Icon name="more_vert" size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => setRenameOpen(true)}>
                  <Icon name="edit" size={16} className="mr-2" /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                  <Icon name="delete" size={16} className="mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <h4 className="mb-1 truncate font-medium text-primary">{document.name}</h4>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-label-md text-xs text-on-surface-variant">{document.sizeMb} MB</span>
          <span className="font-label-md text-xs text-on-surface-variant">{document.dateAdded}</span>
        </div>
      </GlassCard>
      <RenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialName={document.name}
        label="Document name"
        onRename={(name) => {
          renameDocument(document.id, name)
          toast.success('Document renamed')
        }}
      />
    </>
  )
}
