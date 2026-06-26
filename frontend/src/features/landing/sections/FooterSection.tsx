import { useState, type FormEvent } from 'react'
import { toast } from '@/lib/toast'

const PLATFORM_LINKS = ['Pricing', 'Features', 'Documentation', 'API Status']
const COMPANY_LINKS = ['About Us', 'Careers', 'Blog', 'Privacy Policy']
const LEGAL_LINKS = ['Terms', 'Security', 'Sitemap']

function ComingSoonLink({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => toast.info(`${label} page is coming soon.`)} className={className}>
      {label}
    </button>
  )
}

export function FooterSection() {
  const [email, setEmail] = useState('')

  function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    toast.success("You're subscribed!", { description: "We'll send AI insights to " + email })
    setEmail('')
  }

  return (
    <footer className="border-t border-white/5 bg-surface-container-lowest px-margin-desktop py-20">
      <div className="mx-auto mb-20 grid max-w-container-max-width grid-cols-2 gap-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <h4 className="mb-6 font-headline-md text-headline-md font-bold text-primary">AskYourDocs</h4>
          <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
            The future of technical document analysis. Powered by proprietary RAG architectures.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => toast.info('Follow us on X (coming soon).')}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 text-primary transition-colors hover:bg-white/10"
            >
              𝕏
            </button>
            <button
              onClick={() => toast.info('Follow us on LinkedIn (coming soon).')}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 text-primary transition-colors hover:bg-white/10"
            >
              in
            </button>
          </div>
        </div>
        <div>
          <h5 className="mb-6 font-label-md text-label-md font-bold uppercase tracking-widest text-primary">Platform</h5>
          <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
            {PLATFORM_LINKS.map((link) => (
              <li key={link}>
                <ComingSoonLink label={link} className="transition-colors hover:text-primary" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mb-6 font-label-md text-label-md font-bold uppercase tracking-widest text-primary">Company</h5>
          <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
            {COMPANY_LINKS.map((link) => (
              <li key={link}>
                <ComingSoonLink label={link} className="transition-colors hover:text-primary" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mb-6 font-label-md text-label-md font-bold uppercase tracking-widest text-primary">Newsletter</h5>
          <p className="mb-4 font-body-md text-body-md text-on-surface-variant">Get the latest AI insights delivered.</p>
          <form onSubmit={handleSubscribe} className="flex overflow-hidden rounded-lg border border-white/10 bg-white/5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-none bg-transparent p-3 font-label-md text-label-md text-on-surface outline-none focus:ring-0"
              placeholder="Email"
              type="email"
              required
            />
            <button type="submit" className="px-4 font-bold text-on-primary bg-primary">
              →
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto flex max-w-container-max-width flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
        <span className="font-label-md text-[12px] text-on-surface-variant">© 2024 AskYourDocs AI. All rights reserved.</span>
        <div className="flex gap-8">
          {LEGAL_LINKS.map((link) => (
            <ComingSoonLink key={link} label={link} className="font-label-md text-[12px] text-on-surface-variant hover:text-primary" />
          ))}
        </div>
      </div>
    </footer>
  )
}
