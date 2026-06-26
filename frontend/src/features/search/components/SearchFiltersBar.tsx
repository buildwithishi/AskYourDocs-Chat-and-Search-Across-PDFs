import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const TAGS = ['all', 'Finance', 'Legal', 'Strategy', 'HR']
const RELEVANCE_OPTIONS = [
  { value: '0', label: 'Any relevance' },
  { value: '70', label: '70%+' },
  { value: '85', label: '85%+' },
  { value: '95', label: '95%+' },
]

export interface SearchFiltersBarProps {
  tag: string
  onTagChange: (tag: string) => void
  minRelevance: string
  onMinRelevanceChange: (value: string) => void
}

export function SearchFiltersBar({ tag, onTagChange, minRelevance, onMinRelevanceChange }: SearchFiltersBarProps) {
  return (
    <div className="mb-stack-gap-md flex items-center justify-center gap-3">
      <Select value={tag} onValueChange={onTagChange}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {TAGS.map((t) => (
            <SelectItem key={t} value={t}>
              {t === 'all' ? 'All categories' : t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={minRelevance} onValueChange={onMinRelevanceChange}>
        <SelectTrigger>
          <SelectValue placeholder="Relevance" />
        </SelectTrigger>
        <SelectContent>
          {RELEVANCE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
