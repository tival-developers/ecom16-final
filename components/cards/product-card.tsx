// components/product-card.tsx
import { ProductType } from '@/lib/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '../ui/card'
import Price from '@/lib/utils/format'
import AddToCartButton from '../cartadd'
import AddToFavoriteButton from '../ux/favAdd'

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <Card
      className='
                border border-gray-200
                flex flex-col
                justify-between
                bg-white
                shadow-sm
                rounded-lg
                overflow-hidden
                h-full
                hover:shadow-md transition
              '
    >
      <CardContent className='p-4 flex flex-col flex-1'>
        <Link
          href={`/product/${product._id}`}
          className='relative aspect-square w-full mb-2 overflow-hidden rounded'
        >
          <Image
            src={product.imageUrls?.[0]}
            alt={product.name}
            layout='fill'
            objectFit='cover'
          />
        </Link>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold mb-2 line-clamp-1'>
            {product.name}
          </p>
          <AddToFavoriteButton variant='icon' product={product} />
        </div>

        <p className='text-[18px] text-green-600 flex-grow line-clamp-3'>
          {product.description}
        </p>
        <p className='text-muted-foreground text-sm'>Stock: {product.stock} </p>
      </CardContent>
      <CardFooter className='px-4 py-3 mt-auto'>
        <div className='flex justify-between items-center w-full'>
          <p className='text-green-600 font-medium text-lg'>
            <Price amount={product.originalPrice} />
          </p>

          <AddToCartButton product={product} />
        </div>
      </CardFooter>
    </Card>
  )
}
