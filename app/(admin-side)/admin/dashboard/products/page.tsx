

// app/admin/dashboard/products/page.jsx (server)
import Product from '@/lib/db/models/product.model'
import connectToDatabase from '@/lib/db/dbConnection'
import mongoose from 'mongoose'
import ProductList from './components/product-list'


export default async function Home() {
  await connectToDatabase
  const ProductModel = mongoose.models.Product || Product
  const products = await ProductModel.find().populate('category').lean()

  return <ProductList products={JSON.parse(JSON.stringify(products))} />
}
