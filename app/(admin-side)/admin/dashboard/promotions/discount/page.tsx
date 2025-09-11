'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import { usePromoStore } from '@/stores/promotion'
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  imageUrls: string
  originalPrice: number
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(
    value
  )

export default function PromoManager() {
  const { items, fetchPromoItems, addPromoItem, deletePromoItem } =
    usePromoStore()

  const [productId, setProductId] = useState('')
  const [name, setName] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountAmount, setDiscountAmount] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [imageUrls, setImageUrls] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const original = parseFloat(originalPrice)

  useEffect(() => {
    fetchPromoItems()
  }, [fetchPromoItems])

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
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [])

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!productId) errs.productId = 'Select a product'
    if (!imageUrls) errs.imageUrls = 'no url'
    if (!newPrice || isNaN(Number(newPrice)))
      errs.newPrice = 'Enter valid new price'
    if (items.find((item) => item.productId === productId))
      errs.duplicate = 'Product already in promo list'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSelect = (product: Product) => {
    setProductId(product._id)
    setName(product.name)
    setOriginalPrice(product.originalPrice.toString())
    setNewPrice('')
    setDiscountAmount('')
    setDiscountPercent('')
    setImageUrls(product.imageUrls)
    setSearchQuery(product.name)
    setShowDropdown(false)
    setErrors({})
  }

  const handleAdd = async () => {
    if (!validate() || items.length >= 10) return

    try {
      await addPromoItem({
        productId,
        name,
        originalPrice: Number(originalPrice),
        newPrice: Number(newPrice),
        imageUrls,
        discountPercent: Number(discountPercent),
        discountAmount: Number(discountAmount),
      })

      setProductId('')
      setName('')
      setOriginalPrice('')
      setDiscountAmount('')
      setDiscountPercent('')
      setNewPrice('')
      setImageUrls('')
      setSearchQuery('')
      setSearchResults([])
      setErrors({})
    } catch (err) {
      console.error(err)
    }
  }

  const onDiscountAmountChange = (val: string) => {
    setDiscountAmount(val)
    const d = parseFloat(val)
    if (!isNaN(d) && original) {
      const newP = original - d
      const percent = (d / original) * 100
      setNewPrice(newP.toFixed(2))
      setDiscountPercent(percent.toFixed(2))
    }
  }

  const onDiscountPercentChange = (val: string) => {
    setDiscountPercent(val)
    const p = parseFloat(val)
    if (!isNaN(p) && original) {
      const d = (p / 100) * original
      const newP = original - d
      setDiscountAmount(d.toFixed(2))
      setNewPrice(newP.toFixed(2))
    }
  }

  const isAddDisabled =
    !productId ||
    !imageUrls ||
    !newPrice ||
    items.length >= 10 ||
    Object.keys(errors).length > 0

  return (
    <div className='max-w-5xl mx-auto p-6 mb-8'>
      <h1 className='text-3xl font-bold mb-6'>Promotion Items</h1>

      <Card
        className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative p-4'
        ref={containerRef}
      >
        {/* Search Field - Full Width */}
        <div className='col-span-1 md:col-span-3'>
          <label htmlFor='product-search' className='block mb-1 font-medium'>
            Search product
          </label>
          <Input
            id='product-search'
            placeholder='Search product...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowDropdown(true)
            }}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && searchResults.length > 0 && (
            <ul className='absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md'>
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  className='p-2 cursor-pointer hover:bg-blue-100'
                  onClick={() => handleSelect(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rest of the fields - 3 per row on desktop */}
        <div>
          <label className='block mb-1 font-medium'>Original Price</label>
          <Input value={formatPrice(Number(originalPrice))} readOnly />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Image Url</label>
          <Input value={imageUrls} readOnly />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Discount Amount</label>
          <Input
            type='number'
            placeholder='e.g. 200'
            value={discountAmount}
            onChange={(e) => onDiscountAmountChange(e.target.value)}
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Discount %</label>
          <Input
            type='number'
            placeholder='e.g. 10'
            value={discountPercent}
            onChange={(e) => onDiscountPercentChange(e.target.value)}
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Final Price</label>
          <Input value={formatPrice(Number(newPrice || 0))} readOnly />
        </div>

        {/* Error message spans full row */}
        {errors.duplicate && (
          <p className='text-red-600 col-span-1 md:col-span-3'>
            {errors.duplicate}
          </p>
        )}

        {/* Button spans full row on mobile, 1 col on desktop */}
        <div className='col-span-1 md:col-span-1 flex items-end'>
          <Button
            onClick={handleAdd}
            className='w-full'
            disabled={isAddDisabled}
          >
            Add Promo
          </Button>
        </div>
      </Card>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
        {items.map((item) => {
          const discount = item.originalPrice - item.newPrice
          const percent = ((discount / item.originalPrice) * 100).toFixed(1)
          return (
            <Card key={item._id} className='p-3'>
              <CardContent>
              <div className='relative w-full aspect-[3/3]'>
                  <Image
                    src={item.imageUrls}
                    alt={item.name}
                    fill
                    className='object-contain p-2'
                  />
                </div>

                <h2 className='text-lg font-semibold'>{item.name}</h2>
                <p className='text-sm line-through text-gray-400'>
                  {formatPrice(item.originalPrice)}
                </p>
                <p className='text-red-600 font-bold text-lg'>
                  {formatPrice(item.newPrice)}
                </p>
                <p className='text-xs text-green-700'>
                  -{formatPrice(discount)} ({percent}%)
                </p>
                <Button
                  variant='destructive'
                  className='mt-4 w-full flex items-center justify-center gap-2'
                  onClick={() => deletePromoItem(item._id)}
                >
                  <Trash2 size={16} /> Remove
                </Button>
              </CardContent>
              
            </Card>
          )
        })}
      </div>
    </div>
  )
}
