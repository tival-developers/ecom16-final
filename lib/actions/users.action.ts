'use server'
import connectToDatabase from '@/lib/db/dbConnection'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import User from '../db/models/user.model'




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
    password: z.string().min(8, 'Password too short'),
    confirmPassword: z.string().min(8, 'Confirm Password too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const CreateUser = FormSchema

//*****************create**********************

export async function userCreate(formData: FormData) {

  const { name, email, password, confirmPassword } = CreateUser.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!email || !password || !confirmPassword) {
    throw new Error('All fields are required.')
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match.')
  }

  try {
    await connectToDatabase()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error('User already exists.Proceed to sign in')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save hashed password to `password` field
    })

    await newUser.save()

    
    return { email, password } // ✅ return credentials for auto-login

  } catch (error) {
    console.error('Error creating user:', error)
  }

  revalidatePath('/admin/dashboard/customers')
  
}





// =========================
// UPDATE USER
// =========================
export async function updateUser(id: string, formData: FormData) {
  try {
    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    await connectToDatabase()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (password) updateData.password = await bcrypt.hash(password, 10)

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    if (!updatedUser) return { error: 'User not found' }

    revalidatePath('/admin/dashboard/customers')
    return { success: true }
  } catch (err) {
    console.error('Update Error:', err)
    return {
      error: err instanceof Error ? err.message : 'Failed to update user',
    }
  }
}

// =========================
// DELETE USER
// =========================

export async function deleteUser(id: string): Promise<void> {
  await connectToDatabase()
  const deleted = await User.findByIdAndDelete(id)
  if (!deleted) {
    console.error('Failed to delete user')
    return
  }

  await revalidatePath('/admin/dashboard/customers')
}
