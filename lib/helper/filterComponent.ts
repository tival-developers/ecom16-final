'use client'

import { useState, useEffect } from 'react'
import { getFilteredProducts } from '@/lib/actions/filter'
import { ProductType } from '../types/product'



export function useFilteredProducts(
  range: [number, number],
  category?: string
) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      getFilteredProducts({
        category,
        min: range[0],
        max: range[1],
      })
        .then(setProducts)
        .finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timeout)
  }, [range, category])

  return { products, loading }
}
