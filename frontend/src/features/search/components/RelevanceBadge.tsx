export function RelevanceBadge({ relevance }: { relevance: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-16 overflow-hidden rounded bg-white/5">
        <div className="h-full bg-primary" style={{ width: `${relevance}%` }} />
      </div>
      <span className="font-label-md text-[11px] text-on-surface-variant">{relevance}%</span>
    </div>
  )
}
