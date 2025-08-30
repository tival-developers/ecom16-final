'use client'

import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'

interface Product {
  _id: string
  name: string
  imageUrls: string
  originalPrice: number
}

interface Props {
  searchQuery: string
  setSearchQuery: (val: string) => void
  onSelect: (product: Product) => void
}

export default function ProductSearch({ searchQuery, setSearchQuery, onSelect }: Props) {
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ((searchQuery?.length ?? 0) < 2) {
      setSearchResults([])
      return
    }

    let cancelled = false
    const timeout = setTimeout(async () => {
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
    }, 300) // debounce

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [searchQuery])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <Input
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true) }}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search product..."
      />
      {showDropdown && searchResults.length > 0 && (
        <ul className='absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md top-full mt-1 left-0'>
          {searchResults.map(product => (
            <li
              key={product._id}
              className='p-2 cursor-pointer hover:bg-blue-100'
              onClick={() => { onSelect(product); setShowDropdown(false) }}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
