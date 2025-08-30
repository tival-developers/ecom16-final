'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from 'sonner'
import Uploader from '@/lib/helper/upload'
import { UploadedImage } from '@/lib/types/product'
import { useRouter } from 'next/navigation'
import { getCategoryById, updateCategory } from '@/lib/actions/category'
import { FormSchemaCategory } from '@/lib/zod/schemasValidations'
import { Loader2 } from 'lucide-react'

interface Props {
  params: { id: string }
}

export default function EditCategoryPage({ params }: Props) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [images, setImages] = useState<UploadedImage[]>([])
  const [variations, setVariations] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await getCategoryById(params.id)
      if (!category) {
        toast.error('Category not found')
        router.push('/categories')
        return
      }
      setName(category.name)
      setSlug(category.slug)
      setImages([])
      setVariations(category.variations || [])
    }
    fetchCategory()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const imageUrls = images.map((img) => img.url)

    const result = FormSchemaCategory.safeParse({
      name,
      slug,
      imageUrls,
    })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      toast.error('Please fix the errors and try again.')
      return
    }

    setErrors({})
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('slug', slug)
    images.forEach((img) => {
      formData.append('imageUrls[]', img.url)
    })
    formData.append(
      'variations',
      JSON.stringify(variations.filter((v) => v.trim() !== ''))
    )

    const res = await updateCategory(params.id, formData)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Category updated!')
      router.push('/admin/dashboard/products/categories')
    }
  }

  return (
    <Card className='max-w-xl mx-auto p-4 space-y-4'>
      <CardHeader>
        <h2 className='text-xl font-semibold'>Edit Category</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Slug</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <div className='space-y-4'>
            <Label>Images</Label>
            <Uploader
              onChange={(imgs: UploadedImage[]) => {
                setImages(imgs)
                console.log('Parent received images:', imgs)
              }}
            />

            {errors.images && (
              <p className='text-sm text-red-500'>{errors.images}</p>
            )}
          </div>

          <div>
            <Label>Variations</Label>
            {variations.map((v, i) => (
              <div key={i} className='flex gap-2 mt-2'>
                <Input
                  value={v}
                  onChange={(e) => {
                    const updated = [...variations]
                    updated[i] = e.target.value
                    setVariations(updated)
                  }}
                />
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => {
                    const updated = [...variations]
                    updated.splice(i, 1)
                    setVariations(updated)
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type='button'
              variant='outline'
              className='mt-2'
              onClick={() => setVariations([...variations, ''])}
            >
              Add Variation
            </Button>
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className='animate-spin mr-2 h-4 w-4' /> Creating...
              </>
            ) : (
              'Update category'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
