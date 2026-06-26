import type { SearchResult } from '@/types/search'

export const searchResults: SearchResult[] = [
  {
    id: 'res-1',
    documentName: 'Q3_Financial_Review.pdf',
    icon: 'picture_as_pdf',
    pageRef: 'Page 14',
    snippet: 'Current logistics overheads in APAC regions are expected to maintain an upward trajectory of 12% through fiscal year-end, driven primarily by shipping volatility.',
    relevance: 96,
    tag: 'Finance',
  },
  {
    id: 'res-2',
    documentName: 'Compliance_Log.docx',
    icon: 'article',
    pageRef: 'Sec 4.2',
    snippet: 'European Union Data Act (2024) mandates strict localization of metadata layers for all enterprise SaaS entities operating within member states.',
    relevance: 91,
    tag: 'Legal',
  },
  {
    id: 'res-3',
    documentName: '2024_Projections.pdf',
    icon: 'description',
    pageRef: 'Page 03',
    snippet: 'Expansion efforts in Southeast Asia are prioritized for Q1, aiming for a 22% market share capture within the first 180 days of launch.',
    relevance: 84,
    tag: 'Strategy',
  },
  {
    id: 'res-4',
    documentName: 'Employee_Handbook.txt',
    icon: 'menu_book',
    pageRef: 'Page 21',
    snippet: 'All remote employees are entitled to a quarterly stipend for home-office equipment, subject to manager approval and expense reporting.',
    relevance: 73,
    tag: 'HR',
  },
]
