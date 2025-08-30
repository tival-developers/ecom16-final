// components/UploadImageModal.tsx
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import DragDropImageUploader from './DragDropImageUploader'

export default function UploadImageModal({
  onImagesUploaded,
}: {
  onImagesUploaded: (files: File[]) => void
}) {
  const [open, setOpen] = useState(false)

  const handleFiles = (files: File[]) => {
    onImagesUploaded(files)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Upload Images</Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Upload Product Images</DialogTitle>
        </DialogHeader>
        <DragDropImageUploader onFilesSelected={handleFiles} />
      </DialogContent>
    </Dialog>
  )
}
