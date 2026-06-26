import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultSuggestions, seedConversations } from '@/mocks/data/chats'
import { generateAiResponse } from '@/mocks/api/generateAiResponse'
import type { ChatMessage, Conversation } from '@/types/chat'

interface ChatState {
  conversations: Conversation[]
  activeId: string
  typingConversationId: string | null
  suggestions: string[]
  createConversation: (name?: string) => string
  setActive: (id: string) => void
  renameConversation: (id: string, name: string) => void
  deleteConversation: (id: string) => void
  sendMessage: (conversationId: string, text: string) => void
}

function timeNow() {
  return `Sent ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: seedConversations,
      activeId: seedConversations[0].id,
      typingConversationId: null,
      suggestions: defaultSuggestions,
      createConversation: (name) => {
        const conversation: Conversation = {
          id: `conv-${Date.now()}`,
          name: name?.trim() || 'New Analysis',
          icon: 'chat_bubble',
          createdAt: Date.now(),
          messages: [],
        }
        set({ conversations: [conversation, ...get().conversations], activeId: conversation.id })
        return conversation.id
      },
      setActive: (id) => set({ activeId: id }),
      renameConversation: (id, name) =>
        set({ conversations: get().conversations.map((c) => (c.id === id ? { ...c, name } : c)) }),
      deleteConversation: (id) => {
        const remaining = get().conversations.filter((c) => c.id !== id)
        const { activeId } = get()
        set({
          conversations: remaining,
          activeId: activeId === id ? (remaining[0]?.id ?? '') : activeId,
        })
      },
      sendMessage: (conversationId, text) => {
        const userMessage: ChatMessage = {
          id: `msg-${Date.now()}-user`,
          role: 'user',
          timestamp: timeNow(),
          content: text,
        }
        set({
          conversations: get().conversations.map((c) =>
            c.id === conversationId ? { ...c, messages: [...c.messages, userMessage] } : c,
          ),
          typingConversationId: conversationId,
        })

        const delay = 900 + Math.random() * 900
        setTimeout(() => {
          const aiMessage = generateAiResponse(text)
          set({
            conversations: get().conversations.map((c) =>
              c.id === conversationId ? { ...c, messages: [...c.messages, aiMessage] } : c,
            ),
            typingConversationId: get().typingConversationId === conversationId ? null : get().typingConversationId,
          })
        }, delay)
      },
    }),
    { name: 'askyourdocs-chat' },
  ),
)
