import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/lib/toast'
import { useSettingsStore } from '@/store/settingsStore'

export function ProfileSettingsTab() {
  const { profileName, profileEmail, setProfile } = useSettingsStore()
  const [name, setName] = useState(profileName)
  const [email, setEmail] = useState(profileEmail)
  const [isSaving, setIsSaving] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setProfile(name, email)
      setIsSaving(false)
      toast.success('Profile updated')
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div className="space-y-2">
        <Label htmlFor="profile-name">Full name</Label>
        <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-email">Email</Label>
        <Input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  )
}
