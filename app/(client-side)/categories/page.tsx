import ProductCategoryGrid from '@/components/products/product-grid'
import { getProducts } from '@/lib/actions/getProducts'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const products = await getProducts(searchParams.query)
  return <ProductCategoryGrid initialProducts={products} />
}
