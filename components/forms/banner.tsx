// ('use client')
// import { useEffect, useRef, useState } from 'react'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { Label } from '@/components/ui/label'
// import { toast } from 'sonner'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { BannerType } from '../homepage/banner'

// interface Product {
//   _id: string
//   name: string
//   imageUrls: string
//   originalPrice: number
//   startAt: Date
//   endAt: Date
// }
// const FormSchema = z.object({
//   title: z.string(),
//   subtitle: z.string(),
//   buttonText: z.string(),
//   imageUrl: z.string(),
//   bannerType: z.string(),
// })

// const banners = ['hero', 'promoMini', 'promoLarge']

// export default function UpdateBannerForm({banner}:{banner:BannerType}) {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<Product[]>([])
//   const [productId, setProductId] = useState('')
//   const [showDropdown, setShowDropdown] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [title, setTitle] = useState('')
//   const [subtitle, setSubtitle] = useState('')
//   const [buttonText, setButtonText] = useState('')
//   const [imageUrl, setImageUrl] = useState('')
//   const [bannerType, setBannerType] = useState('')
//   const [price, setPrice] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [errors, setErrors] = useState<{ [key: string]: string }>({})

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       title: '',
//       subtitle: '',
//       imageUrl: '',
//       buttonText: 'shop now',
//     },
//   })

//   useEffect(() => {
//     if (searchQuery.length < 2) {
//       setSearchResults([])
//       return
//     }

//     let cancelled = false
//     async function fetchProducts() {
//       try {
//         const res = await fetch(
//           `/api/products/search?search=${encodeURIComponent(searchQuery)}`
//         )
//         if (!res.ok) throw new Error('Failed to fetch products')
//         const data: Product[] = await res.json()
//         if (!cancelled) setSearchResults(data)
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchProducts()
//     return () => {
//       cancelled = true
//     }
//   }, [searchQuery])

//   useEffect(() => {
//     function onClickOutside(e: MouseEvent) {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       ) {
//         setShowDropdown(false)
//       }
//     }
//     document.addEventListener('mousedown', onClickOutside)
//     return () => document.removeEventListener('mousedown', onClickOutside)
//   }, [])
//   const handleSelect = (product: Product) => {
//     setProductId(product._id)
//     setTitle(product.name)
//     setSubtitle('')
//     setButtonText('')
//     setImageUrl(product.imageUrls)
//     setPrice(product.originalPrice.toString())
//     setBannerType('')
//     setSearchQuery(product.name)
//     setShowDropdown(false)
//     setErrors({})
//     form.reset()
//   }

//   const handleSubmit = async () => {
//     if (!title || !subtitle || !buttonText || !productId || !bannerType) {
//       toast.error('Please fill in all the required fields.')
//       return
//     }

//     setLoading(true)

//     try {
//       const res = await fetch('/api/banners', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title,
//           subtitle,
//           buttonText,
//           productId,
//           imageUrl,
//           price: Number(price),
//           bannerType,
//         }),
//       })

//       const data = await res.json()
//       console.log(data)

//       if (!res.ok) {
//         console.error('Banner create error response:', data)
//         throw new Error(data.error || 'Banner creation failed.')
//       }

//       toast.success('Banner created successfully!')
//     } catch (error) {
//       toast.error('Failed to create banner .')
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div
//       className='grid grid-cols-1 md:grid-cols-2 gap-6 p-10'
//       ref={containerRef}
//     >
//       <h2 className='text-xl font-bold'>Create Banner</h2>
//       <div className='col-span-1 sm:col-span-2 md:col-span-4 space-y-2'>
//         <label className='block mb-1 font-medium'>Search product</label>
//         <Input
//           value={searchQuery}
//           onChange={(e) => {
//             setSearchQuery(e.target.value)
//             setShowDropdown(true)
//           }}
//           onFocus={() => setShowDropdown(true)}
//           placeholder='Search product...'
//         />
//         {showDropdown && searchResults.length > 0 && (
//           <ul className='absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md text-yellow-700'>
//             {searchResults.map((product) => (
//               <li
//                 key={product._id}
//                 className='p-2 cursor-pointer hover:bg-blue-100 text-green-800'
//                 onClick={() => handleSelect(product)}
//               >
//                 {product.name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       {/* Banner Form */}
//       <form
//         onSubmit={handleSubmit}
//         className='space-y-4 p-6 border rounded-xl shadow bg-white'
//       >
//         <div className='flex justify-between'>
//           <div className='space-y-2'>
//             <Label htmlFor='bannerType'>Type of banner</Label>
//             <Select value={banner.bannerType} onValueChange={setBannerType} required>
//               <SelectTrigger>
//                 <SelectValue placeholder='Select banner' />
//               </SelectTrigger>
//               <SelectContent>
//                 {banners.map((b) => (
//                   <SelectItem key={b} value={b}>
//                     {b}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className='space-y-2'>
//             <Label htmlFor='productId'>Product id</Label>
//             <Input
//               id='productId'
//               value={productId}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder='productId'
//               readOnly
//             />
//           </div>
//         </div>

