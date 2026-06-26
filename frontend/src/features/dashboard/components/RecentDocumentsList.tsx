import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { GlassPanel } from '@/components/shared/GlassPanel'
import { EmptyState } from '@/components/shared/EmptyState'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from '@/lib/toast'
import { useDocumentsStore } from '@/store/documentsStore'
import { RenameDialog } from '@/features/documents/components/RenameDialog'
import type { AppDocument } from '@/types/document'

const ICONS: Record<string, string> = {
  Finance: 'article',
  Legal: 'contract',
  Strategy: 'analytics',
  HR: 'star',
}

const ICON_COLORS: Record<string, string> = {
  Finance: 'text-primary-container',
  Legal: 'text-secondary',
  Strategy: 'text-tertiary-fixed-dim',
  HR: 'text-on-primary-fixed-variant',
}

function RecentDocumentRow({ doc }: { doc: AppDocument }) {
  const navigate = useNavigate()
  const renameDocument = useDocumentsStore((s) => s.renameDocument)
  const removeDocument = useDocumentsStore((s) => s.removeDocument)
  const [renameOpen, setRenameOpen] = useState(false)

  return (
    <div
      onClick={() => navigate('/app/chat')}
      className="group flex cursor-pointer items-center gap-6 p-5 transition-colors hover:bg-white/[0.03]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-surface-container-highest">
        <Icon
          name={ICONS[doc.tag ?? ''] ?? 'description'}
          filled={doc.tag === 'HR'}
          className={ICON_COLORS[doc.tag ?? ''] ?? 'text-primary'}
        />
      </div>
      <div className="flex-1">
        <h4 className="font-body-md font-semibold text-primary">{doc.name}</h4>
        <p className="font-label-md text-sm text-on-surface-variant">
          {doc.lastChatted ? `Last chatted: ${doc.lastChatted}` : `Added ${doc.dateAdded}`}
          {doc.pages ? ` • ${doc.pages} pages` : ''}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {doc.tag && (
          <span className="rounded border border-white/5 bg-white/5 px-2 py-1 font-label-md text-[10px] text-on-surface-variant">
            {doc.tag}
          </span>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className="rounded-full p-2 transition-colors hover:bg-white/10">
            <Icon name="more_vert" className="text-on-surface-variant" />
          </DropdownMenuTrigger>
          <DropdownMenuContent onClick={(e) => e.stopPropagation()} align="end">
            <DropdownMenuItem onClick={() => navigate('/app/chat')}>
              <Icon name="chat_bubble" size={16} className="mr-2" /> Open in chat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRenameOpen(true)}>
              <Icon name="edit" size={16} className="mr-2" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                removeDocument(doc.id)
                toast(`Deleted ${doc.name}`, {
                  action: { label: 'Undo', onClick: () => useDocumentsStore.getState().restoreDocument(doc) },
                })
              }}
            >
              <Icon name="delete" size={16} className="mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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

export function RecentDocumentsList({ documents }: { documents: AppDocument[] }) {
  const navigate = useNavigate()
  return (
    <section className="space-y-stack-gap-md lg:col-span-2">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-md text-headline-md text-primary">Recent Documents</h3>
        <button
          onClick={() => navigate('/app/documents')}
          className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
        >
          View all <Icon name="arrow_forward" className="text-sm" />
        </button>
      </div>
      <GlassPanel className="overflow-hidden">
        {documents.length === 0 ? (
          <EmptyState icon="folder_open" title="No documents yet" description="Upload your first document to get started." />
        ) : (
          <div className="divide-y divide-white/5">
            {documents.map((doc) => (
              <RecentDocumentRow key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </GlassPanel>
    </section>
  )
}
