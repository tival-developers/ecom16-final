import Product from '../db/models/product.model';
import Category from '../db/models/category.model';

export async function getProductsByCategory(categorySlug: string, query?: string) {
  // 1. Look up category by slug
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) return []; // no matching category

  // 2. Use category._id to find products
  
  const filter: any = { category: category._id };

  if (query) {
    filter.name = { $regex: query, $options: 'i' };
  }

  return Product.find(filter);
}
