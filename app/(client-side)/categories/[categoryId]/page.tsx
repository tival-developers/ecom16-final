// import ProductCategoryList from "@/components/products/productsList";
import ProductCategoryList from '@/components/products/productsList'


export default async function CategoriesPage({
  params,
  searchParams,
}: {
  params: { categoryId: string }
  searchParams: { query?: string }
}) {
  const { categoryId } = params
  console.log(categoryId, 'categoryId')
  const { query } = searchParams
  const catId: string = JSON.parse(JSON.stringify(categoryId))

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>{`Category: ${categoryId}`}</h1>

      <ProductCategoryList categorySlug={catId} searchQuery={query} />
    </div>
  )
}
