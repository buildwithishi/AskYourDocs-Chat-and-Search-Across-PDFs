import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { GlassCard } from '@/components/shared/GlassCard'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from '@/lib/toast'
import { useCollectionsStore } from '@/store/collectionsStore'
import { RenameDialog } from '@/features/documents/components/RenameDialog'
import type { Collection } from '@/types/collection'
import { ManageDocumentsDialog } from './ManageDocumentsDialog'

export function CollectionCard({ collection }: { collection: Collection }) {
  const navigate = useNavigate()
  const renameCollection = useCollectionsStore((s) => s.renameCollection)
  const deleteCollection = useCollectionsStore((s) => s.deleteCollection)
  const [renameOpen, setRenameOpen] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)

  function handleDelete() {
    const snapshot = collection
    deleteCollection(collection.id)
    toast(`Deleted "${collection.name}"`, {
      action: { label: 'Undo', onClick: () => useCollectionsStore.getState().restoreCollection(snapshot) },
    })
  }

  return (
    <>
      <GlassCard
        rounded="3xl"
        onClick={() => setManageOpen(true)}
        className="group flex cursor-pointer flex-col gap-4 p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-primary/30">
            <Icon name={collection.icon} filled className="text-primary" />
          </div>
          <div className="flex items-center gap-1">
            <span className="rounded-full border border-white/5 bg-white/5 px-2 py-1 font-label-md text-[11px] text-on-surface-variant">
              {collection.documentIds.length} docs
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={(e) => e.stopPropagation()}
                className="rounded-full p-1 text-on-surface-variant opacity-0 transition-opacity hover:bg-white/10 group-hover:opacity-100"
              >
                <Icon name="more_vert" size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => setManageOpen(true)}>
                  <Icon name="checklist" size={16} className="mr-2" /> Manage documents
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/app/chat')}>
                  <Icon name="chat_bubble" size={16} className="mr-2" /> Open in chat
                </DropdownMenuItem>
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
        <div>
          <h3 className="font-headline-md text-headline-md text-primary">{collection.name}</h3>
          <p className="mt-1 font-body-md text-sm text-on-surface-variant">{collection.description}</p>
        </div>
        <p className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
          Updated {collection.updatedAt}
        </p>
      </GlassCard>
      <RenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialName={collection.name}
        label="Collection name"
        onRename={(name) => {
          renameCollection(collection.id, name)
          toast.success('Collection renamed')
        }}
      />
      <ManageDocumentsDialog open={manageOpen} onOpenChange={setManageOpen} collection={collection} />
    </>
  )
}
