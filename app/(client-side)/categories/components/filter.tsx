'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { getAllCategories } from '@/lib/actions/category'

export default function Filters() {
  const router = useRouter()
  const pathname = usePathname()
  const [categories, setCategories] = useState<
    { name: string; href: string }[]
  >([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Determine which category is active by matching current path
  useEffect(() => {
    async function loadCategories() {
      const data = await getAllCategories()
      const mapped = [
        { name: 'All', href: '/categories/' },
        ...data.map((cat) => ({
          name: cat.name,
          href: `/categories/${cat.slug}`,
        })),
      ]
      setCategories(mapped)
    }
    loadCategories()
  }, [])
  useEffect(() => {
    if (!categories.length) return
    // Normalize pathname by removing trailing slash for comparison
    const currentPath =
      pathname?.endsWith('/') && pathname !== '/'
        ? pathname.slice(0, -1)
        : pathname
    // Try to find category matching the current path
    const matched = categories.find((cat) => {
      const catPath =
        cat.href.endsWith('/') && cat.href !== '/'
          ? cat.href.slice(0, -1)
          : cat.href
      return currentPath === catPath
    })

    setSelectedCategory(matched?.name ?? 'All')
  }, [pathname, categories])

  const handleChange = (category: { name: string; href: string }) => {
    // Navigate to category URL on checkbox select
    router.push(category.href)
    setSelectedCategory(category.name)
  }

  const handleReset = () => {
    router.push('/categories/')
    setSelectedCategory('All')
  }

  return (
    <Card className='space-y-4 p-4 bg-gray-800 w-fit '>
      <div>
        <h2 className='font-semibold mb-2 text-lg text-yellow-300 '>
          FILTER BY CATEGORIES
        </h2>
        {categories.map((cat) => (
          <div key={cat.name} className='flex items-center space-x-2 mb-1.5'>
            {/* <Checkbox
              id={`cat-${cat.name}`}
              checked={selectedCategory === cat.name}
              onCheckedChange={() => handleChange(cat)}
            /> */}
            <Checkbox
              id={`cat-${cat.name}`}
              checked={selectedCategory === cat.name}
              onCheckedChange={(checked) => {
                if (checked) handleChange(cat)
              }}
            />

            <label
              htmlFor={`cat-${cat.name}`}
              className='text-[16px] cursor-pointer text-white'
            >
              {cat.name}
            </label>
          </div>
        ))}
      </div>

      <Button variant='destructive' className='w-full' onClick={handleReset}>
        Reset All Filters
      </Button>
    </Card>
  )
}
