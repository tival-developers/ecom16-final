import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

// Skeleton Component
export default function RecentSalesSkeleton() {
  return (
    <div className='col-span-3 text-gray-800 py-2'>
      <div>
        <h2 className='p-3'>Recent Sales</h2>
        <Skeleton className='h-4 w-48 mx-4' />
      </div>
      <div>
        <div className='space-y-8 px-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='flex items-center'>
              <Skeleton className='h-9 w-9 rounded-full' />
              <div className='ml-4 space-y-1'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-40' />
              </div>
              <div className='ml-auto'>
                <Skeleton className='h-4 w-12' />
              </div>
            </div>
          ))}
        </div>
        <div className='px-4 mt-4'>
          <Button variant={'outline'} disabled>
            <Skeleton className='h-4 w-20' />
          </Button>
        </div>
      </div>
    </div>
  )
}
