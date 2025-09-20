import ProductCategoryList from '@/components/products/productsList'
import connectToDatabase from '@/lib/db/dbConnection'
import Category from '@/lib/db/models/category.model'




export const dynamic = "force-dynamic";
// or: export const revalidate = 60;

export async function generateStaticParams() {
  await connectToDatabase
  const categories = await Category.find({}, '_id').lean()

  return categories.map((category) => ({
    id: String(category._id),
  }))
  
}

export default async function CategoriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>
  searchParams: Promise<{ query?: string }>
}) {
  // ✅ Await both
  const { categoryId } = await params
  const { query } = await searchParams

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>{`Category: ${categoryId}`}</h1>

      <ProductCategoryList categorySlug={categoryId} searchQuery={query} />
    </div>
  )
}
