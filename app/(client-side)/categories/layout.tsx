//import { Card } from '@/components/ui/card'
import Filters from './components/filter'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
export default function Productslayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-white min-h-screen px-2 py-8'>
      <div className='max-w-full mx-auto'>
        <h1 className='text-3xl font-bold text-yellow-600 mb-6'>
          Explore All Products
        </h1>

        {/* Mobile Filter Button */}
        <div className='md:hidden mb-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='flex items-center gap-2'>
                <Filter className='w-4 h-4' /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-72 p-4'>
              <Filters />
            </SheetContent>
          </Sheet>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-6 gap-6 '>
          {/* Sidebar Filters - shown on md+ */}
          <div className='hidden md:block sticky top-24 h-fit'>
            <Filters />
          </div>

          {/* Product Cards */}
          <div className='md:col-span-5'>{children}</div>
        </div>

        {/* Load More Button */}
        <div className='flex justify-center mt-10'>
          <Button variant='outline'>Load more</Button>
        </div>
      </div>
    </div>
  )
}
