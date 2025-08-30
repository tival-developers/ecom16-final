// // import connectToDatabase from '@/lib/db/dbConnection'
// // import { NextResponse } from 'next/server'
// // import Product from "@/lib/db/models/product.model";

// // export async function POST(request) {
// //   try {
// //     await connectToDatabase
// //     const { name, category, description, imageUrl, price } = await request.json()

// //     // Check if product already exists
// //     const productexist = await Product.findOne({ name })

// //     if (productexist) {
// //       return NextResponse.json(
// //         { message: 'product already exists' },
// //         { status: 409 }
// //       );
// //     }

// //     // Create new product

// //     const newProduct = new Product({
// //       name,
// //       category,
// //       description,
// //       imageUrl,
// //       price,
// //     })
// //     await newProduct.save();

// //     return NextResponse.json(
// //       { message: 'created Product successfully' },
// //       { status: 201 }
// //     );
// //   } catch (err) {
// //     console.error('Error in registration:', err)
// //     return NextResponse.json(
// //       { message: 'Error creating Product', err },
// //       { status: 500 }
// //     )
// //   }
// // }
// // (GET all, POST create)
// // import connectToDatabase  from "@/lib/db/dbConnection";
// // import Product from "@/lib/db/models/product.model";
// // import Category from "@/lib/db/models/category.model";
// // import { NextResponse } from "next/server";

// // export async function GET() {
// //   await connectToDatabase;
// //   const products = await Product.find().populate("category");
// //   return NextResponse.json(products);
// // }

// // export async function POST(req: Request) {
// //   await connectToDatabase;
// //   const body = await req.json();
// //   const product = await Product.create(body);
// //   return NextResponse.json(product);
// // }

// import { NextRequest, NextResponse } from 'next/server'
// import connectToDatabase from '@/lib/db/dbConnection'
// import Product from '@/lib/db/models/product.model'
// import Category from '@/lib/db/models/category.model'

// export async function POST(req: NextRequest) {
//   await connectToDatabase
//   const data = await req.json()
//   const { name, originalPrice, description, imageUrl, categoryName } = data

//   try {
//     //Check if product already exists
//     const productexist = await Product.findOne({ name })

//     if (productexist) {
//       console.log("product exist bitch")
//       return NextResponse.json(
//         { message: 'product already exists' },
//         { status: 409 }
//       )
//     }
//     // Check if category already exists
//     let category = await Category.findOne({ name: categoryName })

//     // If not, create it
//     if (!category) {
//       category = await Category.create({
//         name: categoryName,
//         imageUrl
//       })
//     }

//     // Create product with reference to category
//     const product = await Product.create({
//       name,
//       originalPrice,
//       description,
//       imageUrl,
//       category: category._id,
//     })

//     return NextResponse.json({ product, success: true })
//   } catch (error) {
//     console.error('Error creating product:', error)
//     return NextResponse.json(
//       { error: 'Failed to create product' },
//       { status: 500 }
//     )
//   }
// }

// export async function GET() {
//   await connectToDatabase
//   const products = await Product.find().populate('category')
//   return NextResponse.json(products)
// }
import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
//import { auth } from '@/auth' // if you guard admin routes
import { createProductSchema } from '@/lib/zod/schemasValidations'
import Product from '@/lib/db/models/product.model'


export async function POST(req: NextRequest) {
  await connectToDatabase
  //const session = await auth()
  // Ensure admin, etc, if needed
  // if (!session?.user?.role === 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parse = createProductSchema.safeParse(body)
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 })
  }

  const data = parse.data
  

  // Mongoose pre-save will compute basePrice as the minimum achievable price
  const prod = await Product.create({
    ...data,
  })

  return NextResponse.json({ product: prod }, { status: 201 })
}
