import { Metadata } from 'next'
import ContactPage from './wrapper'
export const metadata: Metadata = {
    title: 'Contacts',
    description: 'our contacts page',
  }

const Wrapper = () => {
  return (
    <div>
    <ContactPage />
    </div>
  )
}

export default Wrapper





