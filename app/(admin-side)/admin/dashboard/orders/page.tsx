import { Metadata } from 'next'

import OrdersPage from './wrapper'

export const metadata: Metadata = {
  title: 'Orders',
  description: 'view customer orders',
}

const page = () => {
  return (
    <div>
      <OrdersPage />
    </div>
  )
}

export default page
