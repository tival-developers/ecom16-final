import React from 'react';
import CategoryPage from './wrapper';
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: ' Add Product category',
  description: ' add product categories ',
}
const page = () => {
  return (
    <div>
      <CategoryPage />
    </div>
  );
}

export default page;
