'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

export default function UploadImage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImagePreview(URL.createObjectURL(file)) // Create a temporary URL for the image preview
    }
  }

  return (
    <div>
      {/* Image Upload and Preview */}
      <div className='space-y-2'>
        <Label htmlFor='imageUrl'>Upload Image</Label>
        <Input
          type='file'
          id='imageUrl'
          name='imageUrl'
          accept='image/*'
          onChange={handleImageChange}
          required
          className='pr-10'
        />
        {imagePreview && (
          <div className='mt-2'>
            <Image
              src={imagePreview}
              alt='Preview'
              width={48}
              height={48}
              className='w-48 h-48 object-cover rounded-md'
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
    </div>
  )
}
