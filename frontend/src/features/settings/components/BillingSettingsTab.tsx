import { Icon } from '@/lib/icons'
import { GlassCard } from '@/components/shared/GlassCard'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/lib/toast'

export function BillingSettingsTab() {
  return (
    <div className="max-w-lg space-y-6">
      <GlassCard className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">Current plan</p>
            <p className="font-headline-md text-headline-md text-primary">Enterprise</p>
          </div>
          <Icon name="workspace_premium" filled className="text-3xl text-primary" />
        </div>
        <p className="mb-4 text-sm text-on-surface-variant">82% of monthly token allowance used.</p>
        <Progress value={82} />
      </GlassCard>
      <Button variant="outline" onClick={() => toast.info('Billing portal is not available in this demo.')}>
        Manage billing
      </Button>
    </div>
  )
}
