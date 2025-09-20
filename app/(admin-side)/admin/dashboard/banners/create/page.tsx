import React from 'react'
import CreateBanner from './wrapper'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Add Banner ',
  description: ' create banner ',
}

const page = () => {
  return (
    <div>
      <CreateBanner />
    </div>
  )
}

export default page
