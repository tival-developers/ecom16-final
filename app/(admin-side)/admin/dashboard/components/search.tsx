'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { AdminType } from '@/app/(admin-side)/admin/dashboard/admins/page'
import { typeOrder } from '@/lib/types/order'
import { CategoryType } from '@/lib/types/categories'
import { UserType } from '@/lib/types/user'
import { ProductType } from '@/lib/types/product'

export function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any>({})
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults({})
      return
    }

    let cancelled = false

    async function fetchAll() {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`
        )
        if (!res.ok) throw new Error('Failed to fetch results')
        const data = await res.json()
        if (!cancelled) setSearchResults(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAll()
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

  return (
    <div ref={containerRef} className='relative flex-1 mx-4'>
      <Input
        id='admin-search'
        type='search'
        placeholder='Search ...'
        className='md:w-[100px] lg:w-[300px]'
        aria-label='Search Input'
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          setShowDropdown(true)
        }}
        onFocus={() => setShowDropdown(true)}
      />

      {showDropdown && (
        <div className='absolute z-20 bg-white border border-amber-600 rounded min-w-[250px] max-h-72 overflow-auto shadow-md mt-2'>
          {searchResults.products?.length === 0 &&
            searchResults.users?.length === 0 &&
            searchResults.categories?.length === 0 &&
            searchResults.orders?.length === 0 &&
            searchResults.admins?.length === 0 && (
              <p className='px-3 py-2 text-sm text-gray-500'>
                No results found
              </p>
            )}
          {/* Products */}
          {searchResults.products?.length > 0 && (
            <div>
              <h4 className='px-2 py-1 text-xs font-semibold text-gray-500'>
                Products
              </h4>
              {searchResults.products.map((p: ProductType) => (
                <Link
                  key={p._id}
                  href={`/admin/products/${p._id}`}
                  className='block px-3 py-2 text-sm hover:bg-gray-100'
                  onClick={() => setShowDropdown(false)}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )}

          {/* Users */}
          {searchResults.users?.length > 0 && (
            <div>
              <h4 className='px-2 py-1 text-xs font-semibold text-gray-500'>
                Users
              </h4>
              {searchResults.users.map((u: UserType) => (
                <Link
                  key={u._id}
                  href={`/admin/users/${u._id}`}
                  className='block px-3 py-2 text-sm hover:bg-gray-100'
                  onClick={() => setShowDropdown(false)}
                >
                  {u.name} ({u.email})
                </Link>
              ))}
            </div>
          )}

          {/* Categories */}
          {searchResults.categories?.length > 0 && (
            <div>
              <h4 className='px-2 py-1 text-xs font-semibold text-gray-500'>
                Categories
              </h4>
              {searchResults.categories.map((c: CategoryType) => (
                <Link
                  key={c._id}
                  href={`/admin/categories/${c._id}`}
                  className='block px-3 py-2 text-sm hover:bg-gray-100'
                  onClick={() => setShowDropdown(false)}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}

          {/* Orders */}
          {searchResults.orders?.length > 0 && (
            <div>
              <h4 className='px-2 py-1 text-xs font-semibold text-gray-500'>
                Orders
              </h4>
              {searchResults.orders.map((o: typeOrder) => (
                <Link
                  key={o._id}
                  href={`/admin/orders/${o._id}`}
                  className='block px-3 py-2 text-sm hover:bg-gray-100'
                  onClick={() => setShowDropdown(false)}
                >
                  Order #{o.orderNumber}
                </Link>
              ))}
            </div>
          )}

          {/* Admins */}
          {searchResults.admins?.length > 0 && (
            <div>
              <h4 className='px-2 py-1 text-xs font-semibold text-gray-500'>
                Admins
              </h4>
              {searchResults.admins.map((a: AdminType) => (
                <Link
                  key={a._id}
                  href={`/admin/admins/${a._id}`}
                  className='block px-3 py-2 text-sm hover:bg-gray-100'
                  onClick={() => setShowDropdown(false)}
                >
                  {a.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
