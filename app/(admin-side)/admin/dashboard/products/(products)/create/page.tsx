import React from 'react';

import { Metadata } from 'next'
import CreateProductPage from './wrapper';


export const metadata: Metadata = {
  title: ' Add Product',
  description: ' add product  ',
}
const page = () => {
  return (
    <div>
      <CreateProductPage />
    </div>
  );
}

export default page;
