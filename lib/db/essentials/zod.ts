
import { z } from 'zod'

export const feedbackSchema = z
  .string()
  .min(10, { message: 'Must be 10 or more characters long' })
export const reviewSchema = z
  .string()
  .min(10, { message: 'Must be 10 or more characters long' })
export const searchSchema = z.string().toLowerCase()

export const userSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
  // role: z.enum(["admin", "user"])
})



export const checkoutSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export const addressSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().min(1, 'Phone number is required'),
})

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})
export const formSchema = z
  .object({
    name: z.string().min(3, 'Must be at least 3 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password too short'),
    confirmPassword: z.string().min(8, 'Confirm Password too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
// productSchema.ts





