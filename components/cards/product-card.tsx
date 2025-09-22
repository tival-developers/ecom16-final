// components/product-card.tsx

import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import AddToFavoriteButton from '../ux/favAdd'
import { Badge } from '../ui/badge'
import AddToCartButton from '../ux/cartadd'
import { ProductPrice } from '@/lib/utils/product-price'
import Image from 'next/image'
export type ProductType = {
  _id: string
  name: string
  imageUrls: string[]
  description: string
  brand: string
  category: string
  serialNumber: string
  newPrice: number
  originalPrice: number
  stock: number
}

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Card className='hover:shadow-lg transition-shadow rounded-2xl overflow-hidden'>
      <CardContent className='p-0'>
        <div className=' bg-muted/30'>
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.imageUrls?.[0] || '/placeholder.jpg'}
              alt={product.name}
              width={1000}
              height={800}
              className='h-full w-full object-cover'
            />
          </Link>
        </div>
        <div className='p-4 space-y-1.5 relative'>
          <div>
            <AddToFavoriteButton variant='icon' product={product} />
          </div>

          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium leading-tight line-clamp-2 mr-2'>
              {product.name}
            </h3>
            <Badge variant={'secondary'} className='uppercase'>
              {product.brand}
            </Badge>
          </div>
          <ProductPrice
            originalPrice={product.originalPrice}
            newPrice={product.newPrice}
          />

          <AddToCartButton product={product} />
        </div>
      </CardContent>
    </Card>
  )
}
