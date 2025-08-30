
import { getCategoriesWithProducts } from '@/lib/actions/homepage'
import Link from 'next/link'
import { Suspense } from 'react'
import HomeCatProd from '../fallbacks/homeCatProd'
import { ProductCard } from '@/app/(client-side)/1/page'
import { Button } from '../ui/button'

export default async function HomePageData() {
  const data = await getCategoriesWithProducts()

  return (
    <main className='space-y-12 px-4 py-8 md:px-12'>
      {data.map(({ category, products }) => (
        <section key={category._id} className='max-w-7xl mx-auto py-10'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl md:text-2xl font-bold'> {category.name}</h2>
            <Button variant='ghost' className='rounded-xl'>
              <Link
                href={`/categories/${category.slug}`}
              
              >
                View all products
              </Link>
            </Button>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <Suspense fallback={<HomeCatProd />}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Suspense>
          </div>
        </section>
      ))}
    </main>
  )
}
