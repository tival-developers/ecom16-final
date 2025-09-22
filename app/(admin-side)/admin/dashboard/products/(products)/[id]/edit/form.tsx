'use client'
import { useState, useEffect, useTransition } from 'react'
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
import { getAllCategories, getCategoryById } from '@/lib/actions/category'
import { CategoryData, ProductType, UploadedImage } from '@/lib/types/product'
import { Textarea } from '@/components/ui/textarea'
import Uploader from '@/lib/helper/upload'
import Link from 'next/link'
import { createProduct } from '@/lib/actions/products.actions'
import { ArrowRight } from 'lucide-react'
const BRANDS = ['HP', 'Dell', 'Lenovo', 'Apple', 'Asus', 'Acer']
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Edit product',
  description: 'edit product ',
}

export default function UpdateProductForm({product}: {product: ProductType }) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  )
  const [categoryId, setCategoryId] = useState(product.category)
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [originalPrice, setPrice] = useState(product.originalPrice)
  const [stock, setStock] = useState(product.stock)
  const [brand, setBrand] = useState(product.brand)
  const [serialNumber, setSerialNumber] = useState(product.serialNumber)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [variationValues, setVariationValues] = useState<
    Record<string, string>
  >({})
  const variations = categoryData?.variations ?? []
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)

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
  async function handleSubmit() {
    const trimmedVariations = Object.fromEntries(
      Object.entries(variationValues).filter(([, v]) => v.trim() !== '')
    )
    if (images.length === 0) {
      setErrors({ imageUrls: ['At least one image is required'] })
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('originalPrice', originalPrice.toString())
    formData.append('stock', stock.toString())
    formData.append('categoryId', categoryId)
    images.forEach((img) => formData.append('imageUrls[]', img.url))
    formData.append('variations', JSON.stringify(trimmedVariations))
    formData.append('brand', brand)
    formData.append('serialNumber', serialNumber)

    startTransition(async () => {
      const res = await createProduct(formData)
      if ('errors' in res) {
        setErrors(res.errors)
        setSuccess(false)
      } else {
        setErrors({})
        setSuccess(true)
        toast.success('Product created!')
        // reset fields like admin form
        setName('')
        setDescription('')
        setPrice(0)
        setStock(0)
        setCategoryId('')
        setImages([])
        setVariationValues({})
        setBrand('')
        setSerialNumber('')
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  return (
    <div className='max-w-4xl mx-auto p-4 space-y-4 my-10'>
      <Card className=' space-y-4 p-10  rounded-2xl m-1 md:mt-10 '>
        <CardHeader>
          <h2 className='text-xl font-bold text-amber-600'>Update Product</h2>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className='space-y-4'>
            <div className='space-y-4'>
                {/* Hidden field for product id */}
          <input type='hidden' name='id' value={product._id} />
              <div className='flex items-center justify-between'>
                <Label>Category</Label>
                <Button variant={'link'}>
                  <Link
                    href='/admin/dashboard/products/product-categories/create'
                    className='flex items-center gap-2'
                  >
                    Add Categories
                    <ArrowRight className='mr-2' />
                  </Link>
                </Button>
              </div>

              {categories.length > 0 ? (
                <Select
                  value={categoryId}
                  onValueChange={setCategoryId}
                  required
                >
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
              ) : (
                <div className='p-4 border rounded text-center bg-gray-50 text-gray-500'>
                  No categories found.
                  <br />
                  <Link href='/admin/dashboard/products/product-categories/create'>
                    <Button variant='link' className='text-amber-600'>
                      Create one
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className='space-y-4'>
              <Label>Product Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='hp elite....'
                className='capitalize'
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name}</p>
              )}
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
                {errors.brand && (
                  <p className='text-sm text-red-500'>{errors.brand}</p>
                )}
              </div>

              <div className='space-y-4 w-full'>
                <Label>Serial Number</Label>
                <Input
                  type='text'
                  value={serialNumber}
                  className='uppercase'
                  onChange={(e) => setSerialNumber(e.target.value)}
                  required
                  placeholder='TY9077'
                />
                {errors.serialNumber && (
                  <p className='text-sm text-red-500'>{errors.serialNumber}</p>
                )}
              </div>
            </div>

            {/* variations*/}

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
                required
                placeholder='its an elegant...'
              />
              {errors.description && (
                <p className='text-sm text-red-500'>{errors.description}</p>
              )}
            </div>

            <div className='space-y-4'>
              <Label>Images</Label>
              <Uploader
                onChange={(imgs) => {
                  setImages(imgs)
                  //console.log('Parent received images:', imgs)
                }}
              />
              {errors.imageUrls && (
                <p className='text-sm text-red-500'>{errors.imageUrls[0]}</p>
              )}
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
                  required
                />
                {errors.originalPrice && (
                  <p className='text-sm text-red-500'>{errors.originalPrice}</p>
                )}
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
                  required
                />
                {errors.stock && (
                  <p className='text-sm text-red-500'>{errors.stock}</p>
                )}
              </div>
            </div>
            {errors._form && (
              <p className='text-red-500 text-sm'>{errors._form[0]}</p>
            )}
            {success && (
              <p className='text-green-600 text-sm'>product created!</p>
            )}

            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
