import { toast } from '@/lib/toast'

export function SocialAuthRow() {
  function handleSocial(provider: string) {
    toast.info(`${provider} sign-in isn't available in this demo yet.`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-label-md text-[12px] uppercase tracking-widest text-on-surface-variant">or continue with</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocial('Google')}
          className="rounded-xl border border-white/10 bg-white/5 py-3 font-label-md text-label-md text-on-surface transition-all hover:bg-white/10"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => handleSocial('Microsoft')}
          className="rounded-xl border border-white/10 bg-white/5 py-3 font-label-md text-label-md text-on-surface transition-all hover:bg-white/10"
        >
          Microsoft
        </button>
      </div>
    </div>
  )
}
