import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'
import { EmptyState } from '@/components/shared/EmptyState'
import { usePageHeader } from '@/hooks/usePageHeader'
import { toast } from '@/lib/toast'
import { useCollectionsStore } from '@/store/collectionsStore'
import { CollectionCard } from './components/CollectionCard'
import { CreateCollectionDialog } from './components/CreateCollectionDialog'

export function CollectionsPage() {
  const collections = useCollectionsStore((s) => s.collections)
  const createCollection = useCollectionsStore((s) => s.createCollection)
  usePageHeader('Collections', `${collections.length} collections`)
  const [query, setQuery] = useState('')

  const filtered = collections.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))

  function handleCreate(name: string, description: string) {
    createCollection(name, description)
    toast.success(`Created collection "${name}"`)
  }

  return (
    <div>
      <PageHeader
        title="Collections"
        subtitle="Group related documents to keep your workspace organized."
        actions={<CreateCollectionDialog onCreate={handleCreate} />}
      />
      <div className="mb-stack-gap-md">
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search collections..."
          className="w-full md:w-96"
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          icon="category"
          title={collections.length === 0 ? 'No collections yet' : 'No collections found'}
          description={
            collections.length === 0
              ? 'Create a collection to start grouping related documents.'
              : 'Try a different search term.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  )
}
