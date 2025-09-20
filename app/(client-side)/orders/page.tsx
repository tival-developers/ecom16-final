import { Metadata } from 'next'
import OrdersPage from './wrapper'

export const metadata: Metadata = {
    title: 'Orders',
    description: 'view all your orders',
  }

const Wrapper = () => {
  return (
    <div>
    <OrdersPage />
    </div>
  )
}

export default Wrapper

