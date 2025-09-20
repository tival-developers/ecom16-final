import { Metadata } from 'next'
import SettingsPage from './wrapper'
export const metadata: Metadata = {
    title: 'Settings',
    description: 'view and modify your profile settings',
  }

const Wrapper = () => {
  return (
    <div>
    <SettingsPage />
    </div>
  )
}

export default Wrapper





