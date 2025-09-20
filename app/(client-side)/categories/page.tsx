import ProductCategoryGrid from '@/components/products/product-grid'
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
  const products = await getProducts(searchParams.query)

  return <ProductCategoryGrid initialProducts={products} />
}
