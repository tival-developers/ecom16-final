'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'





const colours = [
  { name: 'Light Green', hex: '#1BAA8D' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Brown', hex: '#5B3B1D' },
  { name: 'Yellow', hex: '#F7C948' },
];
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



export default function Productfallback() {
  const [currentImage, setCurrentImage] = useState(0)
  
  
  
  
  
  
  const [selectedColour, setSelectedColour] = useState(colours[0])
  const [selectedSize, setSelectedSize] = useState('Ultra Slim')

  return (
    <div className='min-h-screen bg-yellow-50 text-gray-900 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Image */}
        <div>
          <Card className='flex justify-center items-center p-1.5 mb-2'>
            <CardContent>
            <div className='w-full h-[535px]'></div>
            </CardContent>
          </Card>
          {/* Thumbnails */}
          <div className='flex-col gap-2 pb-2 w-1/3'>
            {products.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`border-2 p-1.5 rounded ${
                  idx === currentImage
                    ? 'border-yellow-500 ring-2 ring-yellow-300'
                    : 'border-transparent hover:border-yellow-300'
                }`}
              >
                <div className=' w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded'>
                  <div className='w-[40px] h-[40px]'>

                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold text-yellow-600'> Product: ...</h1>
          <h2 className='text-2xl font-bold text-yellow-600'>
           ...
          </h2>
          <p className='text-xl text-green-700 font-medium'>
          Price:
          </p>
          <p className='text-sm'>
            Colour: <span className='font-medium'>{selectedColour.name}</span>
          </p>
          <p className='text-sm text-gray-600'>  Reliable product</p>

          {/* Colour Selection */}
          <div className='flex gap-2 items-center'>
            {colours.map((colour) => (
              <button
                key={colour.name}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColour.name === colour.name
                    ? 'border-black'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: colour.hex }}
                onClick={() => setSelectedColour(colour)}
              ></button>
            ))}
          </div>

          {/* Size Selection */}
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select Size' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Ultra Slim'>Ultra Slim</SelectItem>
              <SelectItem value='Medium'>Medium</SelectItem>
              <SelectItem value='Large'>Large</SelectItem>
            </SelectContent>
          </Select>

          {/* Add to Cart */}
          <div className='flex flex-col sm:flex-row gap-3 items-center justify-between py-4 px-6  rounded-b'>
            
             <Button>Add to Cart</Button>
            
            <Button>Add to Favorite</Button>
            <Button
              variant='link'
              className='w-full sm:w-auto text-yellow-700 font-medium hover:underline'
            >
              Shop Now
            </Button>
          </div>

          {/* Delivery & Shipping Info */}
          <ul className='text-sm text-gray-600 list-disc pl-5 space-y-1'>
            <li>Estimated delivery: 2-5 business days</li>
            <li>Waranty 6 months</li>
            <li>Signature packaging & personalised card</li>
          </ul>
        </div>
        <div>
        
        </div>
       
      </div>

      {/* Footer Section */}
      <div className='mt-16 text-center bg-gray-900 text-white py-8 px-4 rounded-xl'>
        <p className='text-lg font-bold'>WHERE EVERY PRODUCT TELLS A STORY</p>
        <p className='text-sm mt-2'>
          The laptop is suitable for your day to day productivity.Whether
          coding, reading, online writing....it gat u
        </p>
      </div>
    </div>
  )
}
