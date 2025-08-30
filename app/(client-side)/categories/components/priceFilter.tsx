// 'use client'

// import { useState, useEffect } from 'react'
// import { Slider } from '@/components/ui/slider'
// import { Card } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
// import { useFilteredProducts } from '@/lib/helper/filterComponent'
// import Price from '@/lib/utils/format'

// type Props = {
//   minPrice: number
//   maxPrice: number
//   category?: string
// }

// export default function PriceFilterSlider({
//   minPrice,
//   maxPrice,
//   category,
// }: Props) {
//   const [range, setRange] = useState<[number, number]>([minPrice, maxPrice])

//   // Update range if min/max props change
//   useEffect(() => {
//     setRange([minPrice, maxPrice])
//   }, [minPrice, maxPrice])

//   const { products, loading } = useFilteredProducts(range, category)

//   return (
//     <div className='space-y-4 p-2'>
//       <div>
//         <h3 className='text-sm font-medium'>Filter by Price</h3>
//         <div className='flex justify-between text-sm py-1.5 text-muted-foreground'>
//           <span>
//             <Price amount={range[0]} />
//           </span>
//           <span>
//             <Price amount={range[1]} />
//           </span>
//         </div>
//         <Slider
//           min={minPrice}
//           max={maxPrice}
//           step={1}
//           defaultValue={[minPrice, maxPrice]}
//           value={range}
//           onValueChange={(value: [number, number]) => setRange(value)}
//         />
//       </div>

      // <p className='text-sm text-muted-foreground'>
      //   {loading
      //     ? 'Loading...'
      //     : `${products.length} product${
      //         products.length !== 1 ? 's' : ''
      //       } found`}
      // </p>

//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
//         {loading ? (
//           Array.from({ length: 6 }).map((_, i) => (
//             <Card key={i} className='p-4 space-y-2'>
//               <Skeleton className='h-4 w-3/4' />
//               <Skeleton className='h-4 w-1/2' />
//               <Skeleton className='h-4 w-1/4' />
//             </Card>
//           ))
//         ) : products.length > 0 ? (
//           products.map((product) => (
//             <Card key={product._id} className='p-4'>
//               <h4 className='font-medium'>{product.name}</h4>
//               <p className='text-muted-foreground text-sm'>
//                 {product.description}
//               </p>
//               <p className='font-semibold text-primary'>
//                 <span>
//                   <Price amount={product.originalPrice} />
//                 </span>
//               </p>
//             </Card>
//           ))
//         ) : (
//           <p className='text-sm text-muted-foreground'>
//             No products found in this price range.
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }
// PriceFilterSlider.tsx
'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'

type Props = {
  minPrice: number
  maxPrice: number
  productCount?: number  // new prop
  onChange?: (range: [number, number]) => void
}

export default function PriceFilterSlider({ minPrice, maxPrice, productCount, onChange }: Props) {
  
  const [range, setRange] = useState<[number, number]>([minPrice, maxPrice])

  useEffect(() => {
    setRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const handleChange = (value: [number, number]) => {
    setRange(value)
    onChange?.(value)
  }

  return (
    <div className='space-y-4 p-2'>
      <div className='space-y-4'>
        <h3 className='text-sm font-medium'>Filter by Price</h3>
        <div className='flex justify-between text-sm py-1.5 text-muted-foreground'>
          <span>{range[0]}</span>
          <span>{range[1]}</span>
        </div>
        <Slider
          min={minPrice}
          max={maxPrice}
          step={1}
          value={range}
          onValueChange={handleChange}
        />
        <p className='text-sm text-muted-foreground'>
          {productCount !== undefined
            ? `${productCount} product${productCount !== 1 ? 's' : ''} found`
            : ''}
        </p>
      </div>
    </div>
  )
}

