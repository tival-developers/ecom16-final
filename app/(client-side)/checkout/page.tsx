'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { useCartStore } from '@/stores/cart'
import Price from '@/lib/utils/format'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { data: session, status } = useSession()

  const router = useRouter()
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Visa')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const subtotal = items.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  )

  const total = subtotal
  useEffect(() => {
    async function fetchShippingAddress() {
      try {
        const res = await fetch('/api/shipping-address')
        if (!res.ok) return
        const savedAddress = await res.json()

        setFirstName(savedAddress.firstName || '')
        setLastName(savedAddress.lastName || '')
        setEmail(savedAddress.email || '')
        setPhone(savedAddress.phone || '')
        setCountry(savedAddress.country || '')
        setCity(savedAddress.city || '')
        setAddress(savedAddress.address || '')
        setPostalCode(savedAddress.postalCode || '')
      } catch (err) {
        console.error('Failed to fetch shipping address:', err)
      }
    }
    fetchShippingAddress()
  }, [])

  // Show a loading UI while session is loading
  if (status === 'loading') {
    return (
      <main className='p-6 max-w-7xl mx-auto text-center'>
        <p className='text-xl text-gray-600'>Checking your login status...</p>
      </main>
    )
  }

  const onQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) {
      removeFromCart(id)
    } else {
      const currentItem = items.find((item) => item.productId === id)
      if (!currentItem) return
      const diff = newQty - currentItem.quantity
      if (diff > 0) {
        for (let i = 0; i < diff; i++) increaseQuantity(id)
      } else {
        for (let i = 0; i < -diff; i++) decreaseQuantity(id)
      }
    }
  }

  const handleOrderSubmit = async () => {
    if (!agreed) {
      toast.error('You must accept the Terms & Conditions.')
      return
    }
    if (status === 'unauthenticated' || !session) {
      toast.error('Please log in to place an order.')
      router.push('/login')
      return
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !country ||
      !city ||
      !postalCode
    ) {
      toast.error('Please fill in all the required fields.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user?.id,
          customer: {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            country,
            postalCode,
          },
          paymentMethod,
          items: items.map((item) => ({
            productId: item.productId,
            categoryId: item.categoryId,
            name: item.name,
            originalPrice: item.originalPrice,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
          total,
        }),
      })

      const data = await res.json()
      console.log('Checkout responseeeeeeeeeeeeeee:', data)

      if (!res.ok) {
        console.error('Checkout error response:', data)
        throw new Error(data.error || 'Checkout failed.')
      }

      toast.success('Order placed successfully!')
      await clearCart(session)
      router.push('/orders')
    } catch (error) {
      toast.error('Failed to place the order.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='p-6 max-w-7xl mx-auto bg-red-50 min-h-screen'>
      <h1 className='text-4xl font-extrabold text-yellow-700 mb-10 text-center'>
        Checkout
      </h1>

      <div className='grid md:grid-cols-2 gap-10'>
        {/* LEFT SIDE: FORM */}
        <div className='space-y-8 bg-white p-6 rounded-xl shadow-md border border-yellow-100'>
          {/* Contact Info */}
          <section>
            <h2 className='text-xl font-semibold text-yellow-700 mb-4'>
              Contact Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder='Phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </section>

          {/* Shipping Info */}
          <section>
            <h2 className='text-xl font-semibold text-yellow-700 mb-4'>
              Shipping Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
              <Input
                placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Input
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                placeholder='Postal code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className='text-xl font-semibold text-yellow-700 mb-4'>
              Payment Method
            </h2>
            <div className='space-y-3'>
              {['Visa', 'Mpesa', 'Google Pay', 'PayPal'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-2 border rounded-md px-4 py-2 cursor-pointer ${
                    paymentMethod === method
                      ? 'bg-yellow-100 border-yellow-500'
                      : 'bg-white'
                  }`}
                >
                  <input
                    type='radio'
                    name='payment'
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className='font-medium'>{method}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDE: ORDER SUMMARY */}
        <aside className='space-y-4'>
          <Card className='border border-yellow-200 shadow-lg'>
            <CardContent className='p-6 bg-yellow-50'>
              <h2 className='text-xl font-bold text-yellow-700 mb-6'>
                Order Summary
              </h2>

              {items.length === 0 ? (
                <p className='text-center text-gray-500'>Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className='flex gap-4 mb-5'>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={80}
                      className='rounded border'
                    />
                    <div className='flex-1'>
                      <h3 className='font-semibold'>{item.name}</h3>
                      <div className='flex items-center gap-2 mt-2'>
                        <Input
                          type='number'
                          className='w-16'
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            onQuantityChange(
                              item.productId,
                              Number(e.target.value)
                            )
                          }
                        />
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => removeFromCart(item.productId)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className='mt-1 text-sm font-medium'>
                        <Price amount={item.originalPrice * item.quantity} />
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div className='border-t pt-4 space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>
                    <Price amount={subtotal} />
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>Delivery cost</span>
                  <span className='text-green-600 '>
                    <Link href='/contacts'>Contact Seller</Link>
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>Discount</span>
                  <span className='text-red-600'>0.00</span>
                </div>
                <div className='flex justify-between font-bold text-lg text-yellow-800'>
                  <span>Total to pay</span>
                  <span>
                    <Price amount={total} />
                  </span>
                </div>
              </div>

              <div className='mt-6'>
                <Button
                  className='w-full bg-yellow-500 hover:bg-yellow-600 text-white'
                  onClick={handleOrderSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : 'Pay Now'}
                </Button>
                <div className='mt-3 flex items-start gap-2 text-sm text-yellow-800'>
                  <Checkbox
                    id='terms'
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  />
                  <label htmlFor='terms'>
                    I accept the{' '}
                    <Link href='#' className='underline font-medium'>
                      Terms & Conditions
                    </Link>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  )
}
