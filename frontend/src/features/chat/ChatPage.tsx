import { useEffect, useRef, useState } from 'react'
import { useChatStore } from '@/store/chatStore'
import { MessageList } from './components/MessageList'
import { SuggestionChips } from './components/SuggestionChips'
import { ChatInputBar } from './components/ChatInputBar'
import { SourcesPanel } from './components/SourcesPanel'

export function ChatPage() {
  const conversations = useChatStore((s) => s.conversations)
  const activeId = useChatStore((s) => s.activeId)
  const typingConversationId = useChatStore((s) => s.typingConversationId)
  const suggestions = useChatStore((s) => s.suggestions)
  const sendMessage = useChatStore((s) => s.sendMessage)

  const activeConversation = conversations.find((c) => c.id === activeId) ?? conversations[0]
  const messages = activeConversation?.messages ?? []
  const isTyping = typingConversationId === activeConversation?.id

  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length, isTyping])

  function handleSend(text: string) {
    if (!activeConversation) return
    sendMessage(activeConversation.id, text)
  }

  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === 'assistant')
  const sources = lastAssistantMessage?.sources ?? []

  return (
    <>
      <section className="relative flex h-full flex-grow flex-col">
        <div ref={scrollRef} className="custom-scrollbar flex flex-grow flex-col items-center overflow-y-auto px-6 py-8 md:px-12">
          {messages.length === 0 && !isTyping ? (
            <div className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center pb-32 text-center">
              <h2 className="mb-2 font-headline-md text-headline-md text-primary">Start a new analysis</h2>
              <p className="max-w-sm text-on-surface-variant">
                Ask a question about your documents, or pick a suggestion below to get started.
              </p>
            </div>
          ) : (
            <MessageList messages={messages} isTyping={isTyping} />
          )}
          <SuggestionChips suggestions={suggestions} onSelect={setInputValue} />
        </div>
        <ChatInputBar value={inputValue} onChange={setInputValue} onSend={handleSend} disabled={isTyping} />
      </section>
      <SourcesPanel sources={sources} />
    </>
  )
}
