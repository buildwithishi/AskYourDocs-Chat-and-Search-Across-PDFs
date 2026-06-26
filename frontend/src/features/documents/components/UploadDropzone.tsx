import { useState, type ChangeEvent, type DragEvent } from 'react'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import type { useDocumentUpload } from '@/hooks/useDocumentUpload'

export function UploadDropzone({ upload }: { upload: ReturnType<typeof useDocumentUpload> }) {
  const { inputRef, uploadingFiles, processFiles, triggerSelect } = upload
  const [isDragging, setIsDragging] = useState(false)

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    processFiles(e.target.files)
    e.target.value = ''
  }

  return (
    <section className="mb-stack-gap-lg">
      <div
        onClick={triggerSelect}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'liquid-border glass-card group flex cursor-pointer flex-col items-center justify-center rounded-2xl p-12 text-center transition-all duration-500 hover:bg-white/[0.04]',
          isDragging && 'border-primary/40 bg-white/[0.06]',
        )}
      >
        <input ref={inputRef} type="file" multiple className="hidden" onChange={handleInputChange} accept=".pdf,.docx,.txt,.md" />
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/40">
          <Icon name="cloud_upload" className="text-4xl text-primary/60 group-hover:text-primary" />
        </div>
        <h3 className="mb-2 font-headline-md text-headline-md text-primary">
          {isDragging ? 'Drop to upload' : 'Drop files here to ingest'}
        </h3>
        <p className="mx-auto max-w-md text-on-surface-variant">
          Upload PDF, DOCX, or TXT. Our AI will automatically process, index, and prepare them for your workspace.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-label-md text-sm">
          <span className="rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-on-surface-variant">Max size 100MB</span>
          <span className="rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-on-surface-variant">Bulk upload supported</span>
        </div>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadingFiles.map((file) => (
            <div key={file.id} className="glass-card rounded-xl p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="truncate font-label-md text-sm text-on-surface">{file.name}</span>
                <span className="font-label-md text-xs text-on-surface-variant">{Math.round(file.progress)}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded bg-white/5">
                <div className="h-full bg-primary transition-all" style={{ width: `${file.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