//         <div className='space-y-2'>
//           <Label htmlFor='title'>Banner Title</Label>
//           <Input
//             id='title'
//             value={banner.title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder='Summer Sale'
//             readOnly
//           />
//         </div>

//         <div className='space-y-2'>
//           <Label htmlFor='subtitle'>Subtitle</Label>
//           <Input
//             id='subtitle'
//             value={banner.subtitle}
//             onChange={(e) => setSubtitle(e.target.value)}
//             placeholder='Up to 50% off selected items'
//           />
//         </div>

//         <div className='space-y-2'>
//           <Label htmlFor='imageUrl'>Image URL</Label>
//           <Input
//             id='imageUrl'
//             value={banner.imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             placeholder='https://example.com/banner.jpg'
//             readOnly
//           />
//         </div>
//         <div className='space-y-2'>
//           <Label htmlFor='price'>Price</Label>
//           <Input
//             id='price'
//             value={banner.price}
//             onChange={(e) => setPrice(e.target.value)}
//             placeholder='2000'
//             readOnly
//           />
//         </div>

//         <div className='space-y-2'>
//           <Label htmlFor='ctaText'>CTA Text</Label>
//           <Input
//             id='buttonText'
//             value={banner.buttonText}
//             onChange={(e) => setButtonText(e.target.value)}
//             placeholder='Shop Now'
//           />
//         </div>

//         <Button type='submit' disabled={loading}>
//           {loading ? 'Updating...' : 'Update Banner'}
//         </Button>
//       </form>
//     </div>
//   )
// }
'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BannerType } from '../homepage/banner'

interface Product {
  _id: string
  name: string
  imageUrls: string
  originalPrice: number
  startAt: Date
  endAt: Date
}

const banners = ['hero', 'promoMini', 'promoLarge']

export default function UpdateBannerForm({ banner }: { banner: BannerType }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [productId, setProductId] = useState(banner.productId ||'')
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState(banner.title || '')
  const [subtitle, setSubtitle] = useState(banner.subtitle || '')
  const [buttonText, setButtonText] = useState(banner.buttonText || '')
  const [imageUrl, setImageUrl] = useState(banner.imageUrl || '')
  const [bannerType, setBannerType] = useState(banner.bannerType || '')
  const [price, setPrice] = useState(banner.price?.toString() || '')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Fetch products when searching
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

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!title) newErrors.title = 'Title is required'
    if (!subtitle) newErrors.subtitle = 'Subtitle is required'
    if (!buttonText) newErrors.buttonText = 'CTA Text is required'
    if (!productId) newErrors.productId = 'Please select a product'
    if (!bannerType) newErrors.bannerType = 'Please select a banner type'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)

    try {
      const res = await fetch('/api/banners', {
        method: 'PUT',
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

      if (!res.ok) {
        throw new Error(data.error || 'Banner update failed.')
      }

      toast.success('Banner updated successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update banner.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10"
      ref={containerRef}
    >
      <h2 className="text-xl font-bold">Update Banner</h2>

      {/* Product Search */}
      <div className="col-span-1 sm:col-span-2 md:col-span-4 space-y-2 relative">
        <label className="block mb-1 font-medium">Search product</label>
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search product..."
        />
        {errors.productId && (
          <p className="text-sm text-red-500">{errors.productId}</p>
        )}
        {showDropdown && searchResults.length > 0 && (
          <ul className="absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md text-yellow-700">
            {searchResults.map((product) => (
              <li
                key={product._id}
                className="p-2 cursor-pointer hover:bg-blue-100 text-green-800"
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
        className="space-y-4 p-6 border rounded-xl shadow bg-white"
      >
        {/* Banner Type + ProductId */}
        <div className="flex justify-between gap-4">
          <div className="space-y-2 w-1/2">
            <Label htmlFor="bannerType">Type of banner</Label>
            <Select value={bannerType} onValueChange={setBannerType}>
              <SelectTrigger>
                <SelectValue placeholder="Select banner" />
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
              <p className="text-sm text-red-500">{errors.bannerType}</p>
            )}
          </div>
          <div className="space-y-2 w-1/2">
            <Label htmlFor="productId">Product ID</Label>
            <Input id="productId" value={productId} readOnly />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Banner Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summer Sale"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Up to 50% off selected items"
          />
          {errors.subtitle && (
            <p className="text-sm text-red-500">{errors.subtitle}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/banner.jpg"
            readOnly
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="2000"
            readOnly
          />
        </div>

        {/* CTA Text */}
        <div className="space-y-2">
          <Label htmlFor="buttonText">CTA Text</Label>
          <Input
            id="buttonText"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Shop Now"
          />
          {errors.buttonText && (
            <p className="text-sm text-red-500">{errors.buttonText}</p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Banner'}
        </Button>
      </form>
    </div>
  )
}
