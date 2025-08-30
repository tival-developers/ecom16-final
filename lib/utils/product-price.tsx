import Price from './format'

interface ProductPriceProps {
  originalPrice: number
  newPrice?: number
}

export function ProductPrice({ originalPrice, newPrice }: ProductPriceProps) {
  return (
    <div className='flex items-center gap-2'>
      {newPrice ? (
        <>
          <span className='text-gray-500 line-through text-sm'>
            <Price amount={originalPrice} />
          </span>
          <span className='text-lg font-semibold text-red-600'>
            <Price amount={newPrice} />
          </span>
        </>
      ) : (
        <span className='text-lg font-semibold text-gray-900'>
          <Price amount={originalPrice} />
        </span>
      )}
    </div>
  )
}

