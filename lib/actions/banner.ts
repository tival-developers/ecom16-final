'use server'
import Banner from '../db/models/Banner.model'
import connectToDatabase from '@/lib/db/dbConnection'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import Notification from '../db/models/notification'
import { BannerSchemaZ, BannerUpdateSchemaZ } from '../zod/schemasValidations'
import User from '../db/models/user.model'



export type ActionResult =
  | { success: true }
  | { errors: Record<string, string[]> }




/**
 * Get all banners
 */
export async function getBanners() {
  await connectToDatabase()
  return await Banner.find().populate('productId').lean()
}

/**
 * Get single banner
 */
export async function getBannerById(id: string) {
  await connectToDatabase()
  return await Banner.findById(id).populate('productId').lean()
}

/**
 * Create banner
 */
export async function createBanner(formData: FormData): Promise<ActionResult> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { errors: { _form: ['Unauthorized'] } }
    }
    const role = session.user.role
  if (!role) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  const allowedRoles = ['developer', 'manager', 'sales', 'superadmin']
  if (!allowedRoles.includes(role || '')) {
    return {
      errors: {
        _form: [
          'Forbidden: Only superadmin, manager, or sales can create products',
        ],
      },
    }
  }
    await connectToDatabase()

    const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return { errors: { _form: ['User not found'] } }
  }

    const parsed = BannerSchemaZ.safeParse({
      productId: formData.get('productId'),
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      buttonText: formData.get('buttonText'),
      imageUrl: formData.get('imageUrl'),
      price: formData.get('price'),
      bannerType: formData.get('bannerType'),
    })

    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors }
    }
    const {
      productId,
      title,
      subtitle,
      buttonText,
      imageUrl,
      price,
      bannerType,
    } = parsed.data
    const existingBanner = await Banner.findOne({ title })
    if (existingBanner) {
      return { errors: { title: ['Banner already exists'] } }
    }
    const newBanner = new Banner({
      productId,
      title,
      subtitle,
      buttonText,
      imageUrl,
      price,
      bannerType,
    })

    await newBanner.save()
    await Notification.create({
      type: 'banner',
      title: 'New banner created',
      triggerId: user._id,
      message: 'New banner created',
    })

    revalidatePath('/admin/dashboard/banners')
    return { success: true }
  } catch (err) {
    console.error('Create banner error:', err)
    return {
      errors: {
        _form: [err instanceof Error ? err.message : 'Unexpected error'],
      },
    }
  }
}

/**
 * Update banner
 */
export async function updateBanner(formData: FormData): Promise<ActionResult> {
  try {
    const session = await auth()
  if (!session?.user?.id) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  
  const role = session.user.role
  if (!role) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  const allowedRoles = ['developer', 'manager', 'sales', 'superadmin']
  if (!allowedRoles.includes(role || '')) {
    return {
      errors: {
        _form: [
          'Forbidden: Only superadmin, manager, or sales can create products',
        ],
      },
    }
  }

  await connectToDatabase()
  

    const parsed = BannerUpdateSchemaZ.safeParse({
      id: formData.get('id'),
      productId: formData.get('productId'),
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      buttonText: formData.get('buttonText'),
      imageUrl: formData.get('imageUrl'),
      price: formData.get('price'),
      bannerType: formData.get('bannerType'),
    })

    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors }
    }

    const { id, ...update } = parsed.data
    const updated = await Banner.findByIdAndUpdate(id, update, { new: true })

    if (!updated) {
      return { errors: { _form: ['Banner not found'] } }
    }

    revalidatePath('/admin/dashboard/banners')
    return { success: true }
  } catch (err) {
    console.error('Update banner error:', err)
    return {
      errors: {
        _form: [err instanceof Error ? err.message : 'Unexpected error'],
      },
    }
  }
}

/**
 * Delete banner
 */
export const deleteBanner = async (id: string): Promise<void> => {
  try {
    await connectToDatabase()
    await Banner.findByIdAndDelete(id)

    //revalidatePath('/admin/dashboard/banners')
  } catch (err) {
    console.error(err)
    throw new Error('Failed to delete banner')
  }
}
