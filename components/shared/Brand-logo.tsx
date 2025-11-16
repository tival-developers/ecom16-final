import { GlobeAltIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function CompanyLogo() {
  return (
    <Link href='/'>
      <div
      className='flex flex-row items-center leading-none text-black font-semibold rounded-2xl'
      >
        <GlobeAltIcon className='flex h-10 w-10  rotate-[15deg] text-gray-800'  />
        <h2 className=' text-2xl font-bold text-blue-600'>
            ST<span className='text-gray-800'>REAM</span>
          </h2>
      </div>
    </Link>
  )
}
