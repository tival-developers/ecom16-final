// import ProductCategorySection from '@/components/cards/allCategories'


import Search from '@/components/shared/search'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { getProducts } from '@/lib/actions/getProducts'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '../ux/cartadd'
import { ProductType } from './product-card'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const products = await getProducts(searchParams.query)

  return (
    <div>
      <div className='mb-10'>
        <Search placeholder='Search for products...' />
      </div>
      <div
        className='
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6
        '
      >
        {products.map((product:ProductType) => (
          <Card
            key={product._id}
            className='
              border border-gray-200 
              flex flex-col 
              justify-between 
              bg-white 
              shadow-sm
              rounded-lg
              overflow-hidden
            '
          >
            <CardContent className='p-4 flex flex-col flex-1'>
              <div className='relative w-full h-48 sm:h-56 mb-4 rounded overflow-hidden'>
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={product.imageUrls?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </div>
              <p className='text-xl font-semibold mb-2 line-clamp-1'>
                {product.name}
              </p>
              <p className='text-[15px] text-gray-600 flex-grow line-clamp-3'>
                {product.description}
              </p>
            </CardContent>
            <CardFooter className='py-3'>
              <div className='flex justify-between items-center w-full'>
                <p className='text-yellow-500 font-bold text-lg'>
                  Ksh {product.originalPrice}
                </p>
                <AddToCartButton product={product} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
