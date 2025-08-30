import Link from 'next/link'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Card, CardContent } from '../ui/card'

const products = [
  {
    index: '1',
  },
  {
    index: '2',
  },
  {
    index: '3',
  },
  {
    index: '4',
  },
]

const Checkout = () => {
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
              <Input placeholder='First name' />
              <Input placeholder='Last name' />
              <Input placeholder='Email address' />
              <Input placeholder='Phone number' />
            </div>
          </section>

          {/* Shipping Info */}
          <section>
            <h2 className='text-xl font-semibold text-yellow-700 mb-4'>
              Shipping Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-white'>
              <Input placeholder='Country' />
              <Input placeholder='City' />

              <Input placeholder='Address' />
              <Input placeholder='Postal code' />
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className='text-xl font-semibold text-yellow-700 mb-4'>
              Payment Method
            </h2>
            <div className='space-y-3'>
              {['Visa', 'Mpesa', 'Google Pay', 'PayPal'].map((method) => (
                <label key={method}>
                  <input type='radio' name='payment' value={method} />
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

              {products.map((product, idx) => (
                <div key={idx} className='flex gap-4 mb-5'>
                  <div className='w-[80px] h-[80px]'></div>
                  <div className='flex-1'>
                    <h3 className='font-semibold'>...</h3>
                    <div className='flex items-center gap-2 mt-2'>
                      <Input type='number' className='w-16' min={1} />
                      <Button variant='outline' size='sm'>
                        Remove
                      </Button>
                    </div>
                    <div className='mt-1 text-sm font-medium'>...</div>
                  </div>
                </div>
              ))}

              <div className='border-t pt-4 space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>...</span>
                </div>
                <div className='flex justify-between'>
                  <span>Delivery cost</span>
                  <span>...</span>
                </div>
                <div className='flex justify-between'>
                  <span>Discount</span>
                  <span className='text-red-600'>...</span>
                </div>
                <div className='flex justify-between font-bold text-lg text-yellow-800'>
                  <span>Total to pay</span>
                  <span>....</span>
                </div>
              </div>

              <div className='mt-6'>
                <Button className='w-full bg-yellow-500 hover:bg-yellow-600 text-white'>
                  Pay Now
                </Button>
                <div className='mt-3 flex items-start gap-2 text-sm text-yellow-800'>
                  <Checkbox id='terms' />
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

export default Checkout
