
// ProductCategoryList.tsx
import { SearchCategories } from '@/components/shared/search'
import { getProductsByCategory } from '@/lib/actions/getProductsByCategories'
import ProductCategoryGrid from './product-grid'


export default async function ProductCategoryList({
  categorySlug,
  searchQuery,
}: {
  categorySlug: string
  searchQuery?: string
}) {
  // fetch products by category and search
  const productsData = await getProductsByCategory(categorySlug, searchQuery)
  const products = JSON.parse(JSON.stringify(productsData))

  return (
    <div>
      {/* search bar to filter within this category */}
      <div className='mb-10'>
        <SearchCategories
          placeholder='Search within this category...'
          basePath={categorySlug ? `/categories/${categorySlug}` : `/categories`}
          
        />
      </div>

      {/* client-side product grid with price filtering */}
      <ProductCategoryGrid initialProducts={products} />
    </div>
  )
}
