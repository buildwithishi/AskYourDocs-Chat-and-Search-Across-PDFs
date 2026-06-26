import type { Collection } from '@/types/collection'

const now = Date.now()
const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

export const seedCollections: Collection[] = [
  {
    id: 'col-1',
    name: 'Q3 Financial Audit',
    description: 'Quarterly reports, projections, and risk reviews.',
    documentIds: ['doc-101', 'doc-1', 'doc-7'],
    updatedAt: '2 hours ago',
    updatedAtMs: now - 2 * HOUR,
    icon: 'folder_open',
  },
  {
    id: 'col-2',
    name: 'Legal Compliance',
    description: 'Contracts, policies, and regulatory filings.',
    documentIds: ['doc-102', 'doc-3'],
    updatedAt: 'Yesterday',
    updatedAtMs: now - 1 * DAY,
    icon: 'gavel',
  },
  {
    id: 'col-3',
    name: 'Product Spec Alpha',
    description: 'Specs, design docs, and technical research.',
    documentIds: ['doc-103', 'doc-2', 'doc-5'],
    updatedAt: '3 days ago',
    updatedAtMs: now - 3 * DAY,
    icon: 'design_services',
  },
  {
    id: 'col-4',
    name: 'HR & Onboarding',
    description: 'Handbooks, policies, and onboarding material.',
    documentIds: ['doc-104', 'doc-4', 'doc-6'],
    updatedAt: '1 week ago',
    updatedAtMs: now - 7 * DAY,
    icon: 'groups',
  },
]
