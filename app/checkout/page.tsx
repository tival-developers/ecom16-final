
import { Metadata } from 'next'
import CheckoutPage from './wrapper'

export const metadata: Metadata = {
    title: 'Checkout',
    description: 'view your checkout information',
  }

const Wrapper = () => {
  return (
    <div>
    <CheckoutPage />
    </div>
  )
}

export default Wrapper




