'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { signOutAction } from '@/lib/actions/auth'
import { Separator } from '../ui/separator'
import { useCartStore } from '@/stores/cart'
import { useFavStore } from '@/stores/favorite'

export function SignOut() {
  const { clearCart } = useCartStore()
  const { clearFav } = useFavStore()

  const handleSignOut = async () => {
    // Clear the cart for guest
    await clearCart(null)
    await clearFav(null)

    // Sign out via next-auth
    await signOutAction()
  }

  return (
    <Card
      className='bg-gradient-to-tr from-amber-600 via-amber-300 to-pink-300
 rounded-2xl'
    >
      <CardHeader>
        <h3 className='text-xl font-md text-white p-4'>Logout</h3>
      </CardHeader>
      <Separator />
      <CardContent className='p-3'>
        <h5 className='text-2xl font-medium'>
          Are you sure you want to sign out?
        </h5>
      </CardContent>
      <CardFooter className='p-4'>
        <Button onClick={handleSignOut}>Sign out</Button>
      </CardFooter>
    </Card>
  )
}
