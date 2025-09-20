import connectToDatabase from '@/lib/db/dbConnection'
import { CategoryType } from '@/lib/types/categories'
import Category from '@/lib/db/models/category.model'
import CategoryFormWrapper from './form-wrapper'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Edit category',
  description: 'edit category ',
}

export default async function Page(context: {
  params: Promise<{ id: string }>
}) {
  const { id } = await context.params // ✅ Await params

  await connectToDatabase
  const fetchCategory = await Category.findById(id).lean<CategoryType>()
  const category = JSON.parse(JSON.stringify(fetchCategory))

  if (!category) return <div>Category not found</div>

  return <CategoryFormWrapper id={id} category={category} />
}
