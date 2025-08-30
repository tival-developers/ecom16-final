
'use client'

import { Button } from '@/components/ui/button'
import { useFavStore } from '@/stores/favorite'
import { toast } from 'sonner'
import { Heart } from 'lucide-react'

interface Props {
  product: {
    _id: string
    name: string
    originalPrice: number
    imageUrls: string[]
    description: string
  }
  variant: string
}
export default function AddToFavoriteButton({ product, variant = 'icon' }: Props) {
  const addFav = useFavStore((state) => state.addToFav)
  const removeFav = useFavStore((state) => state.removeFromFav)
  const isFav = useFavStore((state) =>
    state.items.some((item) => item._id === product._id)
  )

  const handleClick = () => {
    if (isFav) {
      removeFav(product._id)
      toast('Removed from Favorites')
    } else {
      addFav({
        _id: product._id,
        name: product.name,
        originalPrice: product.originalPrice,
        description: product.description,
        imageUrl: product.imageUrls[0],
        quantity: 1,
      })
      toast('Added to Favorites')
    }
  }

  return (
    <>
      {variant === 'icon' ? (
        <Button variant='ghost' size='icon' onClick={handleClick} className='w-4 h-4 -top-5 absolute'>
          <Heart fill={isFav ? 'red' : 'none'} color='red' />
        </Button>
      ) : (
        <Button
          variant='outline'
          onClick={handleClick}
          className={` sm:w-auto border-yellow-400 text-yellow-600 hover:bg-yellow-100 ${
            isFav ? 'bg-yellow-500 text-white' : 'bg-white'
          }`}
        >
          {isFav ? '★ In Favorites' : '☆ Add to Favorites'}
        </Button>
        
      )}
    </>
  )
}
