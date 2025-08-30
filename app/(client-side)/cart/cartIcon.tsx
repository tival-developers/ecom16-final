'use client'

import Link from 'next/link'
import { useCartStore } from '@/stores/cart'
import { ShoppingBagIcon, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export const CartIcon = () => {
  const items = useCartStore((state) => state.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Button variant='outline' className='rounded-xl'>
      <Link
        href='/cart'
        className='relative  hover:text-black   flex items-center gap-2'
      >
        <ShoppingCart className='h-4 w-4 ' /> Cart
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
              className=''
            >
              ({totalQuantity})
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </Button>
  )
}
