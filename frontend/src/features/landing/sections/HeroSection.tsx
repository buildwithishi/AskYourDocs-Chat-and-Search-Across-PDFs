import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '@/lib/icons'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section id="hero" className="mx-auto flex min-h-[819px] max-w-container-max-width flex-col items-center justify-center px-margin-mobile text-center md:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-stack-gap-lg inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="font-label-md text-[12px] uppercase tracking-widest text-on-surface-variant">
          V2.0 is now live
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hero-text-glow mb-stack-gap-md max-w-4xl font-display-xl text-display-xl-mobile leading-tight text-primary md:text-display-xl"
      >
        Your Documents, <br className="hidden md:block" /> Now Intelligent.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-stack-gap-lg max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant"
      >
        Connect your workspace to a specialized AI that understands your specific data. Query, analyze, and cite
        with enterprise-grade precision and absolute privacy.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col gap-stack-gap-md sm:flex-row"
      >
        <Button asChild size="lg" className="btn-glow">
          <Link to="/app/dashboard">
            Start Analyzing <Icon name="arrow_forward" />
          </Link>
        </Button>
        <Button asChild variant="glass" size="lg">
          <Link to="/app/chat">View Demo</Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="group relative mt-20 w-full max-w-5xl"
      >
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-transparent opacity-20 blur-2xl transition-opacity group-hover:opacity-30" />
        <div className="glass-card relative aspect-video overflow-hidden rounded-2xl border border-white/10">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-lowest">
            <Icon name="auto_awesome" className="text-6xl text-primary/30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
