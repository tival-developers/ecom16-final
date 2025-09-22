// app/admin/dashboard/products/page.jsx (server)

import connectToDatabase from '@/lib/db/dbConnection'
import mongoose from 'mongoose'
import ProductList from '../../components/lists/product-list'
import Category from '@/lib/db/models/category.model'
import Product from '@/lib/db/models/product.model'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'View and Add Products ',
  description: ' View and Add Products ',
}


export default async function ProductsDashboard() {
  await connectToDatabase()
   const category = mongoose.models.Category || Category
   console.log(category)
  const products = await Product.find().populate('category').lean()

  return <ProductList products={JSON.parse(JSON.stringify(products))} />
}
