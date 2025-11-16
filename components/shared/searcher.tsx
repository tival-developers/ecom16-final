
'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

interface Product {
  _id: string
  name: string
  imageUrls: string
  originalPrice: number
}

export default function SearchComponent() {
  const router = useRouter()
  const [productId, setProductId] = useState('') // ✅ fixed
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }

    let cancelled = false
    //console.log(productId)

    async function fetchProducts() {
      try {
        const res = await fetch(
          `/api/products/search?search=${encodeURIComponent(searchQuery)}`
        )

        if (!res.ok) throw new Error('Failed to fetch products')

        const data: Product[] = await res.json()
        if (!cancelled) setSearchResults(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts()

    return () => {
      cancelled = true
    }
  }, [searchQuery, productId])

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

  const handleSelect = (product: Product) => {
    setProductId(product._id) // ✅ now works
    setSearchQuery(product.name)
    setShowDropdown(false)
    router.push(`/product/${product._id}`)
    setSearchResults([])
  }

  return (
    <>
      <div className='hidden md:flex items-center gap-2 flex-1 mx-4'>
        <Input
          id='product-search'
          type='search'
          placeholder='Search entire store...'
          className='rounded-xl border-2 border-amber-600'
          aria-label='Search Input'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => setShowDropdown(true)}
        />

        {showDropdown && searchResults.length > 0 && (
          <ul className='absolute z-20 bg-white border border-amber-600 rounded min-w-[200px] max-h-48 overflow-auto shadow-md top-30 left-140'>
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

      {/* Mobile */}
      <div className='flex md:hidden'>
        <Input
          id='product-search'
          type='search'
          placeholder='Search store...'
          className='w-full text-sm text-gray-800  bg-white'
          aria-label='Search Input Mobile'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => setShowDropdown(true)}
        />

        {showDropdown && searchResults.length > 0 && (
          <ul className='absolute z-20 bg-white border rounded min-w-[200px] max-h-48 overflow-auto shadow-md top-14 left-20'>
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
    </>
  )
}
