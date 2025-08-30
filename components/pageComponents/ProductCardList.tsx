import { fetchProducts } from '@/lib/db/connection&queries/dbQueries'
import { Product } from '@/lib/types'
//import AddToCartButton from '@/app/ui/AddToCartButton'
import Image from 'next/image'

{
  /* ta avoid error : Unexpected any. Specify a different type.eslint@typescript-eslint/no-explicit-any
  ...you need to define a type or interface for your Product object*/
}

export default async function CardList() {
  const products: Product[] = await fetchProducts()

  return (
    <div className='flex flex-wrap gap-4 justify-center grid-cols-3'>
      {products.map((product) => (
        <div
          key={product.id}
          className='w-[300px] h-[32rem] border border-gray-300 rounded-lg shadow-md'
        >
          <div className='w-[300px] flex justify-center pt-5'>
            <Image
              src={product.image_url || '/placeholder.png'}
              alt={product.name}
              width={150}
              height={70}
              className='object-cover'
            />
          </div>
          <div className='pt-5 text-center'>
            <h3 className='text-lg font-semibold'>{product.name}</h3>
            <p className='text-gray-600 mt-2'>{product.description}</p>
            <p className='text-orange-600 font-bold mt-2'>
              {product.price ? `$${product.price}` : 'Price not available'}
            </p>
          </div>
          <div className='flex justify-center mt-5'>
            <button className='rounded-3xl bg-orange-600 text-white w-40 h-[3.25rem]'>
              ADD TO CART
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
