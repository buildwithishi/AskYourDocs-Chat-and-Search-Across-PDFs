import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type ViewMode = 'grid' | 'list'
export type FileTypeFilter = 'all' | 'pdf' | 'docx' | 'txt'
export type DateFilter = 'all' | '24h' | 'week'

export interface FiltersBarProps {
  view: ViewMode
  onViewChange: (view: ViewMode) => void
  fileType: FileTypeFilter
  onFileTypeChange: (value: FileTypeFilter) => void
  dateFilter: DateFilter
  onDateFilterChange: (value: DateFilter) => void
}

export function FiltersBar({
  view,
  onViewChange,
  fileType,
  onFileTypeChange,
  dateFilter,
  onDateFilterChange,
}: FiltersBarProps) {
  return (
    <div className="mb-stack-gap-md flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onViewChange('grid')}
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            view === 'grid'
              ? 'border border-primary/20 bg-primary/10 text-primary'
              : 'text-on-surface-variant hover:bg-white/5',
          )}
        >
          <Icon name="grid_view" size={16} /> Grid
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            view === 'list'
              ? 'border border-primary/20 bg-primary/10 text-primary'
              : 'text-on-surface-variant hover:bg-white/5',
          )}
        >
          <Icon name="list" size={16} /> List
        </button>
      </div>
      <div className="flex items-center gap-stack-gap-md">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
          <span>Filter by:</span>
          <Select value={fileType} onValueChange={(v) => onFileTypeChange(v as FileTypeFilter)}>
            <SelectTrigger>
              <SelectValue placeholder="File Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">File Type</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">Document</SelectItem>
              <SelectItem value="txt">Text</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={(v) => onDateFilterChange(v as DateFilter)}>
            <SelectTrigger>
              <SelectValue placeholder="Date Added" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Date Added</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
