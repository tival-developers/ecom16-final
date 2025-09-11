// lib/products.ts

import Product from "../db/models/product.model";


export async function getProducts(query?: string) {
  if (query) {
    return await Product.find({
      name: { $regex: query, $options: 'i' }, // case-insensitive
    });
  }
  const fetchProducts = await Product.find().lean()
  const products = JSON.parse(JSON.stringify(fetchProducts))
  return await products;
  
}

