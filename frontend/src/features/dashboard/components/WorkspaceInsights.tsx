import { Icon } from '@/lib/icons'
import { GlassPanel } from '@/components/shared/GlassPanel'
import { Progress } from '@/components/ui/progress'

export function WorkspaceInsights({ monthlyLimitPercent, hoursSaved }: { monthlyLimitPercent: number; hoursSaved: number }) {
  return (
    <GlassPanel className="border-primary/10 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Icon name="analytics" className="text-primary" />
        <h4 className="font-label-md text-label-md uppercase tracking-widest text-primary">Workspace Insights</h4>
      </div>
      <div className="space-y-6">
        <div className="relative pt-1">
          <div className="mb-2 flex items-center justify-between">
            <span className="inline-block rounded-full bg-white/5 px-2 py-1 text-[11px] font-label-md uppercase text-on-surface-variant">
              Monthly Limit
            </span>
            <span className="font-label-md text-xs text-primary">{monthlyLimitPercent}%</span>
          </div>
          <Progress value={monthlyLimitPercent} />
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-container">
            <Icon name="lightbulb" className="text-sm text-on-primary-container" />
          </div>
          <p className="font-body-md text-xs text-on-surface-variant">
            You&apos;ve saved roughly <span className="font-bold text-primary">{hoursSaved} hours</span> of reading
            time this week using AI summaries.
          </p>
        </div>
        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-white/5 bg-gradient-to-br from-surface-container-high to-surface-container-lowest">
          <Icon name="hub" className="text-4xl text-on-surface-variant/40" />
        </div>
      </div>
    </GlassPanel>
  )
}
