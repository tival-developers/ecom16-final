'use server'

import connectToDatabase from '@/lib/db/dbConnection'
import { z } from 'zod'
import HelpRequest from '../db/models/contact'
import Notification from '../db/models/notification'
import { auth } from '@/auth'
import User from '../db/models/user.model'
import { revalidatePath } from 'next/cache'

const FormSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(3, { message: 'Must be 3 or more characters long' }),
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  phone: z.string()
  .regex(
    /^(?:\+254|0)(7\d{8})$/,
    "Invalid  mobile number (e.g. 0712345678 or +254712345678)"
  ),
  subject: z.string().min(3, { message: 'Must be 5 or more characters long' }),
  message: z
    .string()
    .min(10, { message: 'Must be 10 or more characters long' }),
})

//*****************create**********************
export type ContactFormState =
  | { success: true }
  | { errors: Record<string, string[]> }

export async function ContactUs(formData: FormData): Promise<ContactFormState> {
  const session = await auth()
  if (!session?.user?.id) {
    return {
      errors: {
        _form: [
          'Unauthorized, check your login status and your admin priveleges then try again',
        ],
      },
    }
  }

  await connectToDatabase
  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return { errors: { _form: ['User not found'] } }
  }

  // ✅ Safe parse
  const parsed = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }
  const { name, email, phone, subject, message } = parsed.data

  try {
    // 1) Get the user
    const existingUser = await User.findOne({ email: session.user.email })
    if (!existingUser) {
      return { errors: { _form: ['User not found'] } }
    }

    const newHelpRequest = new HelpRequest({
      name,
      email,
      phone,
      subject,
      message,
    })

    await newHelpRequest.save()

    await Notification.create({
      type: 'helpRequest',
      title: 'New helpRequest',
      customerId: user._id,
      message: `New helpRequest by ${user.name || user.email} }`,
    })

    revalidatePath('/admin/dashboard/mails')
    return { success: true }
  } catch (err) {
    console.error('Error requesting help:', err)
    return {
      errors: {
        _form: [
          err instanceof Error ? err.message : 'Unexpected error occurred',
        ],
      },
    }
  }
}
