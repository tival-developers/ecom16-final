
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const products =[
    {
       index: "1" 
    },
    { 
        index: "2" 
    },
    {
        index: "3" 
    },
    {
        index: "4" 
    },
]

const HomeCatProd = () => {
  return (
    <div>
      <section className='px-4 py-6'>
        <div className='mb-6'>
          <h2 className='text-xl font-bold text-yellow-600 mb-1.5'>Product</h2>
          <Separator />
        </div>

        <div
          className='
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6
        '
        >
          {products.map((product, idx) => (
            <Card
              key={idx}
              className='
                border border-gray-200
                flex flex-col
                justify-between
                bg-white
                shadow-sm
                rounded-lg
                overflow-hidden
                h-full
              '
            >
              <CardContent className='p-4 flex flex-col flex-1'>
                <div className='relative w-full h-48 sm:h-56 mb-4 rounded overflow-hidden group'>
                  <div className='w-full h-[235px] bg-gray-100'></div>

                 <Button>Add to Favorite</Button>
                </div>
                <p className='text-xl font-semibold mb-2 line-clamp-1'>
                  Product: ...
                </p>
                <p className='text-[15px] text-gray-600 flex-grow line-clamp-3'>
                  Reliable product
                </p>
              </CardContent>

              <CardFooter className='px-4 py-3 mt-auto'>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-yellow-500 font-bold text-lg'>Price:KSH</p>
                  <Button>Add to Cart</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomeCatProd
