import type { Conversation } from '@/types/chat'

const now = Date.now()
const HOUR = 60 * 60 * 1000

export const defaultSuggestions = ['Extract financial tables', 'Draft response to stakeholders', 'Compare with Q2 Report']

export const seedConversations: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Q3 Financial Audit',
    icon: 'folder_open',
    createdAt: now - 3 * HOUR,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        timestamp: 'Sent 10:42 AM',
        content:
          'Can you summarize the risk factors identified in the Q3 report and cross-reference them with our 2024 projections?',
      },
      {
        id: 'msg-2',
        role: 'assistant',
        timestamp: '',
        title: 'Summary Analysis',
        content:
          'Based on the analyzed document "Q3_Financial_Review.pdf", I\'ve identified three primary risk factors that may impact the 2024 projections:',
        bulletPoints: [
          {
            label: 'Supply Chain Volatility',
            body: 'Recent shifts in logistics costs in the APAC region (Page 14) suggest a potential 4% margin compression.',
          },
          {
            label: 'Regulatory Shifts',
            body: 'New data privacy frameworks in the EU (Section 4.2) will require a projected infrastructure investment of $2.4M by Q2 2024.',
          },
          {
            label: 'Market Saturation',
            body: 'Core SaaS products are reaching maturity in North America, necessitating the aggressive expansion into emerging markets outlined in your 2024 plan.',
          },
        ],
        confidence: 98,
        sources: [
          {
            id: 'src-1',
            documentName: 'Q3_Financial...',
            icon: 'picture_as_pdf',
            pageRef: 'Page 14',
            excerpt:
              '...current logistics overheads in APAC regions are expected to maintain an upward trajectory of 12% through fiscal year-end...',
          },
          {
            id: 'src-2',
            documentName: 'Compliance_Log',
            icon: 'article',
            pageRef: 'Sec 4.2',
            excerpt:
              'European Union Data Act (2024) mandates strict localization of metadata layers for all enterprise SaaS entities...',
          },
          {
            id: 'src-3',
            documentName: '2024_Projections',
            icon: 'description',
            pageRef: 'Page 03',
            excerpt:
              'Expansion efforts in Southeast Asia are prioritized for Q1, aiming for a 22% market share capture within the first 180 days.',
          },
        ],
      },
    ],
  },
  {
    id: 'conv-2',
    name: 'Legal Compliance v2',
    icon: 'description',
    createdAt: now - 26 * HOUR,
    messages: [],
  },
  {
    id: 'conv-3',
    name: 'Product Spec Alpha',
    icon: 'description',
    createdAt: now - 50 * HOUR,
    messages: [],
  },
]
