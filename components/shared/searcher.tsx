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
  const [setProductId] = useState('')
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

  const handleSelect = (product: Product) => {
    setProductId(product._id)
    setSearchQuery(product.name)
    setShowDropdown(false)
    router.push(`/product/${product._id}`)
    setSearchResults([])
  }

  return (
    <>
      <div className='hidden md:flex  items-center gap-2 flex-1  mx-4'>
        
        <Input
          id='product-search'
          placeholder='Search entire store...'
          className=' rounded-xl border-amber-600'
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
        {/* <Button className='bg-yellow-400 text-black'>Search</Button> */}
      </div>

      {/*mobile */}
      <div className='flex md:hidden'>
        <Input
          id='product-search'
          placeholder='Search store...'
          className='w-full text-sm text-white'
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
        {/* <Button className='bg-yellow-400 text-black'>Search</Button> */}
      </div>
    </>
  )
}
