'use client'

import Link from 'next/link'
import { useFavStore } from '@/stores/favorite'
import { Circle, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const FavIcon = () => {
  const items = useFavStore((state) => state.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href='/favorite' className='relative '>
      <div className='relative '>
        <Heart className='w-5 h-5' />
        {items.length === 0 ? (
          <p></p>
        ) : (
        <Circle className='absolute  w-4 h-4 -top-1 left-3 bg-black rounded-full' />
      )}
      </div>

      <AnimatePresence>
        {totalQuantity > 0 && (
          <motion.span
            key={totalQuantity} // triggers animation on count change
            initial={{ scale: 0, opacity: 0 }}
            //animate={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
            //transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='absolute -top-1 -right-1  text-white text-xs font-semibold   z-10 rounded-full '
          >
            {totalQuantity}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
}
