'use server'

import connectToDatabase from '@/lib/db/dbConnection'
import { z } from 'zod'
import Newsletter from '../db/models/newsletter'

const FormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
})

const newsletter = FormSchema

//*****************create**********************

export async function AddToNewsletter(formData: FormData) {
  const { email } = newsletter.parse({
    email: formData.get('email'),
  })

  try {
    await connectToDatabase

    const existingUser = await Newsletter.findOne({ email })
    if (existingUser) {
      throw new Error('Already on the newsletter list')
    }

    const addToNewsletter = new Newsletter({
      email,
    })

    await addToNewsletter.save()
  } catch (error) {
    console.error('Error adding to newsletter:', error)
  }
}
