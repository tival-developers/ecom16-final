
'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'

type Props = {
  minPrice: number
  maxPrice: number
  productCount?: number  // new prop
  onChange?: (range: [number, number]) => void
}

export default function PriceFilterSlider({ minPrice, maxPrice, productCount, onChange }: Props) {
  
  const [range, setRange] = useState<[number, number]>([minPrice, maxPrice])

  useEffect(() => {
    setRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const handleChange = (value: [number, number]) => {
    setRange(value)
    onChange?.(value)
  }

  return (
    <div className='space-y-4 p-2'>
      <div className='space-y-4'>
        <h3 className='text-sm font-medium'>Filter by Price</h3>
        <div className='flex justify-between text-sm py-1.5 text-muted-foreground'>
          <span>Ksh {range[0]}</span>
          <span>Ksh {range[1]}</span>
        </div>
        <Slider
          min={minPrice}
          max={maxPrice}
          step={1}
          value={range}
          onValueChange={handleChange}
          
        />
        <p className='text-sm text-muted-foreground'>
          {productCount !== undefined
            ? `${productCount} product${productCount !== 1 ? 's' : ''} found`
            : ''}
        </p>
      </div>
    </div>
  )
}

