'use server'

import Product from '@/lib/db/models/product.model'
import Category from '@/lib/db/models/category.model'
import connectToDatabase from '@/lib/db/dbConnection'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/auth'
import User from '../db/models/user.model'
import Notification from '../db/models/notification'

const FormSchema = z.object({
  name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  description: z
    .string()
    .min(10, { message: 'Must be 10 or more characters long' }),
  originalPrice: z.coerce.number(),
  stock: z.coerce.number(),
  brand: z.string(),
  serialNumber: z.string(),
  categoryId: z.string(),
  variations: z.string(),
  imageUrls: z
    .array(z.string().url())
    .min(1, { message: 'At least one image is required' }),
})

export type CreateProductResult =
  | { success: true }
  | { errors: Record<string, string[]> }

export async function createProduct(
  formData: FormData
): Promise<CreateProductResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  await connectToDatabase
  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return { errors: { _form: ['User not found'] } }
  }
  try {
    const parsed = FormSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      originalPrice: Number(formData.get('originalPrice')),
      stock: Number(formData.get('stock')),
      brand: formData.get('brand'),
      serialNumber: formData.get('serialNumber'),
      categoryId: formData.get('categoryId'),
      variations: formData.get('variations'),
      imageUrls: formData.getAll('imageUrls[]').filter(Boolean) as string[],
    })
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors }
    }

    const {
      name,
      description,
      originalPrice,
      stock,
      brand,
      serialNumber,
      categoryId,
      variations,
      imageUrls,
    } = parsed.data

    const categoryExists = await Category.findById(categoryId)
    if (!categoryExists) {
      return { errors: { categoryId: ['Category not found.'] } }
    }

    const existingProduct = await Product.findOne({ name })

    if (existingProduct)
      return { errors: { name: ['Product already exists.'] } }

    let variationData = {}
    if (typeof variations === 'string') {
      try {
        variationData = JSON.parse(variations)
      } catch {
        return { errors: { variations: ['Invalid variations format.'] } }
      }
    }

    const newProduct = new Product({
      name,
      description,
      originalPrice,
      stock,
      brand,
      serialNumber,
      category: categoryExists._id,
      variations: variationData,
      imageUrls,
    })

    await newProduct.save()
    await Notification.create({
      type: 'product',
      title: 'New product created',
      customerId: user._id,
      message: 'New product created',
    })

    revalidatePath('/products')
    revalidatePath('/admin/dashboard/products')

    return { success: true }
  } catch (err) {
    console.error('Error creating admin:', err)
    return {
      errors: {
        _form: [
          err instanceof Error ? err.message : 'Unexpected error occurred',
        ],
      },
    }
  }
}

//***************** UPDATE **********************

export async function UpdateProductData(
  id: string,
  formData: FormData
): Promise<CreateProductResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  await connectToDatabase
  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return { errors: { _form: ['User not found'] } }
  }
  try {
    const parsed = FormSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      originalPrice: Number(formData.get('originalPrice')),
      stock: Number(formData.get('stock')),
      brand: formData.get('brand'),
      serialNumber: formData.get('serialNumber'),
      categoryId: formData.get('categoryId'),
      variations: formData.get('variations'),
      imageUrls: formData.getAll('imageUrls[]').filter(Boolean) as string[],
    })
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors }
    }

    const {
      name,
      description,
      originalPrice,
      stock,
      brand,
      serialNumber,
      categoryId,
      variations,
      imageUrls,
    } = parsed.data

    await connectToDatabase

    const categoryExists = await Category.findById(categoryId)
    if (!categoryExists) {
      return { errors: { categoryId: ['Category not found.'] } }
    }

    const existingProduct = await Product.findOne({ name })

    if (existingProduct)
      return { errors: { name: ['Product already exists.'] } }

    let variationData = {}
    if (typeof variations === 'string') {
      try {
        variationData = JSON.parse(variations)
      } catch {
        return { errors: { variations: ['Invalid variations format.'] } }
      }
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        originalPrice,
        stock,
        brand,
        serialNumber,
        category: categoryExists._id,
        variations: variationData,
        imageUrls,
      },
      { new: true }
    )

    if (!updatedProduct) return { errors: { name: ['Product not found.'] } }

    await Notification.create({
      type: 'product',
      title: 'Updated product',
      customerId: user._id,
      message: 'New product created',
    })

    revalidatePath('/products')
    revalidatePath('/admin/dashboard/products')

    return { success: true }
  } catch (err) {
    console.error('Error creating admin:', err)
    return {
      errors: {
        _form: [
          err instanceof Error ? err.message : 'Unexpected error occurred',
        ],
      },
    }
  }
}
///////delete//////
export async function deleteProduct(id: string): Promise<void> {
  await connectToDatabase
  const deleted = await Product.findByIdAndDelete(id)
  if (!deleted) {
    console.error('Product not found')
    return
  }
  revalidatePath('/products')
  revalidatePath('/categories')
  revalidatePath('/admin/dashboard/products')
}
