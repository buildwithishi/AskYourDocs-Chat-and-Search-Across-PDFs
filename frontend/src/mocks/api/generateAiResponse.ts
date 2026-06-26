import type { ChatMessage } from '@/types/chat'

const RESPONSE_TEMPLATES = [
  {
    title: 'Analysis',
    bulletPoints: [
      { label: 'Key finding', body: 'Cross-referenced your workspace documents and surfaced the most relevant passages.' },
      { label: 'Context', body: 'This appears consistent with patterns found in related quarterly filings.' },
    ],
  },
  {
    title: 'Summary',
    bulletPoints: [
      { label: 'Direct answer', body: 'Based on the indexed documents, here is what stood out for your query.' },
      { label: 'Caveat', body: 'Confidence is high, but consider verifying against the most recent filing.' },
    ],
  },
  {
    title: 'Findings',
    bulletPoints: [
      { label: 'Primary source', body: 'The strongest match comes from a recently uploaded document in your workspace.' },
      { label: 'Secondary signal', body: 'A related mention was also found in an older record, included as a source below.' },
    ],
  },
]

const SOURCE_POOL = [
  { documentName: 'Q3_Financial...', icon: 'picture_as_pdf', pageRef: 'Page 9' },
  { documentName: 'Compliance_Log', icon: 'article', pageRef: 'Sec 2.1' },
  { documentName: 'Market_Analysis', icon: 'description', pageRef: 'Page 41' },
]

export function generateAiResponse(userText: string): ChatMessage {
  const template = RESPONSE_TEMPLATES[Math.floor(Math.random() * RESPONSE_TEMPLATES.length)]
  const sourceCount = 1 + Math.floor(Math.random() * 2)
  const sources = SOURCE_POOL.slice(0, sourceCount).map((s, i) => ({
    id: `src-${Date.now()}-${i}`,
    ...s,
    excerpt: `"...relevant passage matched against: ${userText.slice(0, 60)}..."`,
  }))

  return {
    id: `msg-${Date.now()}-ai`,
    role: 'assistant',
    timestamp: '',
    title: template.title,
    content: `Here's what I found related to "${userText}":`,
    bulletPoints: template.bulletPoints,
    confidence: 86 + Math.floor(Math.random() * 13),
    sources,
  }
}
