'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Product {
  _id: string
  name: string
  imageUrls: string
  originalPrice: number
  startAt: Date
  endAt: Date
}
const FormSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  buttonText: z.string(),
  imageUrl: z.string(),
  bannerType: z.string(),
})

const banners = ['hero', 'promoMini','promoLarge']

export default function BannerForm() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [productId, setProductId] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [buttonText, setButtonText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [bannerType, setBannerType] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      imageUrl: '',
      buttonText: 'shop now',
    },
  })

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }

    let cancelled = false
    async function fetchProducts() {
      try {
        const res = await fetch(
          `/api/products/search?search=${encodeURIComponent(searchQuery)}`
        )
        if (!res.ok) throw new Error('Failed to fetch products')
        const data: Product[] = await res.json()
        if (!cancelled) setSearchResults(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchProducts()
    return () => {
      cancelled = true
    }
  }, [searchQuery])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])
  const handleSelect = (product: Product) => {
    setProductId(product._id)
    setTitle(product.name)
    setSubtitle('')
    setButtonText('')
    setImageUrl(product.imageUrls)
    setPrice(product.originalPrice.toString())
    setBannerType('')
    setSearchQuery(product.name)
    setShowDropdown(false)
    setErrors({})
    form.reset()
  }

  const handleSubmit = async () => {
    if (!title || !subtitle || !buttonText || !productId || !bannerType) {
      toast.error('Please fill in all the required fields.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subtitle,
          buttonText,
          productId,
          imageUrl,
          price: Number(price),
          bannerType,
        }),
      })

      const data = await res.json()
      console.log('Checkout responseeeeeeeeeeeeeee:', data)

      if (!res.ok) {
        console.error('Banner create error response:', data)
        throw new Error(data.error || 'Banner creation failed.')
      }

      toast.success('Banner created successfully!')
    } catch (error) {
      toast.error('Failed to create banner .')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='grid grid-cols-1 md:grid-cols-2 gap-6 p-10'
      ref={containerRef}
    >
      <h2 className='text-xl font-bold'>Create Banner</h2>
      <div className='col-span-1 sm:col-span-2 md:col-span-4 space-y-2'>
        <label className='block mb-1 font-medium'>Search product</label>
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder='Search product...'
        />
        {showDropdown && searchResults.length > 0 && (
          <ul className='absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md text-yellow-700'>
            {searchResults.map((product) => (
              <li
                key={product._id}
                className='p-2 cursor-pointer hover:bg-blue-100 text-green-800'
                onClick={() => handleSelect(product)}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Banner Form */}
      <form
        onSubmit={handleSubmit}
        className='space-y-4 p-6 border rounded-xl shadow bg-white'
      >
        <div className='flex justify-between'>
          <div className='space-y-2'>
            <Label htmlFor='bannerType'>Type of banner</Label>
            <Select value={bannerType} onValueChange={setBannerType} required>
              <SelectTrigger>
                <SelectValue placeholder='Select banner' />
              </SelectTrigger>
              <SelectContent>
                {banners.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='productId'>Product id</Label>
            <Input
              id='productId'
              value={productId}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='productId'
              readOnly
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='title'>Banner Title</Label>
          <Input
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Summer Sale'
            readOnly
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='subtitle'>Subtitle</Label>
          <Input
            id='subtitle'
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder='Up to 50% off selected items'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='imageUrl'>Image URL</Label>
          <Input
            id='imageUrl'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder='https://example.com/banner.jpg'
            readOnly
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='price'>Price</Label>
          <Input
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='2000'
            readOnly
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='ctaText'>CTA Text</Label>
          <Input
            id='buttonText'
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder='Shop Now'
          />
        </div>

        <Button type='submit' disabled={loading}>
          {loading ? 'Saving...' : 'Save Banner'}
        </Button>
      </form>

      {/* Live Banner Preview */}
      <Card className='overflow-hidden shadow-lg'>
        {imageUrl ? (
          <div className='relative w-full h-64'>
            <Image
              src={imageUrl}
              alt={title || 'Banner'}
              fill
              className='object-cover'
            />
          </div>
        ) : (
          <div className='w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500'>
            No Image Selected
          </div>
        )}
        <CardContent className='p-6'>
          <h2 className='text-2xl font-bold'>{title || 'Banner Title'}</h2>
          <h3 className='text-lg text-primary mb-2'>
            {subtitle || 'Subtitle'}
          </h3>

          <a
            href={`/product/${productId}`}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-3 inline-block text-sm text-blue-600 underline'
          >
            {buttonText}
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
