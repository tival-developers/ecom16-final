'use client'

import Link from 'next/link'
import { useFavStore } from '@/stores/favorite'
import { Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const FavIcon = () => {
  const items = useFavStore((state) => state.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href='/favorite' className='relative '>
      <Heart className='w-5 h-5' />

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
            className='absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-semibold p-0.5  z-10 rounded-full'
          >
            {totalQuantity}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
}
