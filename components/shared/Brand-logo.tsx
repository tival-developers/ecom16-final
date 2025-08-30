import { GlobeAltIcon } from '@heroicons/react/24/outline'
//import { lusitana } from '@/app/ui/fonts'
import Link from 'next/link'

export default function CompanyLogo() {
  return (
    <Link href='/'>
      <div
      className='flex flex-row items-center leading-none text-black font-semibold'
        // className={`${lusitana.className} flex flex-row items-center leading-none text-black font-semibold `}
      >
        <GlobeAltIcon className='h-12 w-12 rotate-[15deg]' />
        <p className='text-3xl md:text-4xl lg:text-3xl'> Rtech</p>
      </div>
    </Link>
  )
}
