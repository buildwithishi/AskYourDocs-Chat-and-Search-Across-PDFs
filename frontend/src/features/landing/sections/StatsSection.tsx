const STATS = [
  { value: '10k+', label: 'Files Analyzed' },
  { value: '99.9%', label: 'Accuracy Rate' },
  { value: '0.8s', label: 'Search Latency' },
  { value: '24/7', label: 'Expert Support' },
]

const BADGES = ['SOC2 Compliant', 'End-to-End Encrypted', 'No Training on User Data']

export function StatsSection() {
  return (
    <section id="enterprise" className="mx-auto max-w-container-max-width px-margin-mobile py-32 md:px-margin-desktop">
      <div className="glass-card relative flex flex-col justify-between gap-12 overflow-hidden rounded-[40px] border border-white/5 p-12 md:flex-row md:p-20">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="flex-1 space-y-6">
          <h2 className="font-headline-lg text-headline-lg text-primary">Built for Professional Rigor</h2>
          <p className="max-w-md font-body-lg text-body-lg text-on-surface-variant">
            Scale your research workflow with a system designed for the most demanding technical environments.
          </p>
          <div className="flex flex-wrap gap-4">
            {BADGES.map((badge) => (
              <div key={badge} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-label-md text-label-md">
                {badge}
              </div>
            ))}
          </div>
        </div>
        <div className="relative grid flex-1 grid-cols-2 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-[48px] font-bold tracking-tighter text-primary">{stat.value}</span>
              <span className="font-label-md text-[12px] uppercase tracking-widest text-on-surface-variant">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
