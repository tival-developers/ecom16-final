// 'use client'

// import { useTransition } from 'react'
// import { toast } from 'sonner'
// import { ProductType } from '@/lib/types/product'
// import { toggleProductPromotion } from '@/lib/actions/products/toggleProductPromotion'

// export function PromotionToggle({ product }: { product: ProductType }) {
//   const [isPending, startTransition] = useTransition()

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const { name, checked } = e.target
//     startTransition(async () => {
//       const res = await toggleProductPromotion(product._id, { [name]: checked })
//       console.log(res)
//       if (res.success) {
//         toast.success(`${product.name} updated successfully!`)
//       } else {
//         toast.error(res.error || 'Failed to update promotion')
//       }
//     })
//   }

//   return (
//     <div className='flex gap-2.5'>
//       <label className='flex items-center gap-1.5 text-yellow-700'>
//         <input
//           type='checkbox'
//           name='isTrending'
//           defaultChecked={product.isTrending}
//           onChange={handleChange}
//           disabled={isPending}
//           className='bg-blue-500 '
//         />
//         Trending
//       </label>

//       <label className='flex items-center gap-1.5 text-yellow-700'>
//         <input
//           type='checkbox'
//           name='isFeatured'
//           defaultChecked={product.isFeatured}
//           onChange={handleChange}
//           disabled={isPending}
//           className='bg-blue-500 '
//         />
//         Featured
//       </label>
//     </div>
//   )
// }
'use client'

import { useTransition, useState } from 'react'
import { toast } from 'sonner'
import { ProductType } from '@/lib/types/product'
import { toggleProductPromotion } from '@/lib/actions/products/toggleProductPromotion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function PromotionToggle({ product }: { product: ProductType }) {
  const [isPending, startTransition] = useTransition()

  // Local controlled state
  const [isTrending, setIsTrending] = useState(product.isTrending)
  const [isFeatured, setIsFeatured] = useState(product.isFeatured)

  function handleChange(name: 'isTrending' | 'isFeatured', checked: boolean) {
    // Optimistic update
    const prevTrending = isTrending
    const prevFeatured = isFeatured

    if (name === 'isTrending') setIsTrending(checked)
    if (name === 'isFeatured') setIsFeatured(checked)

    startTransition(async () => {
      const res = await toggleProductPromotion(product._id, { [name]: checked })

      if (res.success) {
        toast.success(`${product.name} updated successfully!`)
      } else {
        // revert on error
        if (name === 'isTrending') setIsTrending(prevTrending)
        if (name === 'isFeatured') setIsFeatured(prevFeatured)

        toast.error(res.error || 'Failed to update promotion')
      }
    })
  }

  return (
    <div className="flex gap-4">
      {/* Trending toggle */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`trending-${product._id}`}
          checked={isTrending}
          onCheckedChange={(checked) =>
            handleChange('isTrending', Boolean(checked))
          }
          disabled={isPending}
        />
        <Label htmlFor={`trending-${product._id}`} className="text-yellow-700">
          Trending
        </Label>
      </div>

      {/* Featured toggle */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`featured-${product._id}`}
          checked={isFeatured}
          onCheckedChange={(checked) =>
            handleChange('isFeatured', Boolean(checked))
          }
          disabled={isPending}
        />
        <Label htmlFor={`featured-${product._id}`} className="text-yellow-700">
          Featured
        </Label>
      </div>
    </div>
  )
}

