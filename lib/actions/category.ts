'use server'

import Category from '@/lib/db/models/category.model'
import connectToDatabase from '@/lib/db/dbConnection'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { CategoryType } from '../types/categories'
import { capitalizeName } from '../helper/capitalize'

//get all categories
export const getAllCategories = async () => {
  try {
    await connectToDatabase
    const categories = await Category.find()
      .sort({ name: 1 })
      .lean<CategoryType[]>()

    return categories.map((cat) => ({
      id: cat._id.toString(),
      name: cat.name,
      slug: cat.slug,
      imageUrl: cat.imageUrl,
      variations: cat.variations || [],
    }))
  } catch (err) {
    console.error(err)
    return []
  }
}
//getCategoryById
export const getCategoryById = async (id: string) => {
  try {
    await connectToDatabase

    const category = await Category.findById(id).lean<CategoryType>()
    if (!category) return null
    return {
      id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      imageUrl: category.imageUrl,
      variations: category.variations || [],
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

//create category
export const createCategory = async (formData: FormData) => {
  try {
    await connectToDatabase

    const rawName = formData.get('name') as string
    const name = capitalizeName(rawName) // capitalize
    const slug = formData.get('slug') as string
    const image = formData.get('image')
    const variationsRaw = formData.get('variations') as string

    const variations = JSON.parse(variationsRaw || '[]')

    await Category.create({
      name,
      slug,
      imageUrl: image,
      variations,
    })

    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: 'Failed to create category' }
  }
}

/*update category */
// export const updateCategory = async (id: string, formData: FormData) => {
//   try {
//     await connectToDatabase()
//     const rawName = formData.get('name') as string
//     const name = capitalizeName(rawName) // capitalize
//     const slug = formData.get('slug') as string
//     const image = formData.get('image') as string
//     const variationsRaw = formData.get('variations') as string

//     const variations = JSON.parse(variationsRaw || '[]')

//     const updatedCategory = await Category.findByIdAndUpdate(
//       id,
//       {
//         name,
//         slug,
//         imageUrl: image,
//         variations,
//       },
//       {
//         new: true,
//       }
//     )

//     await updatedCategory.save()
//   } catch (err) {
//     console.error(err)
//     return { error: 'Failed to update category' }
//   }
//   revalidatePath('/products/categories')
//   redirect('/products/categories')
// }


export const updateCategory = async (id: string, formData: FormData): Promise<void> => {
  try {
    await connectToDatabase
    const rawName = formData.get("name") as string
    const name = capitalizeName(rawName)
    const slug = formData.get("slug") as string
    const image = formData.get("image") as string
    const variationsRaw = formData.get("variations") as string

    const variations = JSON.parse(variationsRaw || "[]")

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        imageUrl: image,
        variations,
      },
      { new: true }
    )

    if (!updatedCategory) {
      throw new Error("Category not found")
    }

    await updatedCategory.save()
  } catch (err) {
    console.error(err)
    throw new Error("Failed to update category")
  }

  revalidatePath("/products/categories")
  redirect("/products/categories")
}

//delete category
export const deleteCategory = async (id: string) => {
  try {
    await connectToDatabase
    await Category.findByIdAndDelete(id)
    revalidatePath('/categories')
    revalidatePath('/admin/dashboard/products/product-categories')
    
  } catch (err) {
    console.error(err)
    throw new Error('Failed to delete category')
    
  }
}
