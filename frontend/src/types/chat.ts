export interface ChatSource {
  id: string
  documentName: string
  icon: string
  pageRef: string
  excerpt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  title?: string
  bulletPoints?: { label: string; body: string }[]
  confidence?: number
  sources?: ChatSource[]
}

export interface Conversation {
  id: string
  name: string
  icon: string
  createdAt: number
  messages: ChatMessage[]
}
