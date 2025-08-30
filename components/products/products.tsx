'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { getAllCategories, getCategoryById } from '@/lib/actions/cat'

import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import Uploader from '@/lib/helper/upload'
//import { Router } from 'next/router'
import Link from 'next/link'
import { createProduct } from '@/lib/actions/products.actions'
import { CategoryData, ProductType, UploadedImage } from '@/lib/types/product'
import { FormSchemaProduct } from '@/lib/zod/schemasValidations'



const BRANDS = ['HP', 'Dell', 'Lenovo', 'Apple', 'Asus', 'Acer']

export default function ProductsForm({ product }: { product: ProductType }) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [originalPrice, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [brand, setBrand] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [images, setImages] = useState<UploadedImage[]>([])
  const [variationValues, setVariationValues] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const variations = categoryData?.variations ?? []

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories()
      if (!res) {
        toast.error('Failed to load categories')
        return
      }
      setCategories(res)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) {
        setCategoryData(null)
        setVariationValues({})
        return
      }
      const res = await getCategoryById(categoryId)
      setCategoryData(res)
      setVariationValues({})
    }
    fetchCategory()
  }, [categoryId])

  const handleVariationChange = (key: string, value: string) => {
    setVariationValues((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const imageUrls = images.map((img) => img.url)
  
    const trimmedVariations = Object.fromEntries(
      Object.entries(variationValues).filter(([, v]) => v.trim() !== '')
    )
  
    const result = FormSchemaProduct.safeParse({
      name,
      description,
      originalPrice,
      stock,
      brand,
      serialNumber,
      categoryId,
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
    formData.append('description', description)
    formData.append('originalPrice', originalPrice.toString())
    formData.append('stock', stock.toString())
    formData.append('categoryId', categoryId)
    images.forEach((img) => {
      formData.append('imageUrls[]', img.url)
    })
    formData.append('variations', JSON.stringify(trimmedVariations))
    formData.append('brand', brand)
    formData.append('serialNumber', serialNumber)
  
    const res = await createProduct(formData)
    setIsSubmitting(false)
  
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Product created!')
      setName('')
      setDescription('')
      setPrice(0)
      setStock(0)
      setCategoryId('')
      setImages([])
      setVariationValues({})
      setBrand('')
      setSerialNumber('')
    }
  }
  
  

  return (
    <Card className='space-y-4 p-6 max-w-3xl mx-auto border-2 rounded-2xl mt-10'>
      <CardHeader>
        <h2 className='text-xl font-bold text-amber-600'>Create Product</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <Label>Product Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue={product?.stock}
              required
            />
             {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className='flex flex-col sm:flex-row gap-6'>
            <div className='space-y-4 w-full'>
              <Label>Brand</Label>
              <Select value={brand} onValueChange={setBrand} required>
                <SelectTrigger>
                  <SelectValue placeholder='Select brand' />
                </SelectTrigger>
                <SelectContent>
                  {BRANDS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.brand && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className='space-y-4 w-full'>
              <Label>Serial Number</Label>
              <Input
                type='text'
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                defaultValue={product?.serialNumber}
                required
              />
               {errors.serialNumber && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
          </div>

          <div className='space-y-4'>
            <Label>Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger>
                <SelectValue placeholder='Select Category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
               <Button variant={'link'} 
              // onClick={() => Router.push('/admin-side/admin/dashboard/add-category')} 
              className={'text-amber-600'}>
                {/* <Link href={'/admin/dashboard/add-category'}>Add Category
                </Link> */}
                <Link href='/1'>Add Category
                </Link>
                </Button>
            </div>
          </div>

          {variations.length > 0 && (
            <div className='space-y-4'>
              <Label className='py-4 underline'>Variations</Label>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {variations.map((variation, index) => (
                  <div key={index} className='space-y-2'>
                    <Label>{variation}</Label>
                    <Input
                      placeholder={`Enter ${variation} (optional)`}
                      value={variationValues[variation] || ''}
                      onChange={(e) =>
                        handleVariationChange(variation, e.target.value)
                      }
                    
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='space-y-4'>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={product?.description}
              required

            />
             {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className='space-y-4'>
            <Label>Images</Label>
            <Uploader
              onChange={(imgs) => {
                setImages(imgs)
                console.log('Parent received images:', imgs)
              }}
            />
            {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
          </div>

          <div className='flex flex-col sm:flex-row justify-between gap-4'>
            <div className='space-y-4 flex-1'>
              <Label>Price</Label>
              <Input
                type='number'
                min={0}
                placeholder='0'
                value={originalPrice}
                onChange={(e) =>
                  setPrice(Math.max(0, parseFloat(e.target.value) || 0))
                }
                defaultValue={product?.originalPrice}
                required
              />
               {errors.originalPrice && <p className="text-sm text-red-500">{errors.originalPrice}</p>}
            </div>

            <div className='space-y-4 flex-1'>
              <Label>Stock</Label>
              <Input
                type='number'
                min={0}
                placeholder='0'
                value={stock}
                onChange={(e) =>
                  setStock(Math.max(0, parseInt(e.target.value) || 0))
                }
                defaultValue={product?.stock}
                required
              />
               {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
            </div>
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className='animate-spin mr-2 h-4 w-4' /> Creating...
              </>
            ) : (
              'Create Product'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
