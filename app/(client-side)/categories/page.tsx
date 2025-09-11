import ProductCategoryGrid from '@/components/products/product-grid'
import { getProducts } from '@/lib/actions/getProducts'

export default async function ProductsPage(props: {
  searchParams: Promise<{ query?: string }>
}) {
  // ✅ Await searchParams first
  const searchParams = await props.searchParams
  const products = await getProducts(searchParams.query)

  return <ProductCategoryGrid initialProducts={products} />
}
