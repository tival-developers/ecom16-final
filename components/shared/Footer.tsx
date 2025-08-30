import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookSquare, FaInstagramSquare, FaTiktok } from 'react-icons/fa'
import { AddToNewsletter } from '@/lib/actions/newsletter'

/* ---------------- Newsletter Form Component ---------------- */
function NewsletterForm({ compact = false }: { compact?: boolean }) {
  return (
    <form 
    action={AddToNewsletter}
    className={`mt-3 ${compact ? '' : 'flex gap-2 max-w-md'}`}>
      {compact && (
        <label htmlFor='newsletter-email' className='text-xl font-medium block'>
          Subscribe to our newsletter
        </label>
      )}
      <div className={`flex gap-2 ${compact ? 'pt-1' : ''}`}>
        <Input
          id='newsletter-email'
          name='email'
          type='email'
          placeholder='Enter your email'
          className='bg-white text-black'
        />
        <Button 
        type='submit'
        className='bg-white text-blue-600 hover:bg-blue-100'>
          Subscribe
        </Button>
      </div>
      {!compact && (
        <p className='mt-2 text-[10px] text-black'>
          You can unsubscribe at any time.{' '}
          <span className='underline cursor-pointer'>
            Read our privacy policy
          </span>
          .
        </p>
      )}
    </form>
  )
}

/* ---------------- Footer Links Data ---------------- */
const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Contacts', href: '/contacts' },
      { label: 'Blogs', href: '/blogs' },
      { label: 'Terms and Conditions', href: '/terms&conditions' },
    ],
  },
  {
    title: 'Support',
    links: [{ label: 'Help Center', href: '/contacts' }],
  },
  {
    title: 'Links',
    links: [
      { label: 'Products', href: '/categories' },
      { label: 'Cart', href: '/cart' },
      { label: 'Orders', href: '/orders' },
      { label: 'Favorite', href: '/favorite' },
    ],
  },
]

/* ---------------- Social Links ---------------- */
const socialLinks = [
  { icon: FaFacebookSquare, href: 'https://facebook.com', label: 'Facebook' },
  {
    icon: FaInstagramSquare,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  { icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok' },
]

/* ---------------- Main Footer Component ---------------- */
export default function FooterWithNewsletter() {
  return (
    <footer className='mt-5 relative bg-white'>
      {/* Newsletter - Desktop */}
      <div className='hidden md:flex relative z-10 justify-center px-4 -mb-40'>
        <div className='w-full max-w-6xl rounded-2xl bg-amber-500 text-white shadow-xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          {/* Left content */}
          <div className='flex-1'>
            <h2 className='text-lg md:text-xl font-semibold'>
              Subscribe to our newsletter to get updates on our latest
              collections
            </h2>
            <p className='text-sm md:text-sm text-white'>
              You will never be left out in upcoming promos !!
            </p>
            <NewsletterForm />
          </div>

          {/* Right image */}
          <div className='hidden md:block w-32 h-24 shrink-0 items-center'>
            <Image
              src='https://res.cloudinary.com/db4x4ln72/image/upload/e_background_removal/f_png/v1746559710/qvzpxstfeu47dmiucpsk.jpg'
              alt='Newsletter Graphic'
              width={140}
              height={20}
            />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className='relative z-0 mt-32 bg-gray-100 pt-15 pb-12'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 '>
          <div className='flex flex-col md:flex-row justify-between gap-10'>
            {/* Branding */}
            <div className='max-w-sm'>
              <h2 className='text-2xl font-bold text-amber-600'>
                ST<span className='text-black'>REAM</span>
              </h2>
              <p className='text-sm mb-4 text-muted-foreground'>
                Your one stop shop for all tech products at affordable prices
              </p>
              {/* Newsletter on mobile */}
              <div className='md:hidden'>
                <NewsletterForm compact />
              </div>
            </div>

            {/* Links */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm'>
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h4 className='font-semibold mb-3 text-black'>{section.title}</h4>
                  <ul className='space-y-2'>
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className='text-muted-foreground hover:text-white transition-colors'
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Social Media */}
              <div>
                <h4 className='font-semibold mb-3 text-black'>Engage Us</h4>
                <div className='flex space-x-4 mt-2'>
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      target='_blank'
                      aria-label={label}
                      className='hover:opacity-80'
                    >
                      <Icon className='text-2xl text-amber-600' />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className='mt-10 pt-6 border-t border-gray-700 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p>© Copyright by TivalDevelopers. All rights reserved.</p>
            <div className='flex space-x-4'>
              <Link href='#'>Privacy Policy</Link>
              <Link href='#'>Terms of Use</Link>
              <Link href='#'>Legal</Link>
              <Link href='#'>Site Map</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
