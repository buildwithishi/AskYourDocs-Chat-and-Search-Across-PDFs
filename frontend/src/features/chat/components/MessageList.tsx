import { motion } from 'framer-motion'
import type { ChatMessage } from '@/types/chat'
import { UserMessage } from './UserMessage'
import { AIMessageCard } from './AIMessageCard'
import { TypingIndicator } from './TypingIndicator'

export function MessageList({ messages, isTyping }: { messages: ChatMessage[]; isTyping?: boolean }) {
  return (
    <div className="w-full max-w-3xl space-y-10 pb-32">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {message.role === 'user' ? <UserMessage message={message} /> : <AIMessageCard message={message} />}
        </motion.div>
      ))}
      {isTyping && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <TypingIndicator />
        </motion.div>
      )}
    </div>
  )
}
