'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { ProductType } from '@/lib/types/product'
import { toggleProductPromotion } from '@/lib/actions/products/toggleProductPromotion'

export function PromotionToggle({ product }: { product: ProductType }) {
  const [isPending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target
    startTransition(async () => {
      const res = await toggleProductPromotion(product._id, { [name]: checked })
      console.log(res, 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
      if (res.success) {
        toast.success(`${product.name} updated successfully!`)
      } else {
        toast.error(res.error || 'Failed to update promotion')
      }
    })
  }

  return (
    <div className='flex gap-2.5'>
      <label className='flex items-center gap-1.5 text-yellow-700'>
        <input
          type='checkbox'
          name='isTrending'
          defaultChecked={product.isTrending}
          onChange={handleChange}
          disabled={isPending}
          className='bg-blue-500 '
        />
        Trending
      </label>

      <label className='flex items-center gap-1.5 text-yellow-700'>
        <input
          type='checkbox'
          name='isFeatured'
          defaultChecked={product.isFeatured}
          onChange={handleChange}
          disabled={isPending}
          className='bg-blue-500 '
        />
        Featured
      </label>
    </div>
  )
}
