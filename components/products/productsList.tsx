// import AddToCartButton from '@/components/cartadd'
// import { SearchCategories } from '@/components/shared/search'
// import { Card, CardContent, CardFooter } from '@/components/ui/card'
// import Image from 'next/image'
// import Link from 'next/link'
// import Price from '@/lib/utils/format'
// import { getProductsByCategory } from '@/lib/actions/getProductsByCategories'
// import { ProductType } from '@/lib/types/product'
// import PriceFilterSlider from '@/app/(client-side)/categories/components/priceFilter'

// export default async function ProductCategoryList({
//   categorySlug,
//   searchQuery,
// }: {
//   categorySlug: string
//   searchQuery?: string
// }) {
//   // fetch products by category and search

//   const productsData = await getProductsByCategory(categorySlug, searchQuery)
//   const products = JSON.parse(JSON.stringify(productsData))

//   return (
//     <div>
//       {/* search bar to filter within this category */}
//       <div className='mb-10'>
//         <SearchCategories
//           placeholder='Search within this category...'
//           basePath={`/categories/${categorySlug}`}
//         />
//       </div>
//       {/* search bar to filter within this category */}
//       <PriceFilterSlider minPrice={0} maxPrice={1000}  />

//       {/* products grid */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
//         {products?.map((product: ProductType) => (
//           <Card
//             key={product._id}
//             className='border border-gray-200 flex flex-col justify-between bg-white shadow-sm rounded-lg overflow-hidden h-full'
//           >
//             <CardContent className='p-4 flex flex-col flex-1'>
//               <div className='relative w-full h-48 sm:h-56 mb-4 rounded overflow-hidden group'>
//                 <Link href={`/product/${product._id}`} className='h-full'>
//                   <Image
//                     src={product.imageUrls?.[0] || '/placeholder.jpg'}
//                     alt={product.name}
//                     fill
//                     priority
//                     className='object-contain p-2'
//                   />
//                 </Link>
//               </div>
//               <p className='text-xl font-semibold mb-2 line-clamp-1'>
//                 {product.name}
//               </p>
//               <p className='text-[15px] text-gray-600 flex-grow line-clamp-3'>
//                 {product.description}
//               </p>
//             </CardContent>

//             <CardFooter className='px-4 py-3 mt-auto'>
//               <div className='flex justify-between items-center w-full'>
//                 <p className='text-yellow-500 font-bold text-lg'>
//                   <Price amount={product.originalPrice} />
//                 </p>
//                 <AddToCartButton product={product} />
//               </div>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
// ProductCategoryList.tsx
import { SearchCategories } from '@/components/shared/search'
import { getProductsByCategory } from '@/lib/actions/getProductsByCategories'
import ProductCategoryGrid from './product-grid'


export default async function ProductCategoryList({
  categorySlug,
  searchQuery,
}: {
  categorySlug: string
  searchQuery?: string
}) {
  // fetch products by category and search
  const productsData = await getProductsByCategory(categorySlug, searchQuery)
  const products = JSON.parse(JSON.stringify(productsData))

  return (
    <div>
      {/* search bar to filter within this category */}
      <div className='mb-10'>
        <SearchCategories
          placeholder='Search within this category...'
          basePath={categorySlug ? `/categories/${categorySlug}` : `/categories`}
          
        />
      </div>

      {/* client-side product grid with price filtering */}
      <ProductCategoryGrid initialProducts={products} />
    </div>
  )
}
