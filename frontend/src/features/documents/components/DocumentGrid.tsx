import { motion } from 'framer-motion'
import { Icon } from '@/lib/icons'
import type { AppDocument } from '@/types/document'
import { DocumentCard } from './DocumentCard'

export function DocumentGrid({ documents, onAddClick }: { documents: AppDocument[]; onAddClick: () => void }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
        >
          <DocumentCard document={doc} />
        </motion.div>
      ))}
      <button
        onClick={onAddClick}
        className="glass-card flex cursor-pointer flex-col items-center justify-center rounded-xl border-dashed border-white/10 p-5 opacity-60 transition-all hover:opacity-100"
      >
        <Icon name="add_circle" className="mb-2 text-3xl text-on-surface-variant" />
        <span className="font-label-md text-sm">Add New File</span>
      </button>
    </div>
  )
}
