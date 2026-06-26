import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedCollections } from '@/mocks/data/collections'
import type { Collection } from '@/types/collection'

interface CollectionsState {
  collections: Collection[]
  createCollection: (name: string, description: string) => Collection
  renameCollection: (id: string, name: string) => void
  updateDescription: (id: string, description: string) => void
  deleteCollection: (id: string) => void
  restoreCollection: (collection: Collection) => void
  addDocuments: (id: string, documentIds: string[]) => void
  removeDocument: (id: string, documentId: string) => void
}

function touch(collection: Collection): Collection {
  return { ...collection, updatedAt: 'Just now', updatedAtMs: Date.now() }
}

export const useCollectionsStore = create<CollectionsState>()(
  persist(
    (set, get) => ({
      collections: seedCollections,
      createCollection: (name, description) => {
        const collection: Collection = {
          id: `col-${Date.now()}`,
          name,
          description,
          documentIds: [],
          updatedAt: 'Just now',
          updatedAtMs: Date.now(),
          icon: 'folder_open',
        }
        set({ collections: [collection, ...get().collections] })
        return collection
      },
      renameCollection: (id, name) =>
        set({ collections: get().collections.map((c) => (c.id === id ? touch({ ...c, name }) : c)) }),
      updateDescription: (id, description) =>
        set({ collections: get().collections.map((c) => (c.id === id ? touch({ ...c, description }) : c)) }),
      deleteCollection: (id) => set({ collections: get().collections.filter((c) => c.id !== id) }),
      restoreCollection: (collection) => set({ collections: [collection, ...get().collections] }),
      addDocuments: (id, documentIds) =>
        set({
          collections: get().collections.map((c) =>
            c.id === id ? touch({ ...c, documentIds: Array.from(new Set([...c.documentIds, ...documentIds])) }) : c,
          ),
        }),
      removeDocument: (id, documentId) =>
        set({
          collections: get().collections.map((c) =>
            c.id === id ? touch({ ...c, documentIds: c.documentIds.filter((d) => d !== documentId) }) : c,
          ),
        }),
    }),
    { name: 'askyourdocs-collections' },
  ),
)
