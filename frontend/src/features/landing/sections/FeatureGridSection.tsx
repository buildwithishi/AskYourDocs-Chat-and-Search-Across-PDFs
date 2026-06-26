import { Link } from 'react-router-dom'
import { Icon } from '@/lib/icons'
import { GlassCard } from '@/components/shared/GlassCard'

const FEATURES = [
  {
    icon: 'chat_bubble',
    title: 'AI Chat',
    description:
      'Engage in deep, contextual conversations with your PDFs, spreadsheets, and meeting transcripts using state-of-the-art LLMs.',
    cta: 'Explore Interface',
    to: '/app/chat',
  },
  {
    icon: 'pageview',
    title: 'Semantic Search',
    description:
      'Find concepts, not just keywords. Our vector-based search engine understands intent and meaning across thousands of documents.',
    cta: 'Indexing Tech',
    to: '/app/search',
  },
  {
    icon: 'menu_book',
    title: 'Deep Citations',
    description:
      'Never trust a hallucination. Every response is backed by pinpoint accurate citations with one-click navigation to source pages.',
    cta: 'Trust Metrics',
    to: '/app/chat',
  },
]

export function FeatureGridSection() {
  return (
    <section id="features" className="mx-auto mt-20 max-w-container-max-width px-margin-mobile py-stack-gap-lg md:px-margin-desktop">
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">Precision-Engineered Intelligence</h2>
        <div className="h-1 w-20 rounded-full bg-primary/20" />
      </div>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        {FEATURES.map((feature) => (
          <GlassCard key={feature.title} rounded="3xl" className="group flex flex-col items-start gap-stack-gap-md p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-primary/30">
              <Icon name={feature.icon} filled className="text-primary" />
            </div>
            <h3 className="font-headline-md text-headline-md text-primary">{feature.title}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{feature.description}</p>
            <Link
              to={feature.to}
              className="mt-auto flex items-center gap-2 pt-4 font-label-md text-label-md text-primary transition-transform group-hover:translate-x-2"
            >
              {feature.cta} <Icon name="north_east" size={18} />
            </Link>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
