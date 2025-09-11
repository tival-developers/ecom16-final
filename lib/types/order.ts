// types/order.ts

export interface OrderedItem {
  productId: string
  name: string
  description: string
  imageUrl: string
  originalPrice: number
  quantity: number
  deliveredAt?: string // ISO date string, if delivered
}

export interface typeOrder {
  _id: string
  orderNumber: string // e.g. "WU88191111"
  createdAt: string // ISO date string of when the order was placed
  shippingAddress: {
    address: string
    city: string
    country: string
    postalCode: string
  }
  paymentMethod: string
  totalAmount: number
  items: OrderedItem[]
  deliveryStatus?: 'pending' | 'shipped' | 'delivered' | 'cancelled'

  paymentStatus: 'pending' | 'success'
  fulfillmentStatus: 'fulfilled' | 'unfulfilled'
  customerId: string

  customer: {
    name: string
    email: string
  }

  deliveredAt?: string // ISO date string if delivered
}
