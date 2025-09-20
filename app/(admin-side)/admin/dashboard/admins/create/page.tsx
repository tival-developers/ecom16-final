import React from 'react'
import { Metadata } from 'next'
import CreateAdminPage from './wrapper'

export const metadata: Metadata = {
  title: 'Add Admin ',
  description: ' create admin ',
}
const page = () => {
  return (
    <div>
      <CreateAdminPage />
    </div>
  )
}

export default page
