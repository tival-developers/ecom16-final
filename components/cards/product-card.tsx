// components/product-card.tsx

import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import AddToFavoriteButton from '../ux/favAdd'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
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
    <Card className='hover:shadow-lg transition-shadow  overflow-hidden'>
      <CardContent className='p-0'>
        <div className='aspect-[4/3] bg-muted/30'>
          <Link
            href={`/product/${product._id}`}
            className='relative aspect-square w-full mb-2 overflow-hidden '
          >
            <div className='relative w-full aspect-[3/3]'>
              <Image
                src={product.imageUrls?.[0] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className=' object-contain'
              />
            </div>
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

          <p className='text-muted-foreground text-sm'>
            Stock: {product.stock}
          </p>
          <ProductPrice
            originalPrice={product.originalPrice}
            newPrice={product.newPrice}
          />

          <AddToCartButton product={product} />

          <Button className='rounded-xl w-full mt-2.5 '>
            <Link href={`/product/${product._id}`}>View Product </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
