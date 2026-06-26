export type DocumentStatus = 'processing' | 'indexing' | 'ready'

export interface DocumentTag {
  label: string
}

export interface AppDocument {
  id: string
  name: string
  extension: 'pdf' | 'docx' | 'txt' | 'md'
  sizeMb: number
  dateAdded: string
  createdAt: number
  status: DocumentStatus
  pages?: number
  tag?: string
  lastChatted?: string
  starred?: boolean
}
