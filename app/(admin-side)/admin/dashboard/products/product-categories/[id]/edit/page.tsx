import connectToDatabase from '@/lib/db/dbConnection'
import { CategoryType } from '@/lib/types/categories'
import Category from '@/lib/db/models/category.model'

import CategoryFormWrapper from './form-wrapper'

//pre-populate the form fields

// export default async function Page(props: { params: { id: string } }) {
//   const { id } = props.params

//   await connectToDatabase
//   const category = await Category.findById(id).lean<CategoryType>()
//   if (!category) return <div>Category not found</div>
//   const updateCategoryWithId = updateCategory.bind(null, id)

//   return (
//     <>
//       <form action={updateCategoryWithId}>
//         <CategoryForm category={category} />
//       </form>
//     </>
//   )
// }
//********************************************* */

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
