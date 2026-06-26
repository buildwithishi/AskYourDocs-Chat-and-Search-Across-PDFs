import type { ChatMessage } from '@/types/chat'

export function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="user-bubble max-w-[85%] rounded-2xl px-6 py-4 text-on-surface shadow-sm">
        <p className="font-body-md text-body-md">{message.content}</p>
      </div>
      {message.timestamp && (
        <span className="mr-2 text-[11px] uppercase tracking-tighter text-on-surface-variant">
          {message.timestamp}
        </span>
      )}
    </div>
  )
}
