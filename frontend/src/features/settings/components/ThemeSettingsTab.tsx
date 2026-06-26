import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { useThemeStore, type ThemePreference } from '@/store/themeStore'
import { toast } from '@/lib/toast'

const OPTIONS: { value: ThemePreference; label: string; icon: string; description: string }[] = [
  { value: 'dark', label: 'Dark', icon: 'dark_mode', description: 'Deep graphite, the default AskYourDocs look.' },
  { value: 'light', label: 'Light', icon: 'light_mode', description: 'Bright surfaces for high ambient light.' },
  { value: 'system', label: 'System', icon: 'contrast', description: 'Match your OS appearance setting.' },
]

export function ThemeSettingsTab() {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className="max-w-lg space-y-4">
      <p className="text-sm text-on-surface-variant">Choose how AskYourDocs looks on this device.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setTheme(option.value)
              toast.success(`Theme set to ${option.label}`)
            }}
            className={cn(
              'glass-card flex flex-col items-start gap-2 rounded-xl p-4 text-left transition-all',
              theme === option.value && 'border-primary/40',
            )}
          >
            <Icon name={option.icon} className="text-primary" />
            <span className="font-body-md font-medium text-primary">{option.label}</span>
            <span className="text-xs text-on-surface-variant">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
