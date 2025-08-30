// app/actions/uploadImage.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function uploadToCloudinary(fileBuffer: Buffer, filename: string) {
  const formData = new FormData()
  formData.append('file', new Blob([fileBuffer]), filename)
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
   revalidatePath('/admin/products/create');
   revalidatePath('/admin/products/categories');
  return {
    url: result.secure_url,
    public_id: result.public_id,
   
  }
  
}
