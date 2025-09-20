import { Metadata } from 'next'
import FavoritePage from './wrapper'
export const metadata: Metadata = {
    title: 'Favorites',
    description: 'view your favorite products',
  }

const Wrapper = () => {
  return (
    <div>
    <FavoritePage />
    </div>
  )
}

export default Wrapper
