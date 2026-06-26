import { Icon } from '@/lib/icons'
import type { ChatMessage } from '@/types/chat'

export function AIMessageCard({ message }: { message: ChatMessage }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="ai-bubble w-full rounded-3xl p-px">
        <div className="rounded-[calc(1.5rem-1px)] border border-white/5 bg-surface-container-low/60 p-8 backdrop-blur-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Icon name="smart_toy" filled size={18} className="text-surface" />
            </div>
            <span className="font-headline-md text-headline-md text-primary">{message.title}</span>
          </div>
          <div className="space-y-4 font-body-md text-body-md leading-relaxed text-on-surface/90">
            <p>{message.content}</p>
            {message.bulletPoints && (
              <ul className="list-none space-y-3 pl-1">
                {message.bulletPoints.map((bullet) => (
                  <li key={bullet.label} className="flex gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      <strong className="text-primary">{bullet.label}:</strong> {bullet.body}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-6">
            {message.confidence != null && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-label-md text-[12px] text-on-surface-variant">
                  Confidence: {message.confidence}%
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Icon name="history" size={14} className="text-on-surface-variant" />
              <span className="font-label-md text-[12px] text-on-surface-variant">Last updated 2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
