'use client'
import { uploadToCloudinary } from '@/lib/actions/uploadImage'
import { useState } from 'react'


type UploadedImage = {
    url: string
    public_id: string
  }
export const UseMultiImageUpload = () => {
    const [imageUrls, setImageUrls] = useState<UploadedImage[]>([]) // explicit type
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<number[]>([])

  const uploadImages = async (files: FileList) => {
    setUploading(true)
    setProgress(Array(files.length).fill(0))

    const uploaded: any[] = []

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i]
        const buffer = await file.arrayBuffer()
        const result = await uploadToCloudinary(Buffer.from(buffer), file.name)

        uploaded.push(result)

        setProgress((prev) => {
          const updated = [...prev]
          updated[i] = 100
          return updated
        })
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }

    setImageUrls((prev) => [...prev, ...uploaded])
    setUploading(false)
  }

  return { imageUrls, uploading, progress, uploadImages }
}
