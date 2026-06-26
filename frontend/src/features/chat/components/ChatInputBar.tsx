import { useEffect, useRef, type FormEvent } from 'react'
import { Icon } from '@/lib/icons'
import { toast } from '@/lib/toast'

export interface ChatInputBarProps {
  value: string
  onChange: (value: string) => void
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInputBar({ value, onChange, onSend, disabled }: ChatInputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function resize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }

  useEffect(resize, [value])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!value.trim()) return
    onSend(value.trim())
    onChange('')
  }

  return (
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-surface to-transparent p-8">
      <form
        onSubmit={handleSubmit}
        className="glass-panel mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-white/10 p-2 shadow-2xl"
      >
        <button
          type="button"
          onClick={() => toast.info('File attachments are coming soon.')}
          className="p-3 text-on-surface-variant transition-colors hover:text-primary"
        >
          <Icon name="attach_file" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          rows={1}
          placeholder="Ask anything about your documents..."
          className="flex-grow resize-none border-none bg-transparent py-3 font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 focus:ring-0"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="rounded-xl bg-primary p-3 text-surface transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <Icon name="send" filled />
        </button>
      </form>
    </div>
  )
}
