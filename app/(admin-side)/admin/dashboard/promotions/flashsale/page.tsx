import { Metadata } from 'next'
import FlashSaleManager from './wrapper'

export const metadata: Metadata = {
  title: 'Flashsales',
  description: 'view & add flashsales items ',
}

const page = () => {
  return (
    <div>
      <FlashSaleManager />
    </div>
  )
}

export default page
