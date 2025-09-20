import React from 'react'
import AdminMessagesPage from './wrapper'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Messages ',
  description: ' View and read messages ',
}


const page = () => {
  return (
    <div><AdminMessagesPage /></div>
  )
}

export default page