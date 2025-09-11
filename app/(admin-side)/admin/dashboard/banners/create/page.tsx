'use client'
import { useEffect, useRef, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createBanner } from '@/lib/actions/banner'
import { useRouter } from 'next/navigation'

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

const banners = ['hero', 'promoMini', 'promoLarge']

export default function CreateBanner() {
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
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)
  const router = useRouter()
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
    setButtonText('shop now')
    setImageUrl(product.imageUrls)
    setPrice(product.originalPrice.toString())
    setBannerType('')
    setSearchQuery(product.name)
    setShowDropdown(false)
    setErrors({})
    form.reset()
  }

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await createBanner(formData)
      if ('errors' in res) {
        setErrors(res.errors)
        setSuccess(false)
      } else {
        setErrors({})
        setSuccess(true)
        router.push('/admin/dashboard/banners')
      }
    })
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
        action={handleSubmit}
        className='space-y-4 p-6 border rounded-xl shadow bg-white'
      >
        <div className='flex gap-1 md:justify-between'>
          <div className='space-y-2'>
            <Label htmlFor='bannerType'>Type of banner</Label>
            {/* Banner Type */}
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
            {/* Hidden field to include in FormData */}
            <input type='hidden' name='bannerType' value={bannerType} />
            {errors.bannerType && (
              <p className='text-sm text-red-500'>{errors.bannerType}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='productId'>Product id</Label>
            <Input name='productId' id='productId' value={productId} readOnly />
            {errors.productId && (
              <p className='text-sm text-red-500'>{errors.productId}</p>
            )}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='title'>Banner Title</Label>
          <Input
            id='title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Summer Sale'
          />
          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='subtitle'>Subtitle</Label>
          <Input
            id='subtitle'
            name='subtitle'
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder='Up to 50% off selected items'
          />
          {errors.subtitle && (
            <p className='text-sm text-red-500'>{errors.subtitle}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='imageUrl'>Image URL</Label>
          <Input
            id='imageUrl'
            name='imageUrl'
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
            name='price'
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Summer Sale'
            readOnly
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='ctaText'>CTA Text</Label>
          <Input
            id='buttonText'
            name='buttonText'
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder='Shop Now'
          />
          {errors.buttonText && (
            <p className='text-sm text-red-500'>{errors.buttonText}</p>
          )}
        </div>
        {errors._form && (
          <p className='text-red-500 text-sm'>{errors._form[0]}</p>
        )}
        {success && <p className='text-green-600 text-sm'>Banner created!</p>}

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Banner'}
        </Button>
      </form>
    </div>
  )
}
