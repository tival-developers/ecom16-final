
import connectToDatabase from '@/lib/db/dbConnection'
import Category from '@/lib/db/models/category.model'
import mongoose from 'mongoose'
import CategoryList from '../../components/lists/category-list'


export default async function Home() {
  await connectToDatabase
  const CategoryModel = mongoose.models.Category || Category
  const categories = await CategoryModel.find().lean()

  return <CategoryList categories={JSON.parse(JSON.stringify(categories))} />
}











