'use server'

import connectToDatabase from '@/lib/db/dbConnection'
import { z } from 'zod'
import HelpRequest from '../db/models/contact'

const FormSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(3, { message: 'Must be 3 or more characters long' }),
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  phone: z.string(),
  subject: z.string(),
  message: z
    .string()
    .min(10, { message: 'Must be 10 or more characters long' }),
})

const contacts = FormSchema

//*****************create**********************
export type ContactFormState = {
  success: boolean | null
  error?: string
}

export async function ContactUs(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const { name, email, phone, subject, message } = contacts.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!name || !email || !phone || !subject || !message) {
    throw new Error('All fields are required.')
  }

  try {
    await connectToDatabase

    const helpRequest = new HelpRequest({
      name,
      email,
      phone,
      subject,
      message,
    })

    await helpRequest.save()
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to submit form' }
    console.error('Error requesting help:', error)
  }
}
