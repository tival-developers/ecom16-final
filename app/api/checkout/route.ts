// import { NextResponse } from 'next/server'
// import connectToDatabase from '@/lib/db/dbConnection'
// import { auth } from '@/auth' // ← points to the file you just defined
// import { Order } from '@/lib/db/models/order'
// import { generateOrderNumber } from '@/lib/utils/order'
// import Cart from '@/lib/db/models/cart'

// // export async function POST(req: Request) {
// //   // 1) Authenticate the request
// //   const session = await auth()
// //   if (!session?.user?.id) {
// //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
// //   }

// //   // 2) Parse and validate the incoming JSON
// //   const { customer, paymentMethod, items, total } = await req.json()

// //   if (!customer || typeof customer !== 'object') {
// //     return NextResponse.json(
// //       { error: 'Missing customer info' },
// //       { status: 400 }
// //     )
// //   }
// //   // … (optional: add additional validation here) …

// //   // 3) Connect to DB (note the parentheses)
// //   await connectToDatabase

// //   try {
// //     // 4) Create the order with a valid userId
// //     const orderNumber = generateOrderNumber() // implement a function or use a UUID
// //     const newOrder = await Order.create({
// //       //userId: session.user.id,
// //       customer: session.user.id,
// //       orderNumber,
// //       items,
// //       shippingAddress: customer,
// //       paymentMethod,
// //       totalAmount: total,
// //       deliveryStatus: 'pending',
// //       paymentStatus: 'pending',
// //       fulfillmentStatus: 'Unfulfilled',
// //     })
// //     console.log(orderNumber)
// //     // 5) Clear the user's cart after placing order
// //     await Cart.deleteMany({ userId: session?.user?.id })

// //     console.log('Order placed and cart cleared.')
// //     return NextResponse.json(newOrder, { status: 201 })
// //   } catch (err) {
// //     console.error('CHECKOUT_ERROR', err)
// //     return NextResponse.json(
// //       { error: 'Failed to create order' },
// //       { status: 500 }
// //     )
// //   }
// // }
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import { auth } from '@/auth'
import { Order } from '@/lib/db/models/order'
import { generateOrderNumber } from '@/lib/utils/order'
import Cart from '@/lib/db/models/cart'
import { ShippingAddress } from '@/lib/db/models/shipping'
import User from '@/lib/db/models/user.model'
import { chekoutProduct } from '@/stores/checkout'

// export async function POST(req: Request) {
//   const session = await auth()
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const { customer, paymentMethod, items, total } = await req.json()

//   if (!customer || typeof customer !== 'object') {
//     return NextResponse.json(
//       { error: 'Missing customer info' },
//       { status: 400 }
//     )
//   }

//   await connectToDatabase

//   try {

//     const orderNumber = generateOrderNumber()

//     const newOrder = await Order.create({
//       customerId: session.user.id,
//       customer: {
//         name: `${customer.firstName} ${customer.lastName}`,
//         email: customer.email,
//       },
//       orderNumber,
//       items,
//       shippingAddress: {
//         firstName: customer.firstName,
//         lastName: customer.lastName,
//         email: customer.email,
//         phone: customer.phone,
//         address: customer.address,
//         city: customer.city,
//         country: customer.country,
//         postalCode: customer.postalCode,
//       },
//       paymentMethod,
//       totalAmount: total,
//       fulfillmentStatus: 'unfulfilled',
//       paymentStatus: 'pending',
//       deliveryStatus: 'pending',
//     })
//     console.log(newOrder,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuu")

//     const existingAddress = await ShippingAddress.findOne({ customerId: session.user.id })
//     if (existingAddress) {
//       await ShippingAddress.updateOne({ customerId: session.user.id }, {
//         firstName: customer.firstName,
//         lastName: customer.lastName,
//         email: customer.email,
//         phone: customer.phone,
//         address: customer.address,
//         city: customer.city,
//         country: customer.country,
//         postalCode: customer.postalCode,

//       })
//     } else {
//       await ShippingAddress.create({
//         customerId: session.user.id,
//         firstName: customer.firstName,
//         lastName: customer.lastName,
//         email: customer.email,
//         phone: customer.phone,
//         address: customer.address,
//         city: customer.city,
//         country: customer.country,
//         postalCode: customer.postalCode,
//       })
//     }

// // if (existingAddress) {
// //   await ShippingAddress.updateOne({ customerId: session.user.id }, {
// //     firstName, lastName, email, phone, country, city, address, postalCode
// //   })
// // } else {
// //   await ShippingAddress.create({
// //     customerId: session.user.id,
// //     firstName, lastName, email, phone, country, city, address, postalCode
// //   })
// // }

//     await Cart.deleteMany({ userId: session.user.id })

//     console.log('Order placed and cart cleared.')
//     return NextResponse.json(newOrder, { status: 201 })
//   } catch (err) {
//     console.error('CHECKOUT_ERROR', err)
//     return NextResponse.json(
//       { error: 'Failed to create order' },
//       { status: 500 }
//     )
//   }
// }
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { customer, paymentMethod, items, total } = await req.json()
  console.log('Incoming checkout items:', items)

  if (!customer || typeof customer !== 'object') {
    return NextResponse.json(
      { error: 'Missing customer info' },
      { status: 400 }
    )
  }

  await connectToDatabase

  try {
    // ✅ get MongoDB user ObjectId
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const orderNumber = generateOrderNumber()

    const newOrder = await Order.create({
      customerId: user._id, // ✅ ObjectId reference
      customer: {
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
      },
      orderNumber,
      items: items.map((item: chekoutProduct) => ({
        productId: item.productId,
        categoryId: item.categoryId, // ✅ make sure store sends this
        name: item.name,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),

      shippingAddress: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        postalCode: customer.postalCode,
      },
      paymentMethod,
      totalAmount: total,
      fulfillmentStatus: 'unfulfilled',
      paymentStatus: 'pending',
      deliveryStatus: 'pending',
    })

    // ✅ update or create shipping address for this user
    await ShippingAddress.updateOne(
      { customerId: user._id },
      {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        postalCode: customer.postalCode,
      },
      { upsert: true }
    )

    // ✅ clear cart
    await Cart.deleteMany({ userId: user._id })

    return NextResponse.json(newOrder, { status: 201 })
  } catch (err) {
    console.error('CHECKOUT_ERROR', err)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
