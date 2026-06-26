import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedDocuments } from '@/mocks/data/documents'
import type { AppDocument, DocumentStatus } from '@/types/document'

interface NewDocumentInput {
  name: string
  extension: AppDocument['extension']
  sizeMb: number
}

interface DocumentsState {
  documents: AppDocument[]
  addDocument: (input: NewDocumentInput) => AppDocument
  restoreDocument: (doc: AppDocument) => void
  removeDocument: (id: string) => void
  renameDocument: (id: string, name: string) => void
  setStatus: (id: string, status: DocumentStatus) => void
}

export const useDocumentsStore = create<DocumentsState>()(
  persist(
    (set, get) => ({
      documents: seedDocuments,
      addDocument: (input) => {
        const doc: AppDocument = {
          id: `doc-${Date.now()}-${Math.round(Math.random() * 1000)}`,
          name: input.name,
          extension: input.extension,
          sizeMb: input.sizeMb,
          dateAdded: 'Just now',
          createdAt: Date.now(),
          status: 'processing',
        }
        set({ documents: [doc, ...get().documents] })
        return doc
      },
      restoreDocument: (doc) => set({ documents: [doc, ...get().documents] }),
      removeDocument: (id) => set({ documents: get().documents.filter((d) => d.id !== id) }),
      renameDocument: (id, name) =>
        set({ documents: get().documents.map((d) => (d.id === id ? { ...d, name } : d)) }),
      setStatus: (id, status) =>
        set({ documents: get().documents.map((d) => (d.id === id ? { ...d, status } : d)) }),
    }),
    { name: 'askyourdocs-documents' },
  ),
)
