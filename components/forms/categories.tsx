'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from 'sonner'
import { createCategory } from '@/lib/actions/category'
import { UploadedImage } from '@/lib/types/product'
import {  ArrowRight, Loader2 } from 'lucide-react'
import Uploader from '@/lib/helper/upload'
import { FormSchemaCategory } from '@/lib/zod/schemasValidations'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import { CategoryType } from '@/lib/types/categories'

export default function CategoryForm({category}:{category:CategoryType}) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [autoSlug, setAutoSlug] = useState(true)
  const [variations, setVariations] = useState<string[]>([''])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (autoSlug) {
      const generated = name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      setSlug(generated)
    }
  }, [name, autoSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cleanedVariations = variations.filter((v) => v.trim() !== '')
    const image = images[0]?.url || ''

    const result = FormSchemaCategory.safeParse({
      name,
      slug,
      image,
      variations: cleanedVariations,
    })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      toast.error('Please fix the errors and try again.')
      console.error('Zod Validation Error:', result.error.format())

      return
    }

    if (images.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: 'At least one image is required.',
      }))
      toast.error('Please upload at least one image.')
      return
    }

    setErrors({})
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('slug', slug)
    formData.append('image', image)
    formData.append('variations', JSON.stringify(cleanedVariations))
    //console.log(formData)
    const res = await createCategory(formData)
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Category created!')
      setName('')
      setSlug('')
      setVariations([''])
      setImages([])
    }

    setIsSubmitting(false)
  }

  return (
    <Card className='max-w-xl mx-auto p-4 space-y-4 my-10'>
      <CardHeader>
        <h2 className='text-xl font-semibold'>Create Category</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input
              autoFocus
              value={category.name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label className='flex items-center justify-between'>
              <span>Slug</span>
              <span className='flex items-center gap-2 text-sm'>
                Auto-generate
                <Switch
                  checked={autoSlug}
                  onCheckedChange={() => setAutoSlug((prev) => !prev)}
                />
              </span>
            </Label>
            <Input
              value={category.slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              disabled={autoSlug}
            />
            {errors.slug && (
              <p className='text-sm text-red-500'>{errors.slug}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label>Images</Label>
            <Uploader
              onChange={(imgs) => {
                setImages(imgs)
                //console.log('Parent received images:', imgs)
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
                    setVariations(updated.length ? updated : [''])
                  }}
                  disabled={variations.length === 1}
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
            {errors.variations && (
              <p className='text-sm text-red-500'>{errors.variations}</p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className='animate-spin mr-2 h-4 w-4' /> updating...
              </>
            ) : (
              'Update Category'
            )}
          </Button>
        </form>
        <div className='p-5 flex justify-end'>
          <Link href='/admin/dashboard/products/create' className='flex gap-1.5 items-center'>
            <Button variant='link' className='text-amber-600'>
              Proceed to add products
            </Button>
            <ArrowRight />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
