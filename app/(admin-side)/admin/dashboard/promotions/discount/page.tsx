import { Metadata } from 'next'
import PromoManager from './wrapper'

export const metadata: Metadata = {
  title: 'Discount products',
  description: 'view & add discount items ',
}

const page = () => {
  return (
    <div>
      <PromoManager />
    </div>
  )
}

export default page
