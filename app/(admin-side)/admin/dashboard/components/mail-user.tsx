import { BellAlertIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { UserNav } from './user-nav'

export function MailUser({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <div className='relative p-5 flex items-center justify-items-center gap-4'>
        
        <Link href='/mail'>
          <BellAlertIcon className=' h-6 w-6' />
        </Link>
        <div>
          <UserNav />
        </div>
      </div>
    </form>
  )
}
