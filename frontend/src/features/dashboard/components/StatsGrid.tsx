import { motion } from 'framer-motion'
import { Icon } from '@/lib/icons'
import { StatCard } from '@/components/shared/StatCard'
import { GlassCard } from '@/components/shared/GlassCard'
import type { DashboardStats } from '@/mocks/api/analytics'

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export function StatsGrid({ stats }: { stats: DashboardStats }) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.06 }}
      className="mb-stack-gap-lg grid grid-cols-1 gap-gutter md:grid-cols-4"
    >
      <motion.div variants={cardVariants} transition={{ duration: 0.3 }}>
        <StatCard
          icon="description"
          iconClassName="text-primary/60"
          badge="+12%"
          glowClassName="bg-primary/10 group-hover:bg-primary/20"
          label="Total Docs"
          value={stats.totalDocs.toLocaleString()}
        />
      </motion.div>
      <motion.div variants={cardVariants} transition={{ duration: 0.3 }}>
        <StatCard
          icon="forum"
          iconClassName="text-secondary"
          badge="Live"
          glowClassName="bg-secondary/10 group-hover:bg-secondary/20"
          label="Total Chats"
          value={stats.totalChats.toLocaleString()}
        />
      </motion.div>
      <motion.div variants={cardVariants} transition={{ duration: 0.3 }}>
        <StatCard
          icon="database"
          iconClassName="text-on-surface-variant"
          badge={`${stats.storagePercent}% Full`}
          glowClassName="bg-white/5 group-hover:bg-white/10"
          label="Storage"
          value={stats.storageUsed}
        />
      </motion.div>
      <motion.div variants={cardVariants} transition={{ duration: 0.3 }}>
        <GlassCard className="group relative overflow-hidden p-6">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-primary/5 blur-3xl" />
          <div className="mb-4 flex items-start justify-between">
            <Icon name="bolt" className="text-primary" />
            <div className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">Token Usage</p>
            <p className="font-headline-lg text-headline-lg text-primary">{stats.tokenUsage}</p>
          </div>
        </GlassCard>
      </motion.div>
    </motion.section>
  )
}
