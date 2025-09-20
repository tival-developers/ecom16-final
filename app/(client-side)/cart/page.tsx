import React from 'react';
import Cartpage from './wrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Cart',
  description: 'view cart',
}

const page = () => {
  return (
    <div>
      <Cartpage />
    </div>
  );
}

export default page;
