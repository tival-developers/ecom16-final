import ProductCategoryGrid from '@/components/products/product-grid'
import { SearchCategories } from '@/components/shared/search'
import { getProducts } from '@/lib/actions/getProducts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'view all products',
}

export default async function ProductsPage(props: {
  searchParams: Promise<{ query?: string }>
}) {
  // ✅ Await searchParams first
  const searchParams = await props.searchParams
  const fetchProducts = await getProducts(searchParams.query)
  const products = JSON.parse(JSON.stringify(fetchProducts))

  return (
    <div>
      {/* search bar to filter within this category */}
      <div className='mb-10'>
        <SearchCategories
          placeholder='Search within this category...'
          basePath={'/categories'}
        />
      </div>
      <ProductCategoryGrid initialProducts={products} />
    </div>
  )
}
