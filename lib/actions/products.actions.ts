// 'use server'

// import Product from '@/lib/db/models/product.model'
// import Category from '@/lib/db/models/category.model'
// import connectToDatabase from '@/lib/db/dbConnection'
// import { revalidatePath } from 'next/cache'
// import { z } from 'zod'
// import { FormSchemaProduct } from '../zod/schemasValidations'
// import { CreateProductResult } from '../types/product'

// //***************** CREATE **********************

// export async function createProduct(formData: FormData): Promise<CreateProductResult> {

//     const parsed = FormSchemaProduct.parse({
//       name: formData.get('name'),
//       description: formData.get('description'),
//       originalPrice: Number(formData.get('originalPrice')),
//       stock: Number(formData.get('stock')),
//       brand: formData.get('brand'),
//       serialNumber: formData.get('serialNumber'),
//       categoryId: formData.get('categoryId'),
//       variations: formData.get('variations'),
//       imageUrls: formData.getAll('imageUrls[]').filter(Boolean) as string[],
//     })
//     console.log(formData)
//     const {
//       name,
//       description,
//       originalPrice,
//       stock,
//       brand,
//       serialNumber,
//       categoryId,
//       variations,
//       imageUrls,
//     } = parsed

//     if (imageUrls.length === 0) {
//       return { success: false, error: 'Please upload at least one image.' }
//     }

//     await connectToDatabase

//     const categoryExists = await Category.findById(categoryId)
//     if (!categoryExists) return { success: false, error: 'Category not found.' }

//     const existingProduct = await Product.findOne({ name })
//     if (existingProduct) return { success: false, error: 'Product already exists.' }

//     // ✅ Parse variations (should be a JSON string like '{"color":"Blue","storage":"256GB"}')
//     const variationData =
//       typeof variations === 'string' ? JSON.parse(variations) : {}

//     // ✅ Create product
//     const newProduct = new Product({
//       name,
//       description,
//       originalPrice,
//       stock,
//       brand,
//       serialNumber,
//       category: categoryExists._id,
//       variations: variationData, // Map<String, String>
//       imageUrls, // ✅ match schema field name
//     })

//     await newProduct.save()
//     revalidatePath('/admin/dashboard/products')
//     return { success: true, redirectUrl: '/admin/dashboard/products' }

//     if (err instanceof z.ZodError) {
//       return {
//         success: false,
//         error: 'Validation failed',
//         fieldErrors: err.flatten().fieldErrors,
//       };
//     }

//     console.error('Create Error:', err)
//     return {
//       success: false,
//       error: err instanceof Error ? err.message : 'Failed to create product',
//     }
//   }
// }
// //***************** UPDATE **********************

// export async function UpdateProductData(id: string, formData: FormData) {
//   try {
//     const parsed = FormSchemaProduct.parse({
//       name: formData.get('name'),
//       description: formData.get('description'),
//       originalPrice: Number(formData.get('originalPrice')),
//       stock: Number(formData.get('stock')),
//       brand: formData.get('brand'),
//       serialNumber: formData.get('serialNumber'),
//       categoryId: formData.get('categoryId'),
//       variations: formData.get('variations'),
//       imageUrls: formData.getAll('imageUrls[]').filter(Boolean) as string[],
//     })

//     const {
//       name,
//       description,
//       originalPrice,
//       stock,
//       brand,
//       serialNumber,
//       categoryId,
//       variations,
//       imageUrls,
//     } = parsed

//     await connectToDatabase
//     const categoryExists = await Category.findById(categoryId)
//     if (!categoryExists) return { error: 'Category not found' }

//     const variationData =
//       typeof variations === 'string' ? JSON.parse(variations) : {}

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         description,
//         originalPrice,
//         stock,
//         brand,
//         serialNumber,
//         category: categoryExists._id,
//         variations: variationData,
//         imageUrls,
//       },
//       { new: true }
//     )

//     if (!updatedProduct) return { error: 'Product not found' }

//     revalidatePath('/products')
//     revalidatePath('/admin/dashboard/products')
//     return { success: true, redirectUrl: '/admin/dashboard/products' }
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return {
//         error: 'Validation failed',
//         fieldErrors: err.flatten().fieldErrors,
//       }
//     }

//     console.error('Update Error:', err)
//     return {
//       error: err instanceof Error ? err.message : 'Failed to update product',
//     }
//   }
// }

// //***************** DELETE **********************

'use server'

import Product from '@/lib/db/models/product.model'
import Category from '@/lib/db/models/category.model'
import connectToDatabase from '@/lib/db/dbConnection'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { FormSchemaProduct } from '../zod/schemasValidations'
import { CreateProductResult } from '../types/product'

export async function createProduct(
  formData: FormData
): Promise<CreateProductResult> {
  try {
    const parsed = FormSchemaProduct.parse({
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
    } = parsed

    if (imageUrls.length === 0) {
      return { success: false, error: 'Please upload at least one image.' }
    }

    await connectToDatabase

    const categoryExists = await Category.findById(categoryId)
    if (!categoryExists) return { success: false, error: 'Category not found.' }

    const existingProduct = await Product.findOne({ name })
    if (existingProduct)
      return { success: false, error: 'Product already exists.' }

    let variationData = {}
    if (typeof variations === 'string') {
      try {
        variationData = JSON.parse(variations)
      } catch {
        return { success: false, error: 'Invalid variations format.' }
      }
    }

    const newProduct = new Product({
      name,
      description,
      originalPrice,
      stock,
      brand,
      serialNumber,
      categoryId: categoryExists._id,
      variations: variationData,
      imageUrls,
    })

    await newProduct.save()

    revalidatePath('/products')
    revalidatePath('/admin/dashboard/products')

    return { success: true, redirectUrl: '/admin/dashboard/products' }
  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldErrorsClean: Record<string, string[]> = {}
      for (const key in err.flatten().fieldErrors) {
        const msgs = err.flatten().fieldErrors[key]
        if (msgs) fieldErrorsClean[key] = msgs
      }

      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: fieldErrorsClean,
      }
    }

    console.error('Create Error:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to create product',
    }
  }
}

//***************** UPDATE **********************

export async function UpdateProductData(id: string, formData: FormData) {
  try {
    const parsed = FormSchemaProduct.parse({
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
    } = parsed

    await connectToDatabase
    const categoryExists = await Category.findById(categoryId)
    if (!categoryExists) return { error: 'Category not found' }

    let variationData = {}
    if (typeof variations === 'string') {
      try {
        variationData = JSON.parse(variations)
      } catch {
        return { success: false, error: 'Invalid variations format.' }
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

    if (!updatedProduct) return { error: 'Product not found' }

    revalidatePath('/products')
    revalidatePath('/admin/dashboard/products')
    return { success: true, redirectUrl: '/admin/dashboard/products' }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        error: 'Validation failed',
        fieldErrors: err.flatten().fieldErrors,
      }
    }

    console.error('Update Error:', err)
    return {
      error: err instanceof Error ? err.message : 'Failed to update product',
    }
  }
}

export async function deleteProduct(id: string): Promise<void> {
  await connectToDatabase
  const deleted = await Product.findByIdAndDelete(id)
  if (!deleted) {
    console.error('Product not found')
    return
  }
  await revalidatePath('/products')
  await revalidatePath('/admin/dashboard/products')
}
