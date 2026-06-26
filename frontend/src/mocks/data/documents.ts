import type { AppDocument } from '@/types/document'

const DAY = 24 * 60 * 60 * 1000
const now = Date.now()

export const seedDocuments: AppDocument[] = [
  { id: 'doc-101', name: 'Q4 Financial Forecasts 2024.pdf', extension: 'pdf', sizeMb: 4.2, dateAdded: 'Oct 26, 2023', createdAt: now - 0.2 * DAY, status: 'ready', pages: 45, tag: 'Finance', lastChatted: '2 hours ago' },
  { id: 'doc-102', name: 'Service Agreement - TechCorp.docx', extension: 'docx', sizeMb: 1.1, dateAdded: 'Oct 25, 2023', createdAt: now - 0.5 * DAY, status: 'ready', pages: 12, tag: 'Legal', lastChatted: '5 hours ago' },
  { id: 'doc-103', name: 'Market Analysis Report May.pdf', extension: 'pdf', sizeMb: 9.8, dateAdded: 'Oct 24, 2023', createdAt: now - 1 * DAY, status: 'ready', pages: 128, tag: 'Strategy', lastChatted: 'Yesterday' },
  { id: 'doc-104', name: 'Internal Privacy Policy 2.0.pdf', extension: 'pdf', sizeMb: 0.6, dateAdded: 'Oct 22, 2023', createdAt: now - 2 * DAY, status: 'ready', pages: 8, tag: 'HR', lastChatted: '2 days ago', starred: true },
  { id: 'doc-1', name: 'Q4_Fiscal_Report_2023.pdf', extension: 'pdf', sizeMb: 12.4, dateAdded: 'Oct 24, 2023', createdAt: now - 3 * DAY, status: 'processing', tag: 'Finance' },
  { id: 'doc-2', name: 'Project_Mars_Strategy.docx', extension: 'docx', sizeMb: 4.1, dateAdded: 'Oct 22, 2023', createdAt: now - 4 * DAY, status: 'ready', tag: 'Strategy' },
  { id: 'doc-3', name: 'Legal_Compliance_v4.pdf', extension: 'pdf', sizeMb: 32.8, dateAdded: 'Oct 20, 2023', createdAt: now - 6 * DAY, status: 'ready', tag: 'Legal' },
  { id: 'doc-4', name: 'Employee_Handbook.txt', extension: 'txt', sizeMb: 1.2, dateAdded: 'Oct 18, 2023', createdAt: now - 8 * DAY, status: 'ready', tag: 'HR' },
  { id: 'doc-5', name: 'Market_Analysis_Global.pdf', extension: 'pdf', sizeMb: 18.4, dateAdded: 'Oct 15, 2023', createdAt: now - 11 * DAY, status: 'ready', tag: 'Strategy' },
  { id: 'doc-6', name: 'Team_Onboarding_Notes.docx', extension: 'docx', sizeMb: 0.8, dateAdded: 'Oct 12, 2023', createdAt: now - 14 * DAY, status: 'ready', tag: 'HR' },
  { id: 'doc-7', name: 'Annual_Revenue_Projection.pdf', extension: 'pdf', sizeMb: 5.6, dateAdded: 'Oct 11, 2023', createdAt: now - 15 * DAY, status: 'indexing', tag: 'Finance' },
]
