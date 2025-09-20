import React from 'react'
import CreateBlogPage from './wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Blog ',
  description: ' create blog ',
}

const page = () => {
  return (
    <div>
      <CreateBlogPage />
    </div>
  )
}

export default page
