'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LocateIcon, Mail, PhoneCall } from 'lucide-react'
import { FaFacebookSquare, FaInstagramSquare, FaTiktok } from 'react-icons/fa'
import { ContactUs } from '@/lib/actions/contacts'
import { useFormState } from 'react-dom'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { SubmitButton } from '@/components/ux/submit-button'

export default function ContactPage() {
  const [state, formAction] = useFormState(ContactUs, { success: null })

  // show toast when form submits
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success === true) {
      toast('Your message has been sent!', {
        description: 'We will get back to you as soon as possible',
      })
      formRef.current?.reset()
    }
    if (state.success === false) {
      toast('Failed to send your message', {
        description: 'Kindly try again',
      })
    }
  }, [state])

  return (
    <div className='w-full mt-7 bg-gradient-to-br from-yellow-50 to-white'>
      {/* Header Banner */}
      <div className='w-full bg-yellow-500 text-white py-20 text-center'>
        <h1 className='text-4xl font-bold text-gray-700'>Contact Us</h1>
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
                <span>+254 712 345678</span>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center'>
                <Mail className='w-6' />
              </div>
              <div className='flex flex-col'>
                <strong>Email:</strong>
                <a
                  href='mailto:support@tivaldevelopers.com'
                  className='text-blue-600 underline'
                >
                  support@tivaldevelopers.com
                </a>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center'>
                <LocateIcon className='w-6' />
              </div>
              <div className='flex flex-col'>
                <strong>Address:</strong>
                <span>Nairobi, Luthuli Street</span>
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
        <div className='bg-gray-800 text-white p-6 rounded-lg shadow'>
          <h2 className='mb-4'>Need Assistance? Send us a Message</h2>
          <form ref={formRef} action={formAction} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <Input placeholder='Email' type='email' name='email' required />
              <Input placeholder='Name' type='text' name='name' required />
            </div>
            <Input placeholder='Phone' type='tel' name='phone' required />
            <Input placeholder='Subject' type='text' name='subject' required />
            <Textarea placeholder='Message' rows={4} name='message' required />
            <SubmitButton />

            
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
