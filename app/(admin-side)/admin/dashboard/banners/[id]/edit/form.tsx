'use client'
import { useEffect, useRef, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateBanner } from '@/lib/actions/banner'
import { useRouter } from 'next/navigation'

interface Banner {
  _id: string
  title: string
  subtitle: string
  buttonText: string
  productId: string
  imageUrl: string
  price: number
  bannerType: string
}

interface Product {
  _id: string
  name: string
  imageUrls: string
  originalPrice: number
  startAt: Date
  endAt: Date
}

const banners = ['hero', 'promoMini', 'promoLarge']

export default function UpdateBannerForm({ banner }: { banner: Banner }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [productId, setProductId] = useState(banner.productId)
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState(banner.title)
  const [subtitle, setSubtitle] = useState(banner.subtitle)
  const [buttonText, setButtonText] = useState(banner.buttonText)
  const [imageUrl, setImageUrl] = useState(banner.imageUrl)
  const [bannerType, setBannerType] = useState(banner.bannerType)
  const [price, setPrice] = useState(banner.price)
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const router = useRouter()

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
    setPrice(product.originalPrice)
    setBannerType('')
    setSearchQuery(product.name)
    setShowDropdown(false)
    setErrors({})
  }

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateBanner(formData)
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
      className='grid grid-cols-1 md:grid-cols-2 gap-6 p-5'
      ref={containerRef}
    >
      <h2 className='text-xl font-bold'>Update Banner</h2>
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
        <div className='flex justify-between gap-4'>
          {/* Hidden field for banner id */}
          <input type='hidden' name='id' value={banner._id} />
          {/* Hidden for bannerType */}
          <input type='hidden' name='bannerType' value={bannerType} />
          {/* Hidden for productId */}
          <input type='hidden' name='productId' value={productId} />
          {/* Hidden for price */}
          <input type='hidden' name='price' value={price} />

          <div className='space-y-2 flex-1'>
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
            <Input id='price' value={price} readOnly />
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
        {success && <p className='text-green-600 text-sm'>Banner updated!</p>}

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Banner'}
        </Button>
      </form>
    </div>
  )
}
