'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LocateIcon, Mail, PhoneCall } from 'lucide-react'
import { FaFacebookSquare, FaInstagramSquare, FaTiktok } from 'react-icons/fa'
import { useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ContactUs } from '@/lib/actions/contacts'

export default function ContactPage() {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)

  // ✅ Controlled state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await ContactUs(formData)
      if ('errors' in res) {
        setErrors(res.errors)
        setSuccess(false)
      } else {
        setErrors({})
        setSuccess(true)
        setForm({ name: '', email: '', phone: '', subject: '', message: '' }) // ✅ reset
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL
  const phone = process.env.NEXT_PUBLIC_ADMIN_PHONE
  const address = process.env.NEXT_PUBLIC_ADMIN_ADDRESS

  return (
    <div className='w-full  bg-gradient-to-br from-yellow-50 to-white'>
      {/* Header Banner */}
      <div className='w-full bg-gradient-to-r from-gray-200 via-white to-gray-100 shadow-lg overflow-hidden py-15 md:py-25 text-center mx-auto'>
        <h1 className='text-4xl font-bold text-amber-600'>Contact Us</h1>
        <p className='mt-2 text-xl font-medium max-w-4xl mx-auto'>
          Your satisfaction is our priority. For inquiries related to products,
          services, or orders, our dedicated support team is available to
          provide prompt and professional assistance. Reach out — we are here to
          help.
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className='max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12'>
        {/* Contact Info */}
        <div>
          <h2 className='text-2xl font-bold mb-4'>Get In Touch</h2>

          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center'>
                <PhoneCall className='w-6' />
              </div>
              <div className='flex flex-col'>
                <strong>Phone:</strong>
                <span>{phone}</span>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center'>
                <Mail className='w-6' />
              </div>
              <div className='flex flex-col'>
                <strong>Email:</strong>
                <Link
                  href={`mailto:${email}`}
                  target='_blank'
                  className='text-blue-600 underline'
                >
                 {email}
                </Link>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center'>
                <LocateIcon className='w-6' />
              </div>
              <div className='flex flex-col'>
                <strong>Address:</strong>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <p className='text-xl font-medium'>Our Social Media Platforms</p>
            <div className='flex space-x-4 mt-2'>
              <Link href='https://facebook.com' target='_blank'>
                <FaFacebookSquare className='text-2xl text-blue-600' />
              </Link>
              <Link href='https://instagram.com' target='_blank'>
                <FaInstagramSquare className='text-2xl text-pink-600' />
              </Link>
              <Link href='https://tiktok.com' target='_blank'>
                <FaTiktok className='text-2xl text-black' />
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className='bg-gradient-to-r from-gray-200 via-white to-gray-100 shadow-lg overflow-hidden  p-6 rounded-lg '>
          <h2 className='mb-4'>Need Assistance? Send us a Message</h2>
          <form action={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <Input
                  placeholder='Email'
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email[0]}</p>
                )}
              </div>
              <div>
                <Input
                  placeholder='Name'
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name[0]}</p>
                )}
              </div>
            </div>
            <div>
              <Input
                placeholder='Phone'
                type='tel'
                name='phone'
                value={form.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone[0]}</p>
              )}
            </div>
            <div>
              <Input
                placeholder='Subject'
                type='text'
                name='subject'
                value={form.subject}
                onChange={handleChange}
                required
              />
              {errors.subject && (
                <p className='text-red-500 text-sm'>{errors.subject[0]}</p>
              )}
            </div>
            <div>
              <Textarea
                placeholder='Message'
                rows={4}
                name='message'
                value={form.message}
                onChange={handleChange}
                required
              />
              {errors.message && (
                <p className='text-red-500 text-sm'>{errors.message[0]}</p>
              )}
            </div>

            {errors._form && (
              <p className='text-red-500 text-sm'>{errors._form[0]}</p>
            )}
            {success && <p className='text-green-600 text-sm'>Message Sent!</p>}

            <Button type='submit' disabled={isPending}>
              {isPending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className='w-full h-[400px]'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8173311646215!2d36.820987074965544!3d-1.2834673987043355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6678064cf%3A0x956bb6f5e0ab2aac!2sMoi%20Ave%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1755601141561!5m2!1sen!2ske'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  )
}
