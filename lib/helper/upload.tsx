'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { toast } from 'sonner'

type UploadedImage = {
  url: string
  public_id: string
}

type Props = {
  onChange: (images: UploadedImage[]) => void
}

export default function Uploader({ onChange }: Props) {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<number[]>([])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setProgress(Array(files.length).fill(0))

    const uploaded: UploadedImage[] = []

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      formData.append('file', files[i])
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        )
        const data = await res.json()
        uploaded.push({ url: data.secure_url, public_id: data.public_id })

        setProgress((prev) => {
          const updated = [...prev]
          updated[i] = 100
          return updated
        })
      } catch (err) {
        toast.error(`Failed to upload image ${i + 1}`)
        console.error(err)
      }
    }

    const updated = [...images, ...uploaded]
    setImages(updated)
    onChange(updated)
    console.log('Images sent to parent:', updated)
    setUploading(false)
  }

  const removeImage = async (index: number) => {
    const { public_id } = images[index]

    try {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id }),
      })
    } catch (err) {
      console.error('Error deleting image from Cloudinary:', err)
    }

    const updated = images.filter((_, i) => i !== index)
    setImages(updated)
    onChange(updated)
  }

  return (
    <div className='space-y-3'>
      <Label htmlFor='images' className='cursor-pointer'>
        <div className='bg-primary text-white p-2 rounded-lg text-center w-fit hover:bg-primary/90'>
          Upload Images
        </div>
      </Label>
      <Input
        id='images'
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={handleUpload}
      />

      {uploading && (
        <p className='text-sm text-blue-600'>
          Uploading {progress.filter((p) => p === 100).length}/{progress.length} images...
        </p>
      )}

      <div className='flex flex-wrap gap-3'>
        {images.map((img, i) => (
          <div key={i} className='w-24 h-24 relative border rounded overflow-hidden'>
            <Image
              src={img.url}
              alt={`Uploaded image ${i}`}
              fill
              className='object-cover'
            />
            <button
              type='button'
              className='absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs z-10'
              onClick={() => removeImage(i)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
