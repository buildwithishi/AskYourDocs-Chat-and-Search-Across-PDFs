import { useMemo, useState } from 'react'
import { SearchInput } from '@/components/shared/SearchInput'
import { EmptyState } from '@/components/shared/EmptyState'
import { usePageHeader } from '@/hooks/usePageHeader'
import { useDocumentUpload } from '@/hooks/useDocumentUpload'
import { useDocumentsStore } from '@/store/documentsStore'
import { UploadDropzone } from './components/UploadDropzone'
import { FiltersBar, type ViewMode, type FileTypeFilter, type DateFilter } from './components/FiltersBar'
import { DocumentGrid } from './components/DocumentGrid'
import { DocumentListView } from './components/DocumentListView'

const DAY_MS = 24 * 60 * 60 * 1000

export function DocumentsPage() {
  const documents = useDocumentsStore((s) => s.documents)
  usePageHeader('Documents', `${documents.length} files total`)
  const upload = useDocumentUpload()

  const [view, setView] = useState<ViewMode>('grid')
  const [query, setQuery] = useState('')
  const [fileType, setFileType] = useState<FileTypeFilter>('all')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')

  const filteredDocuments = useMemo(() => {
    const now = Date.now()
    return documents.filter((doc) => {
      const matchesQuery = doc.name.toLowerCase().includes(query.trim().toLowerCase())
      const matchesType = fileType === 'all' || doc.extension === fileType
      const matchesDate =
        dateFilter === 'all' ||
        (dateFilter === '24h' && now - doc.createdAt <= DAY_MS) ||
        (dateFilter === 'week' && now - doc.createdAt <= 7 * DAY_MS)
      return matchesQuery && matchesType && matchesDate
    })
  }, [documents, query, fileType, dateFilter])

  return (
    <div>
      <UploadDropzone upload={upload} />
      <section>
        <div className="mb-stack-gap-md">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents by name..."
            className="w-full md:w-96"
          />
        </div>
        <FiltersBar
          view={view}
          onViewChange={setView}
          fileType={fileType}
          onFileTypeChange={setFileType}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />
        {filteredDocuments.length === 0 ? (
          <EmptyState
            icon="search_off"
            title="No documents found"
            description="Try a different search term or adjust your filters."
          />
        ) : view === 'grid' ? (
          <DocumentGrid documents={filteredDocuments} onAddClick={upload.triggerSelect} />
        ) : (
          <DocumentListView documents={filteredDocuments} />
        )}
      </section>
    </div>
  )
}
