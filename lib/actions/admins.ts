'use server'
import connectToDatabase from '@/lib/db/dbConnection'
import { revalidatePath } from 'next/cache'
import Notification from '../db/models/notification'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import Admin from '../db/models/admin'
import User from '../db/models/user.model'

////create schema///
const FormSchema = z
  .object({
    name: z
      .string()
      .toLowerCase()
      .min(3, { message: 'Must be 3 or more characters long' }),
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, 'Email is required')
      .email('Invalid email'),
    roleAdmin: z.enum(['manager', 'developer', 'sales'], {
      required_error: 'Role is required',
    }),
    password: z.string().min(8, 'Password too short'),
    confirmPassword: z.string().min(8, 'Confirm Password too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

////////////update schema//////////
const UpdateSchema = z
  .object({
    id: z.string({ required_error: 'Admin ID is required' }),
    name: z.string().min(3, 'Name must be at least 3 chars').optional(),
    email: z.string().email('Invalid email').optional(),
    roleAdmin: z.enum(['manager', 'developer', 'sales']).optional(),
    password: z
      .union([z.string().min(8, 'Password too short'), z.literal('')])
      .optional(),
    confirmPassword: z
      .union([z.string().min(8, 'Confirm Password too short'), z.literal('')])
      .optional(),
  })
  .transform((data) => ({
    ...data,
    password: data.password === '' ? undefined : data.password,
    confirmPassword:
      data.confirmPassword === '' ? undefined : data.confirmPassword,
  }))
  .refine(
    (data) =>
      (!data.password && !data.confirmPassword) ||
      data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  )

export type AdminResult =
  | { success: true }
  | { errors: Record<string, string[]> }

///get Admins////
export async function getAdmins() {
  await connectToDatabase()
  return await Admin.find().sort({ createdAt: -1 }).lean()
}



///create Admin////
export async function createAdmin(formData: FormData): Promise<AdminResult> {
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

  // ✅ Only allow admins
  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return { errors: { _form: ['User not found'] } }
  }

  const parsed = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    roleAdmin: formData.get('role'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { name, email, password, roleAdmin } = parsed.data

  try {
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return { errors: { email: ['Admin already exists. Proceed to sign in'] } }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: roleAdmin,
    })

    await newAdmin.save()

    // 2️⃣ Also create in User collection (NextAuth)
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: roleAdmin,
        provider: "credentials",
      })
    } else {
      // if a user already exists (e.g. via OAuth), just update their role
      existingUser.role = role
      await existingUser.save()
    }


    await Notification.create({
      type: 'admin',
      title: 'New admin created',
      triggerId: user.id,
      message: 'New admin created',
    })

    revalidatePath('/admin/dashboard/admins')
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
/////////////update admin/////////
export async function updateAdmin(formData: FormData): Promise<AdminResult> {
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

  const parsed = UpdateSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    roleAdmin: formData.get('role'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { id, name, email, roleAdmin, password } = parsed.data

  try {
    
    const updateData: Record<string, unknown> = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (roleAdmin) updateData.role = roleAdmin
    if (password) updateData.password = await bcrypt.hash(password, 10)

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updatedAdmin) {
      return { errors: { _form: ['Admin not found'] } }
    }
    const user = await User.findOne({ email: updatedAdmin.email })
    if (user) {
      if (name) user.name = name
      if (email) user.email = email
      if (roleAdmin) user.role = roleAdmin

      await user.save()
    }
    revalidatePath('/admin/dashboard/admins')
    return { success: true }
  } catch (err) {
    console.error('Update error:', err)
    return {
      errors: {
        _form: [err instanceof Error ? err.message : 'Unexpected update error'],
      },
    }
  }
}

////delete admin//////

export const deleteAdmin = async (id: string): Promise<void> => {
  try {
    await connectToDatabase()

    await Admin.findByIdAndDelete(id)
    revalidatePath('/admin/dashboard/admins')
  } catch (err) {
    console.error(err)
    throw new Error('Failed to delete Admin')
  }
}
