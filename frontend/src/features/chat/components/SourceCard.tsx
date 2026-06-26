import { useNavigate } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { toast } from '@/lib/toast'
import type { ChatSource } from '@/types/chat'

export function SourceCard({ source }: { source: ChatSource }) {
  const navigate = useNavigate()

  function handleOpen() {
    toast.info(`Opening "${source.documentName}" at ${source.pageRef}...`)
    navigate('/app/documents')
  }

  return (
    <button
      onClick={handleOpen}
      className="group w-full cursor-pointer rounded-xl border border-white/5 bg-white/5 p-4 text-left transition-all hover:border-white/20"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={source.icon} size={18} className="text-secondary" />
          <span className="max-w-[120px] truncate font-label-md text-[12px] font-medium text-on-surface">
            {source.documentName}
          </span>
        </div>
        <span className="text-[10px] text-on-surface-variant">{source.pageRef}</span>
      </div>
      <p className="line-clamp-3 text-[13px] italic text-on-surface-variant transition-colors group-hover:text-on-surface">
        &quot;{source.excerpt}&quot;
      </p>
    </button>
  )
}
