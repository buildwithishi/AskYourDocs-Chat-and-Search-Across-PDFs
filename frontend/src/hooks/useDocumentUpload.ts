import { useRef, useState } from 'react'
import { toast } from '@/lib/toast'
import { useDocumentsStore } from '@/store/documentsStore'
import type { AppDocument } from '@/types/document'

export interface UploadingFile {
  id: string
  name: string
  progress: number
}

function extensionFromName(name: string): AppDocument['extension'] {
  const ext = name.split('.').pop()?.toLowerCase()
  if (ext === 'pdf' || ext === 'docx' || ext === 'txt' || ext === 'md') return ext
  return 'txt'
}

export function useDocumentUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const addDocument = useDocumentsStore((s) => s.addDocument)
  const setStatus = useDocumentsStore((s) => s.setStatus)

  function processFiles(files: FileList | null) {
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const tempId = `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`
      setUploadingFiles((prev) => [...prev, { id: tempId, name: file.name, progress: 0 }])

      const interval = setInterval(() => {
        setUploadingFiles((prev) =>
          prev.map((f) => (f.id === tempId ? { ...f, progress: Math.min(f.progress + Math.random() * 25 + 10, 100) } : f)),
        )
      }, 280)

      setTimeout(() => {
        clearInterval(interval)
        setUploadingFiles((prev) => prev.filter((f) => f.id !== tempId))
        const doc = addDocument({
          name: file.name,
          extension: extensionFromName(file.name),
          sizeMb: Math.round((file.size / (1024 * 1024)) * 10) / 10 || 0.4,
        })
        toast.success(`${file.name} uploaded`, { description: 'Indexing for AI search and chat...' })
        setTimeout(() => {
          setStatus(doc.id, 'ready')
          toast.message(`${file.name} is ready`, { description: 'You can now chat with this document.' })
        }, 2200)
      }, 1600)
    })
  }

  function triggerSelect() {
    inputRef.current?.click()
  }

  return { inputRef, uploadingFiles, processFiles, triggerSelect }
}
