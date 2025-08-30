// Skip to content
// You said:
// create a banner  of width 800px and height of 400px. the banner should have an image of a laptop and a flash disk and a yellow  background. it should have the following text. Get unbeatable offers at Stream Technologies
// ChatGPT said:

// Image created
// Generated image
// Generated image
// Generated image



// Share
// You said:
// what are the max-width of an image that you can generate
// ChatGPT said:
// The maximum image size I can generate is 1792 pixels wide by 1024 pixels tall (or vice versa — 1024 × 1792) in a single image. Let me know if you'd like an image at that resolution or something specific within that range!

// You said:
// how can i remove image background using cloudinary before the image is uploaded: 'use client'

// import { useState } from 'react'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Button } from '@/components/ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import Image from 'next/image'
// import { productCreate } from '@/lib/actions/products.actions'
// //import UploadImageModal from '@/components/uploadImageModal'

// type UploadedImage = {
//   url: string
//   public_id: string
// }

// export default function CreateProduct() {
//   const [imageUrls, setImageUrls] = useState<UploadedImage[]>([])
//   const [uploading, setUploading] = useState(false)
//   const [progress, setProgress] = useState<number[]>([])

//   const handleMultipleImageUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = e.target.files
//     if (!files || files.length === 0) return

//     setUploading(true)
//     setProgress(Array(files.length).fill(0))

//     const uploadedUrls: UploadedImage[] = []

//     for (let i = 0; i < files.length; i++) {
//       const formData = new FormData()
//       formData.append('file', files[i])
//       formData.append(
//         'upload_preset',
//         process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
//       )

//       try {
//         const res = await fetch(
//           https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload,
//           {
//             method: 'POST',
//             body: formData,
//           }
//         )
//         const data = await res.json()
//         uploadedUrls.push({ url: data.secure_url, public_id: data.public_id })

//         setProgress((prev) => {
//           const updated = [...prev]
//           updated[i] = 100
//           return updated
//         })
//       } catch (err) {
//         console.error('Upload failed:', err)
//       }
//     }

//     setImageUrls((prev) => [...prev, ...uploadedUrls])
//     setUploading(false)
//   }

//   const removeImage = async (index: number) => {
//     const { public_id } = imageUrls[index]

//     try {
//       await fetch('/api/delete-image', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ public_id }),
//       })
//     } catch (err) {
//       console.error('Failed to delete image from Cloudinary:', err)
//     }

//     setImageUrls((prev) => prev.filter((_, i) => i !== index))
//   }

//   return (
//     <form
//       action={productCreate}
//       className='space-y-6 p-6 max-w-3xl mx-auto border-2 rounded-2xl mt-10'
//     >
//       <h1 className='text-3xl font-medium text-amber-600'>Create Product</h1>
//       <hr />

//       {/* Name */}
//       <div className='space-y-2'>
//         <Label htmlFor='name'>Name</Label>
//         <Input type='text' id='name' name='name' required minLength={3} />
//       </div>

//       {/* Brand & Category */}
//       <div className='flex flex-col sm:flex-row justify-between gap-4'>
//         <div className='space-y-2 flex-1'>
//           <Label htmlFor='brand'>Brand</Label>
//           <Select name='brand' required>
//             <SelectTrigger>
//               <SelectValue placeholder='Select brand' />
//             </SelectTrigger>
//             <SelectContent>
//               {['HP', 'Dell', 'Lenovo', 'Apple', 'Asus', 'Acer'].map((b) => (
//                 <SelectItem key={b} value={b}>
//                   {b}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className='space-y-2 flex-1'>
//           <Label htmlFor='category'>Category</Label>
//           <Select name='category' required>
//             <SelectTrigger>
//               <SelectValue placeholder='Select category' />
//             </SelectTrigger>
//             <SelectContent>
//               {[
//                 'laptops',
//                 'printers',
//                 'monitors',
//                 'accessories',
//                 'pc',
//                 'softwares',
//               ].map((c) => (
//                 <SelectItem key={c} value={c}>
//                   {c.charAt(0).toUpperCase() + c.slice(1)}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Description */}
//       <div className='space-y-2'>
//         <Label htmlFor='description'>Description</Label>
//         <Input
//           type='text'
//           id='description'
//           name='description'
//           required
//           minLength={10}
//         />
//       </div>
//       {/* Image Upload */}

//       <div className='space-y-2'>
//         <Label htmlFor='images'>
//           <div className='bg-primary w-40 p-3 rounded-xl text-white items-center justify-items-center'>
//             <p>Upload Product</p>
//           </div>
//         </Label>
//         <Input
//           type='file'
//           id='images'
//           accept='image/*'
//           multiple
//           onChange={handleMultipleImageUpload}
//           hidden
//         />
//         {uploading && (
//           <div className='text-sm text-blue-500'>
//             Uploading {progress.filter((p) => p === 100).length}/
//             {progress.length} images...
//           </div>
//         )}
//         <div className='flex flex-wrap gap-2 mt-4'>
//           {imageUrls.map((img, i) => (
//             <div
//               key={i}
//               className='w-24 h-24 relative border rounded overflow-hidden'
//             >
//               <Image
//                 src={img.url}
//                 alt={Image ${i}}
//                 fill
//                 style={{ objectFit: 'cover' }}
//               />
//               <button
//                 type='button'
//                 className='absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs z-10'
//                 onClick={() => removeImage(i)}
//               >
//                 ✕
//               </button>
//               <input type='hidden' name='imageUrls[]' value={img.url} />
//               <input type='hidden' name='publicIds[]' value={img.public_id} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price & Stock */}
//       <div className='flex flex-col sm:flex-row justify-between gap-4'>
//         <div className='space-y-2 flex-1'>
//           <Label htmlFor='price'>Price</Label>
//           <Input type='number' id='price' name='price' required min={0} />
//         </div>
//         <div className='space-y-2 flex-1'>
//           <Label htmlFor='stock'>Stock</Label>
//           <Input type='number' id='stock' name='stock' required min={0} />
//         </div>
//       </div>

//       <Button
//         type='submit'
//         className='w-full'
//         disabled={uploading || imageUrls.length === 0}
//       >
//         {uploading ? 'Uploading...' : 'Create Product'}
//       </Button>
//     </form>
//   )
// }
// ChatGPT said:
// To remove the background of an image before uploading to Cloudinary, you need to use Cloudinary’s Upload API with the background_removal parameter**. However, this requires that:

// You enable background removal in your Cloudinary account (usually via an add-on like remove.bg or Cloudinary AI).

// You pass the right parameters during upload — but you cannot use background removal via unsigned (unauthenticated) uploads.

// 🔐 Important:
// Background removal requires authenticated (signed) uploads, which means you'll need to route the upload through your server-side API, not directly from the browser.

// ✅ Recommended Workflow:
// Client: Send the image to your backend API.

// Server:

// Use your Cloudinary credentials.

// Sign the upload request.

// Add the parameter:

// background_removal: 'cloudinary_ai' // or 'remove_the_background'
// Upload using the Cloudinary Node SDK or REST API.

// Return the transformed image URL to the client.

// ✅ Example Server-Side (Node.js using Cloudinary SDK):
// import cloudinary from 'cloudinary'

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export async function POST(req: Request) {
//   const formData = await req.formData()
//   const file = formData.get('file') as Blob

//   const buffer = Buffer.from(await file.arrayBuffer())

//   try {
//     const result = await cloudinary.v2.uploader.upload_stream(
//       {
//         folder: 'products',
//         background_removal: 'cloudinary_ai',
//       },
//       (error, result) => {
//         if (error) throw error
//         return result
//       }
//     )

//     return Response.json({ url: result.secure_url, public_id: result.public_id })
//   } catch (err) {
//     return new Response('Upload failed', { status: 500 })
//   }
// }
// 🔄 Client-Side Code Update
// Replace your upload URL with /api/upload-image or similar, and POST the image there.

// 💡 Alternative (If You Need to Keep Unsigned Uploads):
// You’d need to first upload normally, then trigger background removal using a Cloudinary Transformation on the image afterwards — but again, this usually still needs an authenticated call or prior image processing setup.

// Would you like help implementing the server-side upload API route using Next.js (API route or app/api handler)?

// You said:
// yes
// ChatGPT said:
// Great! Here's how you can set up a server-side Cloudinary upload API route with background removal using Next.js App Router (app/api/upload-image/route.ts).

// ✅ Step 1: Install Cloudinary SDK
// Run this in your terminal:

// npm install cloudinary
// ✅ Step 2: Create the API route
// File: app/api/upload-image/route.ts

// import { NextResponse } from 'next/server'
// import { v2 as cloudinary } from 'cloudinary'

// // Required to parse incoming form data
// import { IncomingForm } from 'formidable'
// import fs from 'fs'
// import path from 'path'
// import { promisify } from 'util'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// })

// const parseForm = async (req: Request): Promise<{ file: any }> => {
//   const form = new IncomingForm({ uploadDir: '/tmp', keepExtensions: true })

//   const reqClone = req.clone()
//   const buffer = await reqClone.arrayBuffer()
//   const tempFilePath = path.join('/tmp', `upload-${Date.now()}.jpg`)
//   fs.writeFileSync(tempFilePath, Buffer.from(buffer))

//   return { file: tempFilePath }
// }

// export async function POST(req: Request) {
//   try {
//     const { file } = await parseForm(req)

//     const result = await cloudinary.uploader.upload(file, {
//       folder: 'products',
//       background_removal: 'cloudinary_ai', // or 'remove_the_background' (if using remove.bg)
//     })

//     fs.unlinkSync(file) // remove temp file

//     return NextResponse.json({
//       url: result.secure_url,
//       public_id: result.public_id,
//     })
//   } catch (err) {
//     console.error('Cloudinary upload error:', err)
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
//   }
// }
// ✅ Step 3: Update .env.local
// CLOUDINARY_CLOUD_NAME=your_cloud_name
// CLOUDINARY_API_KEY=your_api_key
// CLOUDINARY_API_SECRET=your_api_secret
// ✅ Step 4: Update Client Code to Use /api/upload-image
// Change the image upload section in your React component (CreateProduct.tsx) like this:

// const formData = new FormData()
// formData.append('file', files[i])

// const res = await fetch('/api/upload-image', {
//   method: 'POST',
//   body: formData,
// })
// Let me know if you want me to help you handle progress indication or add error feedback for users!

// You said:
// why is the image not appearing : <Card key={idx} className='border border-gray-200'>
//               <div className=' h-32 mb-4 p-0.5 border-2'>
//                 <Image src='/images/audio.jpg' alt='Product' fill />
//               </div>
//               <CardContent className='p-2'>
//                 <p className='text-sm mb-2'>Hp elitebook 840 g5</p>
//                 <p className='text-yellow-500 font-bold text-lg'>$199.99</p>
//               </CardContent>
//             </Card>
// ChatGPT said:
// The image is not appearing because of one or more of the following issues in your JSX:

// ❌ Likely Mistake:
// You're using fill on the <Image> component but not setting position: relative and height/width on its container.

// When using fill with Next.js <Image>, you must set the container to relative and give it a specific height and width. Without this, the image won't render.

// ✅ Fix:
// Update your code like this:

// <Card key={idx} className='border border-gray-200'>
//   <div className='relative h-32 w-full mb-4 p-0.5 border-2'>
//     <Image
//       src='/images/audio.jpg'
//       alt='Product'
//       fill
//       className='object-cover' // optional for better scaling
//     />
//   </div>
//   <CardContent className='p-2'>
//     <p className='text-sm mb-2'>Hp elitebook 840 g5</p>
//     <p className='text-yellow-500 font-bold text-lg'>$199.99</p>
//   </CardContent>
// </Card>
// ✅ Notes:
// relative is required on the container so that Image fill knows what to fill.

// object-cover is recommended for a clean image fit.

// Make sure /public/images/audio.jpg exists in your project directory. The public folder is the base path for static assets.

// Let me know if you'd like to show the image from a dynamic Cloudinary URL instead!

// You said:
// what is the best approach of adding product to cart that would cater for both logged in and logged out users
// ChatGPT said:
// To support adding products to a cart for both logged-in and logged-out users, you need a hybrid cart system that works client-side and server-side. Here’s a clear breakdown of the best approach:

// ✅ Best Approach: Hybrid Cart System
// 1. 🔒 Logged-in Users
// Cart stored in the database (e.g., MongoDB, PostgreSQL).

// Cart is tied to the user’s ID.

// CRUD operations are handled via authenticated API calls.

// Cart persists across devices.

// 2. 🔓 Logged-out Users (Guest)
// Cart stored in localStorage or cookies.

// Only available on the client’s device.

// Cart is temporary but can be saved if the user logs in later.

// 🔁 Flow for Seamless Experience
// A. When a Guest Adds to Cart:
// // Store cart in localStorage
// localStorage.setItem('cart', JSON.stringify(cartItems))
// B. When a Logged-in User Adds to Cart:
// Use an API endpoint:

// await fetch('/api/cart', {
//   method: 'POST',
//   headers: { Authorization: `Bearer ${token}` },
//   body: JSON.stringify({ productId, quantity })
// })
// C. 🔄 On Login:
// If a local cart exists:

// Merge guest cart with server cart.

// Send merged cart to the backend.

// Clear localStorage.

// // Example (on login)
// const guestCart = JSON.parse(localStorage.getItem('cart') || '[]')
// await fetch('/api/cart/merge', {
//   method: 'POST',
//   headers: { Authorization: `Bearer ${token}` },
//   body: JSON.stringify(guestCart),
// })
// localStorage.removeItem('cart')
// 🧠 Benefits of This Strategy
// Feature	Guest Users	Logged-in Users
// Persistent Cart	❌ Local only	✅ In database
// Multi-device Support	❌	✅
// Guest Checkout (optional)	✅	✅
// Cart Recovery on Login	✅ (via merge)	✅
// 🔐 Bonus: Cart Schema Example (Server)
// // Cart model (simplified)
// {
//   userId: ObjectId,
//   items: [
//     {
//       productId: ObjectId,
//       quantity: Number,
//       addedAt: Date
//     }
//   ]
// }
// 💡 Tips
// Always keep cart items in a consistent format (e.g., { productId, quantity }) for easy merging.

// Sync cart UI between localStorage and database after login/logout.

// Consider encrypting or signing guest cart data if stored in cookies.

// Let me know if you'd like a working code snippet for the localStorage cart, API merge logic, or database schema!

// You said:
// can i manage the localStorage cart using zustand instead
// ChatGPT said:
// Yes, using Zustand to manage the localStorage-based cart is an excellent choice! It gives you:

// ✅ Centralized state
// ✅ React reactivity
// ✅ Persistence with localStorage
// ✅ Easy to migrate to a server/cart hybrid later

// ✅ Here's How to Do It with Zustand
// 1. Install Zustand (if not already)
// npm install zustand
// 2. Create a Cart Store
// // stores/useCartStore.ts
// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// type CartItem = {
//   productId: string
//   name: string
//   price: number
//   image: string
//   quantity: number
// }

// type CartState = {
//   items: CartItem[]
//   addItem: (item: CartItem) => void
//   removeItem: (productId: string) => void
//   updateQuantity: (productId: string, quantity: number) => void
//   clearCart: () => void
// }

// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (item) => {
//         const existing = get().items.find((i) => i.productId === item.productId)
//         if (existing) {
//           set({
//             items: get().items.map((i) =>
//               i.productId === item.productId
//                 ? { ...i, quantity: i.quantity + item.quantity }
//                 : i
//             ),
//           })
//         } else {
//           set({ items: [...get().items, item] })
//         }
//       },
//       removeItem: (productId) =>
//         set({ items: get().items.filter((i) => i.productId !== productId) }),
//       updateQuantity: (productId, quantity) =>
//         set({
//           items: get().items.map((i) =>
//             i.productId === productId ? { ...i, quantity } : i
//           ),
//         }),
//       clearCart: () => set({ items: [] }),
//     }),
//     {
//       name: 'cart-storage', // localStorage key
//     }
//   )
// )
// 3. Using the Store in Components
// import { useCartStore } from '@/stores/useCartStore'

// export default function ProductCard({ product }) {
//   const addItem = useCartStore((state) => state.addItem)

//   const handleAddToCart = () => {
//     addItem({
//       productId: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity: 1,
//     })
//   }

//   return (
//     <button onClick={handleAddToCart} className='bg-amber-600 text-white p-2'>
//       Add to Cart
//     </button>
//   )
// }
// 4. Sync to Server After Login (Optional)
// If the user logs in:

// Call your /api/cart/merge endpoint using useCartStore.getState().items.

// After successful sync: useCartStore.getState().clearCart().

// ✅ Advantages of Using Zustand for Cart
// Feature	Zustand + localStorage
// React state support	✅
// Persist to localStorage	✅ (via middleware)
// SSR/Next.js compatible	✅
// Easy to sync to backend	✅
// Let me know if you want a companion backend route for merging the cart on login or integrating it with a full checkout flow!

// You said:
// yes
// ChatGPT said:
// Great! Here's how to build a companion backend route in Next.js to merge the guest cart (from Zustand/localStorage) into the server-side cart when a user logs in.

// 🔧 Backend Cart Merge Route
// ✅ 1. API Route: /api/cart/merge
// File: app/api/cart/merge/route.ts (if you're using App Router)

// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { db } from '@/lib/db' // your DB client (e.g., Prisma)
// import { CartItem } from '@prisma/client' // or your custom schema

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions)
//   if (!session?.user?.email) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const userEmail = session.user.email
//   const { items }: { items: CartItem[] } = await req.json()

//   try {
//     const user = await db.user.findUnique({
//       where: { email: userEmail },
//       include: { cart: true },
//     })

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     const existingCartItems = user.cart || []

//     // Merge logic: Add or update
//     const mergedItems = [...existingCartItems]

//     for (const guestItem of items) {
//       const existing = mergedItems.find(
//         (i) => i.productId === guestItem.productId
//       )
//       if (existing) {
//         existing.quantity += guestItem.quantity
//       } else {
//         mergedItems.push({ ...guestItem, userId: user.id })
//       }
//     }

//     // Clear and update the cart
//     await db.cart.deleteMany({ where: { userId: user.id } })
//     await db.cart.createMany({ data: mergedItems })

//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error('Merge failed:', err)
//     return NextResponse.json({ error: 'Failed to merge cart' }, { status: 500 })
//   }
// }
// 🧠 When to Call This API?
// In your login handler (or right after login), merge the local cart like this:

// import { useCartStore } from '@/stores/useCartStore'

// const syncCartAfterLogin = async () => {
//   const cartItems = useCartStore.getState().items
//   if (!cartItems.length) return

//   try {
//     await fetch('/api/cart/merge', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ items: cartItems }),
//     })

//     useCartStore.getState().clearCart()
//   } catch (err) {
//     console.error('Failed to sync cart:', err)
//   }
// }
// You can call syncCartAfterLogin():

// Immediately after successful login

// Or in useEffect when session is available

// 🧱 Prisma Schema Example (Optional)
// model CartItem {
//   id        String   @id @default(cuid())
//   user      User     @relation(fields: [userId], references: [id])
//   userId    String
//   productId String
//   quantity  Int
// }
// Let me know if:

// You want to support anonymous checkout

// You want a version using MongoDB/Mongoose

// You need help wiring this into the NextAuth login flow

// I'm happy to help!

// You said:
// a version using MongoDB/Mongoose
// ChatGPT said:
// Here's how to build the cart merge backend route using MongoDB and Mongoose in your Next.js app. This will allow you to merge the guest cart from Zustand/localStorage into a user-specific MongoDB cart after login.

// 🧱 1. Mongoose Cart Schema Example
// models/CartItem.ts
// import mongoose, { Schema, models } from 'mongoose'

// const CartItemSchema = new Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   productId: { type: String, required: true },
//   name: String,
//   image: String,
//   price: Number,
//   quantity: { type: Number, default: 1 },
// })

// export const CartItem = models.CartItem || mongoose.model('CartItem', CartItemSchema)
// 🔧 2. Merge API Route
// File: app/api/cart/merge/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { connectToDB } from '@/lib/db'
// import { CartItem } from '@/models/CartItem'
// import { User } from '@/models/User' // only if needed

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions)
//   if (!session?.user?.email) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const userEmail = session.user.email
//   const { items } = await req.json()

//   try {
//     await connectToDB()

//     // Get user ID
//     const user = await User.findOne({ email: userEmail })
//     if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

//     const userId = user._id

//     // Loop through each guest cart item and upsert into DB
//     for (const item of items) {
//       await CartItem.findOneAndUpdate(
//         { userId, productId: item.productId },
//         {
//           $setOnInsert: {
//             name: item.name,
//             image: item.image,
//             price: item.price,
//           },
//           $inc: { quantity: item.quantity },
//         },
//         { upsert: true, new: true }
//       )
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error('Cart merge failed:', error)
//     return NextResponse.json({ error: 'Merge failed' }, { status: 500 })
//   }
// }
// 🔌 3. Connect to MongoDB
// lib/db.ts
// import mongoose from 'mongoose'

// let isConnected = false

// export async function connectToDB() {
//   if (isConnected) return

//   try {
//     await mongoose.connect(process.env.MONGODB_URI!, {
//       dbName: 'your-db-name',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as any)
//     isConnected = true
//     console.log('MongoDB connected')
//   } catch (error) {
//     console.error('MongoDB connection error:', error)
//   }
// }
// ✅ 4. Call Merge After Login (Client Side)
// import { useCartStore } from '@/stores/useCartStore'

// const syncCartAfterLogin = async () => {
//   const cartItems = useCartStore.getState().items
//   if (!cartItems.length) return

//   try {
//     await fetch('/api/cart/merge', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ items: cartItems }),
//     })

//     useCartStore.getState().clearCart()
//   } catch (err) {
//     console.error('Failed to sync cart:', err)
//   }
// }
// You can trigger this inside a useEffect once the user is authenticated via NextAuth:

// useEffect(() => {
//   if (session?.user) {
//     syncCartAfterLogin()
//   }
// }, [session?.user])
// 🧠 Summary
// Part	Purpose
// Zustand Store	Manages cart client-side
// MongoDB	Persists cart server-side per user
// Merge API	Unifies guest + user cart on login
// useEffect hook	Triggers sync after login
// Let me know if you’d like the checkout logic, middleware protection, or help making this work with guest checkout!

// You said:
// i would like checkout logic
// ChatGPT said:
// Updated saved memory
// Great! Here's how to implement checkout logic using Zustand for local cart state and MongoDB/Mongoose for logged-in users in a Next.js app.

// 🧱 1. Data Structure Assumption
// Each CartItem might look like this:

// type CartItem = {
//   productId: string
//   name: string
//   price: number
//   quantity: number
//   image: string
// }
// 🛒 2. Zustand Cart Store (if not already)
// // stores/useCartStore.ts
// import { create } from 'zustand'

// type CartItem = {
//   productId: string
//   name: string
//   price: number
//   quantity: number
//   image: string
// }

// interface CartStore {
//   items: CartItem[]
//   addToCart: (item: CartItem) => void
//   removeFromCart: (productId: string) => void
//   clearCart: () => void
// }

// export const useCartStore = create<CartStore>((set) => ({
//   items: [],
//   addToCart: (item) =>
//     set((state) => {
//       const existing = state.items.find((i) => i.productId === item.productId)
//       if (existing) {
//         return {
//           items: state.items.map((i) =>
//             i.productId === item.productId
//               ? { ...i, quantity: i.quantity + item.quantity }
//               : i
//           ),
//         }
//       }
//       return { items: [...state.items, item] }
//     }),
//   removeFromCart: (productId) =>
//     set((state) => ({
//       items: state.items.filter((item) => item.productId !== productId),
//     })),
//   clearCart: () => set({ items: [] }),
// }))
// 🧾 3. Checkout Flow – Frontend
// Example Submit Handler (Guest + Authenticated)
// const handleCheckout = async () => {
//   const cartItems = useCartStore.getState().items

//   const res = await fetch('/api/checkout', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ cart: cartItems }),
//   })

//   const data = await res.json()

//   if (res.ok) {
//     // Redirect to success page or payment provider
//     router.push(`/checkout/success?orderId=${data.orderId}`)
//     useCartStore.getState().clearCart()
//   } else {
//     alert('Checkout failed: ' + data.error)
//   }
// }
// 🧑‍🍳 4. Backend Checkout Route (/api/checkout)
// File: app/api/checkout/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { connectToDB } from '@/lib/db'
// import { Order } from '@/models/Order'

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions)
//   const userId = session?.user?.id ?? null

//   const { cart } = await req.json()
//   if (!cart || cart.length === 0) {
//     return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
//   }

//   try {
//     await connectToDB()

//     // Create a new order
//     const newOrder = new Order({
//       userId,
//       items: cart,
//       total: cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
//       status: 'pending',
//     })

//     await newOrder.save()

//     return NextResponse.json({ success: true, orderId: newOrder._id })
//   } catch (err) {
//     console.error('Checkout failed:', err)
//     return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
//   }
// }
// 📦 5. Mongoose Order Model
// models/Order.ts
// import mongoose, { Schema, models } from 'mongoose'

// const OrderSchema = new Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
//     items: [
//       {
//         productId: String,
//         name: String,
//         price: Number,
//         quantity: Number,
//         image: String,
//       },
//     ],
//     total: Number,
//     status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' },
//   },
//   { timestamps: true }
// )

// export const Order = models.Order || mongoose.model('Order', OrderSchema)
// ✅ Optional Enhancements
// Feature	How to Add
// Stripe/PayPal	Create checkout session in /api/checkout, redirect client
// Guest Checkout	Use userId: null and optionally request guest email
// Order Confirmation	Redirect to /checkout/success and show order summary
// Email Confirmation	Use Nodemailer or Resend to send order receipt
// Let me know if you want help with:

// Integrating Stripe payments

// Sending order emails

// Creating an admin order dashboard

// I can guide you through any of those next!

// You said:
// Sending order emails

// Creating an admin order dashboard
// ChatGPT said:
// Updated saved memory
// Perfect — here’s a breakdown to send order emails and build an admin order dashboard in your Next.js + MongoDB app:

// 📧 Sending Order Emails
// We'll use Resend (or Nodemailer) to send confirmation emails.

// 🔌 1. Install Resend SDK
// npm install resend
// 📦 2. Setup Resend API
// lib/email.ts
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendOrderConfirmation = async ({
//   to,
//   orderId,
//   items,
//   total,
// }: {
//   to: string
//   orderId: string
//   items: any[]
//   total: number
// }) => {
//   const html = `
//     <h2>Order Confirmation</h2>
//     <p>Order ID: ${orderId}</p>
//     <ul>
//       ${items
//         .map(
//           (item) =>
//             `<li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>`
//         )
//         .join('')}
//     </ul>
//     <p><strong>Total:</strong> $${total}</p>
//   `

//   return resend.emails.send({
//     from: 'orders@yourdomain.com',
//     to,
//     subject: 'Your Order Confirmation',
//     html,
//   })
// }
// 📮 3. Send Email in Checkout API
// Update /api/checkout/route.ts:

// import { sendOrderConfirmation } from '@/lib/email'

// // after saving order
// if (session?.user?.email) {
//   await sendOrderConfirmation({
//     to: session.user.email,
//     orderId: newOrder._id.toString(),
//     items: cart,
//     total: newOrder.total,
//   })
// }
// ✅ Alternatively, for guests, you can collect guestEmail in the frontend and include it in the POST body.

// 🧑‍💼 Admin Order Dashboard
// 🧱 1. API Route to Fetch Orders
// app/api/admin/orders/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { connectToDB } from '@/lib/db'
// import { Order } from '@/models/Order'
// import { User } from '@/models/User'

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions)
//   if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const adminEmails = ['admin@example.com'] // add yours here
//   if (!adminEmails.includes(session.user.email)) {
//     return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
//   }

//   await connectToDB()
//   const orders = await Order.find({}).sort({ createdAt: -1 })

//   return NextResponse.json(orders)
// }
// 🖼️ 2. Admin Dashboard UI
// app/admin/orders/page.tsx
// 'use client'
// import { useEffect, useState } from 'react'

// type Order = {
//   _id: string
//   items: any[]
//   total: number
//   status: string
//   createdAt: string
// }

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([])

//   useEffect(() => {
//     fetch('/api/admin/orders')
//       .then((res) => res.json())
//       .then(setOrders)
//   }, [])

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Admin Order Dashboard</h1>
//       {orders.map((order) => (
//         <div key={order._id} className="border p-4 mb-4 rounded">
//           <p className="font-semibold">Order #{order._id}</p>
//           <p>Status: {order.status}</p>
//           <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
//           <ul className="ml-4 mt-2 list-disc">
//             {order.items.map((item, idx) => (
//               <li key={idx}>
//                 {item.name} x {item.quantity} - ${item.price}
//               </li>
//             ))}
//           </ul>
//           <p className="mt-2 font-semibold">Total: ${order.total}</p>
//         </div>
//       ))}
//     </div>
//   )
// }
// ✅ Final Tips
// Make sure /admin/orders is auth protected — either with middleware or conditionally rendering based on session user.

// For better emails, use Resend + React templates or HTML builders like MJML.

// Optionally send "new order" notifications to admin email too.

// Would you like me to add:

// Order status update UI in the admin dashboard?

// Guest email support?

// Stripe/PayPal payment integration?

// Let me know which you want to tackle next.

// You said:
// Order status update UI in the admin dashboard?
// ChatGPT said:
// Great — let’s add order status update functionality to the Admin Dashboard so you can mark orders as Pending, Processing, Shipped, etc.

// ✅ Step-by-Step: Order Status Update in Admin Dashboard
// 1. 🧠 Update Order Model (if not already)
// Make sure your Order schema includes a status field:

// status: {
//   type: String,
//   enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
//   default: 'Pending',
// }
// 2. 🔧 API Route to Update Order Status
// Create a new route:

// app/api/admin/orders/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { connectToDB } from '@/lib/db'
// import { Order } from '@/models/Order'

// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   const session = await getServerSession(authOptions)
//   if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const adminEmails = ['admin@example.com']
//   if (!adminEmails.includes(session.user.email)) {
//     return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
//   }

//   const { status } = await req.json()
//   if (!status) return NextResponse.json({ error: 'Missing status' }, { status: 400 })

//   await connectToDB()
//   const order = await Order.findByIdAndUpdate(
//     params.id,
//     { status },
//     { new: true }
//   )

//   return NextResponse.json(order)
// }
// 3. 🖼️ Update Admin Dashboard UI
// Modify app/admin/orders/page.tsx:

// 'use client'
// import { useEffect, useState } from 'react'

// type Order = {
//   _id: string
//   items: any[]
//   total: number
//   status: string
//   createdAt: string
// }

// const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([])

//   useEffect(() => {
//     fetch('/api/admin/orders')
//       .then((res) => res.json())
//       .then(setOrders)
//   }, [])

//   const updateStatus = async (orderId: string, newStatus: string) => {
//     await fetch(`/api/admin/orders/${orderId}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus }),
//     })
//     setOrders((prev) =>
//       prev.map((o) =>
//         o._id === orderId ? { ...o, status: newStatus } : o
//       )
//     )
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Admin Order Dashboard</h1>
//       {orders.map((order) => (
//         <div key={order._id} className="border p-4 mb-4 rounded">
//           <p className="font-semibold">Order #{order._id}</p>
//           <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
//           <ul className="ml-4 mt-2 list-disc">
//             {order.items.map((item, idx) => (
//               <li key={idx}>
//                 {item.name} x {item.quantity} - ${item.price}
//               </li>
//             ))}
//           </ul>
//           <p className="mt-2 font-semibold">Total: ${order.total}</p>
//           <div className="mt-2">
//             <label className="font-medium mr-2">Status:</label>
//             <select
//               value={order.status}
//               onChange={(e) => updateStatus(order._id, e.target.value)}
//               className="border rounded px-2 py-1"
//             >
//               {statuses.map((status) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
// ✅ Optional Enhancements
// Add toast notifications after update (e.g., using react-hot-toast).

// Add a filter by status dropdown at the top.

// Add pagination if you expect many orders.

// Would you like me to help with:

// Adding real-time updates with Pusher or Socket.io?

// Admin auth middleware for route protection?

// Exporting orders to CSV or Excel?

// Let me know what to build next!

// You said:
// Adding real-time updates with Pusher or Socket.io?
// ChatGPT said:
// Great — let’s add real-time order updates with Pusher, so the admin dashboard updates instantly when:

// a new order is created

// or an order’s status is changed

// This keeps the dashboard live without needing a page refresh.

// ✅ Recommended Real-time Setup: Pusher + Server Actions
// Pusher is simpler and more frontend-friendly than Socket.io in most Next.js apps, especially with SSR and API routes.

// 🔧 1. Install Pusher packages
// npm install @pusher/push-notifications-server pusher-js
// 🔐 2. Add your Pusher credentials to .env.local
// PUSHER_APP_ID=your_app_id
// PUSHER_KEY=your_key
// PUSHER_SECRET=your_secret
// PUSHER_CLUSTER=your_cluster
// NEXT_PUBLIC_PUSHER_KEY=your_key
// NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster
// 📦 3. Setup Pusher Server
// lib/pusher-server.ts
// import Pusher from 'pusher'

// export const pusherServer = new Pusher({
//   appId: process.env.PUSHER_APP_ID!,
//   key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
//   secret: process.env.PUSHER_SECRET!,
//   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
//   useTLS: true,
// })
// 💻 4. Setup Pusher Client
// lib/pusher-client.ts
// import Pusher from 'pusher-js'

// export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
//   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
// })
// 📤 5. Trigger Pusher Events
// In your checkout or order creation API:
// import { pusherServer } from '@/lib/pusher-server'

// // After saving order to DB:
// await pusherServer.trigger('orders', 'new-order', {
//   orderId: newOrder._id,
//   items: newOrder.items,
//   status: newOrder.status,
//   createdAt: newOrder.createdAt,
// })
// In order status update API:
// await pusherServer.trigger('orders', 'status-update', {
//   orderId: order._id,
//   newStatus: order.status,
// })
// 🧑‍💼 6. Listen in Admin Dashboard
// Update app/admin/orders/page.tsx:

// 'use client'
// import { useEffect, useState } from 'react'
// import { pusherClient } from '@/lib/pusher-client'

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([])

//   useEffect(() => {
//     fetch('/api/admin/orders')
//       .then((res) => res.json())
//       .then(setOrders)

//     pusherClient.subscribe('orders')

//     pusherClient.bind('new-order', (data: Order) => {
//       setOrders((prev) => [data, ...prev])
//     })

//     pusherClient.bind('status-update', (data: { orderId: string; newStatus: string }) => {
//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === data.orderId
//             ? { ...order, status: data.newStatus }
//             : order
//         )
//       )
//     })

//     return () => {
//       pusherClient.unsubscribe('orders')
//     }
//   }, [])

//   // ...rest of dashboard JSX
// }
// 🔁 Real-time Events Summary
// Event	Triggered When	Data Sent
// new-order	Order is created	Order info
// status-update	Admin updates order status	{ orderId, newStatus }
// ✅ Done! You Now Have Real-time Orders 🎉
// Optional Upgrades:
// Add a toast notification (react-hot-toast) for new orders.

// Add sound effects (ping!) for new orders.

// Use zustand or SWR for shared state/live data.

// Would you like help with:

// Adding toast notifications for new orders?

// Protecting Pusher with user roles?

// Using Socket.io instead?

// Let me know and I’ll guide you through it.

// You said:
// Add sound effects (ping!) for new orders.
// ChatGPT said:
// Awesome! Let’s add a ping sound whenever a new order arrives in your Admin Dashboard. This gives admins an instant audio cue for incoming sales.

// 🔉 Step-by-Step: Add Ping Sound on New Orders
// ✅ 1. Add a Ping Audio File
// Use a short MP3 or WAV file (1 second or less). You can find free sounds on freesound.org or use this basic example:

// public/sounds/ping.mp3
// Put your file inside the public/sounds/ directory so you can reference it directly via URL.

// 🎧 2. Play the Sound When New Order Arrives
// Update the AdminOrdersPage to include audio playback:

// app/admin/orders/page.tsx
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { pusherClient } from '@/lib/pusher-client'

// type Order = {
//   _id: string
//   items: any[]
//   total: number
//   status: string
//   createdAt: string
// }

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const audioRef = useRef<HTMLAudioElement | null>(null)

//   useEffect(() => {
//     // Load initial orders
//     fetch('/api/admin/orders')
//       .then((res) => res.json())
//       .then(setOrders)

//     // Subscribe to Pusher
//     pusherClient.subscribe('orders')

//     // New order event
//     pusherClient.bind('new-order', (data: Order) => {
//       setOrders((prev) => [data, ...prev])
//       if (audioRef.current) audioRef.current.play().catch(console.warn)
//     })

//     // Order status updated
//     pusherClient.bind('status-update', (data: { orderId: string; newStatus: string }) => {
//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === data.orderId ? { ...order, status: data.newStatus } : order
//         )
//       )
//     })

//     return () => {
//       pusherClient.unsubscribe('orders')
//     }
//   }, [])

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Admin Order Dashboard</h1>

//       {/* Hidden audio element */}
//       <audio ref={audioRef} src="/sounds/ping.mp3" preload="auto" />

//       {orders.map((order) => (
//         <div key={order._id} className="border p-4 mb-4 rounded">
//           <p className="font-semibold">Order #{order._id}</p>
//           <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
//           <ul className="ml-4 mt-2 list-disc">
//             {order.items.map((item, idx) => (
//               <li key={idx}>
//                 {item.name} x {item.quantity} - ${item.price}
//               </li>
//             ))}
//           </ul>
//           <p className="mt-2 font-semibold">Total: ${order.total}</p>
//           <p className="mt-2">Status: <strong>{order.status}</strong></p>
//         </div>
//       ))}
//     </div>
//   )
// }
// ✅ 3. Browser Notes
// Autoplay policies block sound unless there’s user interaction.

// You can:

// prompt admins to click once to “enable notifications”

// or wait for any click to audioRef.current?.play() once (e.g., after first click).

// 🔄 Optional: Use Notification API
// Combine audio with browser push notifications for even better alerts. I can help add that too.

// Would you like to:

// Show a browser toast/notification alongside the ping?

// Load the sound dynamically only when needed?

// Customize the sound based on order type or value?

// Let me know!

// You said:
// now provide a full implementation from adding products to cart for both logged in and logged users to checkout to orders and to admin receiving the notification and updating status of the order. Use zustand, next js, socket io, mongodb and mongoose
// ChatGPT said:
// Updated saved memory
// Great — here’s a complete end-to-end e-commerce implementation using:

// Next.js (App Router)

// Zustand (for cart state incl. localStorage persistence)

// MongoDB + Mongoose (for product & order data)

// Socket.IO (for real-time order updates to admin)

// 🧱 System Breakdown
// ✅ 1. Cart Flow
// Guest or logged-in users add items to cart (Zustand + localStorage).

// If logged in, cart is synced on the backend (optional).

// ✅ 2. Checkout Flow
// Sends cart data to backend (via API route).

// Creates an order document in MongoDB.

// ✅ 3. Admin Dashboard
// Admin sees orders.

// Real-time updates via Socket.IO when:

// a new order is placed

// order status changes

// 🔧 Code Structure
// 📁 /lib
// db.ts → Mongoose setup

// models/Product.ts, models/Order.ts

// socket.ts → Socket.IO server

// 📁 /store
// cartStore.ts → Zustand store with localStorage

// 📁 /app/api
// checkout/route.ts → Creates order

// orders/update-status/route.ts → Updates order status

// socket → Server socket setup

// ✅ 1. Zustand Cart Store (with localStorage)
// store/cartStore.ts
// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// type CartItem = {
//   productId: string
//   name: string
//   price: number
//   quantity: number
//   image: string
// }

// type CartStore = {
//   items: CartItem[]
//   addItem: (item: CartItem) => void
//   removeItem: (productId: string) => void
//   clearCart: () => void
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (item) => {
//         const existing = get().items.find(i => i.productId === item.productId)
//         if (existing) {
//           set({
//             items: get().items.map(i =>
//               i.productId === item.productId
//                 ? { ...i, quantity: i.quantity + item.quantity }
//                 : i
//             )
//           })
//         } else {
//           set({ items: [...get().items, item] })
//         }
//       },
//       removeItem: (productId) =>
//         set({ items: get().items.filter(i => i.productId !== productId) }),
//       clearCart: () => set({ items: [] })
//     }),
//     { name: 'cart-storage' }
//   )
// )
// ✅ 2. MongoDB & Models
// lib/db.ts
// import mongoose from 'mongoose'

// if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set')

// export const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return
//   await mongoose.connect(process.env.MONGO_URI)
// }
// models/Product.ts
// import mongoose from 'mongoose'

// const ProductSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   image: String,
// })

// export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
// models/Order.ts
// import mongoose from 'mongoose'

// const OrderSchema = new mongoose.Schema({
//   items: [
//     {
//       productId: String,
//       name: String,
//       quantity: Number,
//       price: Number,
//       image: String
//     }
//   ],
//   status: { type: String, default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// })

// export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
// ✅ 3. Checkout API Route
// app/api/checkout/route.ts
// import { connectDB } from '@/lib/db'
// import Order from '@/models/Order'
// import { NextResponse } from 'next/server'
// import { io } from '@/lib/socket'

// export async function POST(req: Request) {
//   await connectDB()
//   const body = await req.json()

//   const order = await Order.create({ items: body.items })

//   // Emit to Socket.IO
//   io.emit('new-order', order)

//   return NextResponse.json({ success: true, orderId: order._id })
// }
// ✅ 4. Admin Order Status Update Route
// app/api/orders/update-status/route.ts
// import { connectDB } from '@/lib/db'
// import Order from '@/models/Order'
// import { io } from '@/lib/socket'
// import { NextResponse } from 'next/server'

// export async function POST(req: Request) {
//   await connectDB()
//   const { orderId, newStatus } = await req.json()

//   const order = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true })

//   io.emit('status-update', { orderId, newStatus })

//   return NextResponse.json({ success: true, order })
// }
// ✅ 5. Socket.IO Server
// lib/socket.ts
// import { Server } from 'socket.io'
// import { NextApiResponse } from 'next'

// const ioHandler = (req: any, res: NextApiResponse) => {
//   if (!res.socket.server.io) {
//     const io = new Server(res.socket.server)
//     res.socket.server.io = io
//   }
//   res.end()
// }

// export const io = globalThis.io || new Server()
// if (!globalThis.io) globalThis.io = io
// ✅ 6. Admin Dashboard Page (Client-side)
// app/admin/orders/page.tsx
// 'use client'
// import { useEffect, useState } from 'react'
// import io from 'socket.io-client'

// const socket = io()

// export default function AdminOrders() {
//   const [orders, setOrders] = useState<any[]>([])

//   useEffect(() => {
//     fetch('/api/admin/orders')
//       .then(res => res.json())
//       .then(setOrders)

//     socket.on('new-order', (order) => {
//       setOrders(prev => [order, ...prev])
//     })

//     socket.on('status-update', ({ orderId, newStatus }) => {
//       setOrders(prev =>
//         prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
//       )
//     })
//   }, [])

//   return (
//     <div>
//       <h1>Admin Orders</h1>
//       {orders.map(order => (
//         <div key={order._id} className="border p-4">
//           <p>Status: {order.status}</p>
//           <button onClick={() => updateStatus(order._id, 'shipped')}>Mark as Shipped</button>
//         </div>
//       ))}
//     </div>
//   )
// }
// 🔔 Bonus: Sound Notification
// Add:

// <audio id="ping" src="/sounds/ping.mp3" preload="auto" />
// Then:

// socket.on('new-order', (order) => {
//   new Audio('/sounds/ping.mp3').play()
//   setOrders(prev => [order, ...prev])
// })
// ✅ You Now Have:
// Zustand cart with localStorage

// Checkout flow to MongoDB

// Real-time admin notifications (via Socket.IO)

// Order status updates & broadcasting

// Would you like:

// User-authenticated checkout (with session/email)?

// Stripe/PayPal integration?

// Email notifications (to admin or users)?

// Let me know and I’ll layer it in.

// You said:
// 'use client'
// import { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'

// import { Trash2, Pencil } from 'lucide-react'
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
// //import { DateTimePicker } from '@/components/ui/date-time-picker'

// import { Input } from '@/components/ui/input'
// import { ProductSearchInput } from '../components/product-search-input'
// import { useFlashSaleStore } from '@/stores/FlashSale'

// export default function FlashSalePage() {
//   const {
//     flashSales,
//     fetchFlashSales,
//     deleteFlashSale,
//     addFlashSale,
//     editFlashSale,
//   } = useFlashSaleStore()
//   const [editing, setEditing] = useState(null)

//   useEffect(() => {
//     fetchFlashSales()
//   }, [])

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Flash Sale Manager</h1>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button>Add Flash Sale</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[600px]">
//           <FlashSaleForm onSubmit={addFlashSale} />
//         </DialogContent>
//       </Dialog>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//         {flashSales.map((item) => (
//           <Card key={item._id}>
//             <CardContent className="p-4">
//               <div className="text-lg font-semibold">{item.productId?.name}</div>
//               <div className="text-sm text-gray-500">{item.discount}% off</div>
//               <div className="text-sm">Ends: {new Date(item.endAt).toLocaleString()}</div>
//               <div className="flex gap-2 mt-2">
//                 <Button variant="secondary" onClick={() => setEditing(item)}><Pencil size={16} /></Button>
//                 <Button variant="destructive" onClick={() => deleteFlashSale(item._id)}><Trash2 size={16} /></Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {editing && (
//         <Dialog open onOpenChange={() => setEditing(null)}>
//           <DialogContent>
//             <FlashSaleForm item={editing} onSubmit={editFlashSale} />
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   )
// }

// function FlashSaleForm({ item, onSubmit }: any) {
//   const [productId, setProductId] = useState(item?.productId || '')
//   const [discount, setDiscount] = useState(item?.discount || 0)
//   const [endAt, setEndAt] = useState(item?.endAt ? new Date(item.endAt) : new Date())

//   const handleSubmit = () => {
//     onSubmit({ ...item, productId, discount, endAt })
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <ProductSearchInput value={productId} onChange={setProductId} />
//       <Input type="number" placeholder="Discount (%)" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
//       <DateTimePicker value={endAt} onChange={setEndAt} />
//       <Button onClick={handleSubmit}>{item ? 'Update' : 'Add'} Flash Sale</Button>
//     </div>
//   )
// }
// ChatGPT said:
// Updated saved memory
// Your Flash Sale Manager setup is looking solid! If you need help integrating it more tightly with product inventory, handling expired sales, or automatically applying flash prices at checkout, I can guide you through that too. Just let me know what’s next on your roadmap.

// You said:
// zustand and api implementation for the page
// ChatGPT said:
// Here’s a full implementation of Zustand and the corresponding API routes for your Flash Sale Manager page using Next.js, Zustand, MongoDB, and Mongoose.

// 🔧 1. Zustand Store (/stores/FlashSale.ts)
// // stores/FlashSale.ts
// import { create } from 'zustand'

// type FlashSale = {
//   _id?: string
//   productId: string
//   discount: number
//   endAt: Date | string
// }

// type FlashSaleStore = {
//   flashSales: FlashSale[]
//   fetchFlashSales: () => Promise<void>
//   addFlashSale: (sale: FlashSale) => Promise<void>
//   editFlashSale: (sale: FlashSale) => Promise<void>
//   deleteFlashSale: (id: string) => Promise<void>
// }

// export const useFlashSaleStore = create<FlashSaleStore>((set) => ({
//   flashSales: [],

//   fetchFlashSales: async () => {
//     const res = await fetch('/api/flash-sales')
//     const data = await res.json()
//     set({ flashSales: data })
//   },

//   addFlashSale: async (sale) => {
//     const res = await fetch('/api/flash-sales', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(sale),
//     })
//     const newSale = await res.json()
//     set((state) => ({
//       flashSales: [...state.flashSales, newSale],
//     }))
//   },

//   editFlashSale: async (sale) => {
//     const res = await fetch(`/api/flash-sales/${sale._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(sale),
//     })
//     const updated = await res.json()
//     set((state) => ({
//       flashSales: state.flashSales.map((s) =>
//         s._id === updated._id ? updated : s
//       ),
//     }))
//   },

//   deleteFlashSale: async (id) => {
//     await fetch(`/api/flash-sales/${id}`, { method: 'DELETE' })
//     set((state) => ({
//       flashSales: state.flashSales.filter((s) => s._id !== id),
//     }))
//   },
// }))
// 🧠 2. Mongoose Flash Sale Model (/models/FlashSale.ts)
// // models/FlashSale.ts
// import mongoose, { Schema, models } from 'mongoose'

// const flashSaleSchema = new Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//     },
//     discount: {
//       type: Number,
//       required: true,
//     },
//     endAt: {
//       type: Date,
//       required: true,
//     },
//   },
//   { timestamps: true }
// )

// export const FlashSale =
//   models.FlashSale || mongoose.model('FlashSale', flashSaleSchema)
// 🌐 3. API Routes (/app/api/flash-sales)
// 🟡 GET and POST: /api/flash-sales/route.ts
// // app/api/flash-sales/route.ts
// import { NextResponse } from 'next/server'
// import { connectDB } from '@/lib/db'
// import { FlashSale } from '@/models/FlashSale'

// export async function GET() {
//   await connectDB()
//   const sales = await FlashSale.find().populate('productId')
//   return NextResponse.json(sales)
// }

// export async function POST(req: Request) {
//   await connectDB()
//   const data = await req.json()
//   const newSale = await FlashSale.create(data)
//   const populated = await FlashSale.findById(newSale._id).populate('productId')
//   return NextResponse.json(populated)
// }
// 🟠 PUT and DELETE: /api/flash-sales/[id]/route.ts
// // app/api/flash-sales/[id]/route.ts
// import { NextResponse } from 'next/server'
// import { connectDB } from '@/lib/db'
// import { FlashSale } from '@/models/FlashSale'

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   await connectDB()
//   const data = await req.json()
//   const updated = await FlashSale.findByIdAndUpdate(params.id, data, {
//     new: true,
//   }).populate('productId')
//   return NextResponse.json(updated)
// }

// export async function DELETE(_: Request, { params }: { params: { id: string } }) {
//   await connectDB()
//   await FlashSale.findByIdAndDelete(params.id)
//   return NextResponse.json({ message: 'Deleted' })
// }
// 🧩 4. MongoDB Connection (/lib/db.ts)
// // lib/db.ts
// import mongoose from 'mongoose'

// export async function connectDB() {
//   if (mongoose.connection.readyState >= 1) return

//   await mongoose.connect(process.env.MONGODB_URI as string, {
//     dbName: 'your_db_name',
//   })
// }
// ✅ Final Notes
// Ensure you have a valid MONGODB_URI in your .env.local.

// Flash sale logic (e.g. checking if it's active, applying discounts) should be handled when retrieving or displaying product prices — that part can be done on the product listing or checkout view.

// Would you like help applying flash sale discounts to product prices at checkout or product pages?

// You said:
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Trash2 } from 'lucide-react'
// import { usePromoStore } from '@/stores/promotion'

// interface Product {
//   _id: string
//   name: string
//   imageUrls: string
//   originalPrice: number
// }

// const formatPrice = (value: number) =>
//   new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value)

// export default function PromoManager() {
//   const { items, fetchPromoItems, addPromoItem, deletePromoItem } = usePromoStore()

//   const [productId, setProductId] = useState('')
//   const [name, setName] = useState('')
//   const [originalPrice, setOriginalPrice] = useState('')
//   const [discountAmount, setDiscountAmount] = useState('')
//   const [discountPercent, setDiscountPercent] = useState('')
//   const [newPrice, setNewPrice] = useState('')
//   const [imageUrls, setImageUrl] = useState('')

//   const [errors, setErrors] = useState<{ [key: string]: string }>({})
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<Product[]>([])
//   const [showDropdown, setShowDropdown] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)

//   const original = parseFloat(originalPrice)

//   useEffect(() => {
//     fetchPromoItems()
//   }, [fetchPromoItems])

//   useEffect(() => {
//     if (searchQuery.length < 2) {
//       setSearchResults([])
//       return
//     }

//     let cancelled = false

//     async function fetchProducts() {
//       try {
//         const res = await fetch(/api/products/search?search=${encodeURIComponent(searchQuery)})
//         if (!res.ok) throw new Error('Failed to fetch products')
//         const data: Product[] = await res.json()
//         if (!cancelled) setSearchResults(data)
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchProducts()

//     return () => {
//       cancelled = true
//     }
//   }, [searchQuery])

//   useEffect(() => {
//     function onClickOutside(e: MouseEvent) {
//       if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
//         setShowDropdown(false)
//       }
//     }
//     document.addEventListener('mousedown', onClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', onClickOutside)
//     }
//   }, [])

//   const validate = () => {
//     const errs: { [key: string]: string } = {}
//     if (!productId) errs.productId = 'Select a product'
//     if (!newPrice || isNaN(Number(newPrice))) errs.newPrice = 'Enter valid new price'
//     if (items.find((item) => item.productId === productId)) errs.duplicate = 'Product already in promo list'
//     setErrors(errs)
//     return Object.keys(errs).length === 0
//   }

//   const handleSelect = (product: Product) => {
//     setProductId(product._id)
//     setName(product.name)
//     setOriginalPrice(product.originalPrice.toString())
//     setNewPrice('')
//     setDiscountAmount('')
//     setDiscountPercent('')
//     setImageUrl(product.imageUrls)
//     setSearchQuery(product.name)
//     setShowDropdown(false)
//     setErrors({})
//   }

//   const handleAdd = async () => {
//     if (!validate() || items.length >= 10) return

//     try {
//       await addPromoItem({
//         productId,
//         name,
//         originalPrice: Number(originalPrice),
//         price: Number(newPrice),
//         imageUrls,
//       })

//       setProductId('')
//       setName('')
//       setOriginalPrice('')
//       setDiscountAmount('')
//       setDiscountPercent('')
//       setNewPrice('')
//       setImageUrl('')
//       setSearchQuery('')
//       setSearchResults([])
//       setErrors({})
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const onDiscountAmountChange = (val: string) => {
//     setDiscountAmount(val)
//     const d = parseFloat(val)
//     if (!isNaN(d) && original) {
//       const newP = original - d
//       const percent = (d / original) * 100
//       setNewPrice(newP.toFixed(2))
//       setDiscountPercent(percent.toFixed(2))
//     }
//   }

//   const onDiscountPercentChange = (val: string) => {
//     setDiscountPercent(val)
//     const p = parseFloat(val)
//     if (!isNaN(p) && original) {
//       const d = (p / 100) * original
//       const newP = original - d
//       setDiscountAmount(d.toFixed(2))
//       setNewPrice(newP.toFixed(2))
//     }
//   }

//   const isAddDisabled = !productId || !newPrice || items.length >= 10 || Object.keys(errors).length > 0

//   return (
//     <div className='max-w-5xl mx-auto p-6'>
//       <h1 className='text-3xl font-bold mb-6'>Promotion Items</h1>

//       <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative' ref={containerRef}>
//         <div className='col-span-1 md:col-span-4'>
//           <label htmlFor='product-search' className='block mb-1 font-medium'>
//             Search product
//           </label>
//           <Input
//             id='product-search'
//             placeholder='Search product...'
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value)
//               setShowDropdown(true)
//             }}
//             onFocus={() => setShowDropdown(true)}
//           />
//           {showDropdown && searchResults.length > 0 && (
//             <ul className='absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md'>
//               {searchResults.map((product) => (
//                 <li
//                   key={product._id}
//                   className='p-2 cursor-pointer hover:bg-blue-100'
//                   onClick={() => handleSelect(product)}
//                 >
//                   {product.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Original Price</label>
//           <Input value={formatPrice(Number(originalPrice))} readOnly />
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Discount Amount</label>
//           <Input
//             type='number'
//             placeholder='e.g. 200'
//             value={discountAmount}
//             onChange={(e) => onDiscountAmountChange(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Discount %</label>
//           <Input
//             type='number'
//             placeholder='e.g. 10'
//             value={discountPercent}
//             onChange={(e) => onDiscountPercentChange(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Final Price</label>
//           <Input value={formatPrice(Number(newPrice || 0))} readOnly />
//         </div>

//         {errors.duplicate && (
//           <p className='text-red-600 col-span-4'>{errors.duplicate}</p>
//         )}

//         <div className='md:col-span-3'>
//           <label className='block mb-1 font-medium'>Image URL</label>
//           <Input value={imageUrls} readOnly />
//         </div>

//         <div className='md:col-span-1 flex items-end'>
//           <Button onClick={handleAdd} className='w-full' disabled={isAddDisabled}>
//             Add Promo
//           </Button>
//         </div>
//       </div>

//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//         {items.map((item) => {
//           const discount = item.originalPrice - item.price
//           const percent = ((discount / item.originalPrice) * 100).toFixed(1)
//           return (
//             <Card key={item._id} className='p-3'>
//               <CardContent>
//                 <img
//                   src={item.imageUrls || '/placeholder.png'}
//                   alt={item.name}
//                   className='w-full h-40 object-cover rounded-md mb-3'
//                 />
//                 <h2 className='text-lg font-semibold'>{item.name}</h2>
//                 <p className='text-sm line-through text-gray-400'>
//                   {formatPrice(item.originalPrice)}
//                 </p>
//                 <p className='text-red-600 font-bold text-lg'>{formatPrice(item.price)}</p>
//                 <p className='text-xs text-green-700'>
//                   -{formatPrice(discount)} ({percent}%)
//                 </p>
//                 <Button
//                   variant='destructive'
//                   className='mt-4 w-full flex items-center justify-center gap-2'
//                   onClick={() => deletePromoItem(item._id)}
//                 >
//                   <Trash2 size={16} /> Remove
//                 </Button>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
// ChatGPT said:
// Updated saved memory
// Thanks! Now that I know you’re working on a Promotion Items Manager, I can help you implement the zustand store and API routes for managing promo items with MongoDB/Mongoose.

// Would you like:

// Just the zustand store,

// Just the API routes and Mongoose models, or

// Both the full implementation?

// Let me know and I’ll provide exactly what you need.

// You said:
// why am i getting this error message from the page above:Error creating promoProduct: [MongoServerError: E11000 duplicate key error collection: ecom16.promos index: id_1 dup key: { id: null }] {
//   errorResponse: [Object],
//   index: 0,
//   code: 11000,
//   keyPattern: [Object],
//   keyValue: [Object]
// }
//  POST /api/promo 500 in 71ms
// Error creating promoProduct: [MongoServerError: E11000 duplicate key error collection: ecom16.promos index: id_1 dup key: { id: null }] {
//   errorResponse: [Object],
//   index: 0,
//   code: 11000,
//   keyPattern: [Object],
//   keyValue: [Object]
// }
//  POST /api/promo 500 in 54ms
// ChatGPT said:
// The error message:

// MongoServerError: E11000 duplicate key error collection: ecom16.promos index: id_1 dup key: { id: null }
// means that MongoDB is trying to insert a document with a duplicate id field, and it’s failing because id is indexed as unique (id_1).

// 💥 What’s going wrong
// Your Mongoose Promo model likely has a schema like this:

// const PromoSchema = new mongoose.Schema({
//   id: { type: String, unique: true }, // or index: true, unique: true
//   ...
// })
// When you're creating a new promo, you're not setting the id field, so it’s defaulting to null.

// MongoDB is then trying to insert { id: null } for every promo, which violates the unique constraint on id.

// ✅ How to fix it
// ✅ Option 1: Remove the id field from the schema if it's not needed
// If you don’t explicitly need an id field (because _id is enough), update your Mongoose model like this:

// const PromoSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   name: String,
//   originalPrice: Number,
//   price: Number,
//   imageUrls: String,
//   // remove id: String
// })
// ✅ Option 2: Ensure id is set when creating the document
// If you do want to keep id, you must assign it explicitly:

// import { nanoid } from 'nanoid'

// const promo = new Promo({
//   id: nanoid(), // or whatever unique string you prefer
//   ...
// })
// await promo.save()
// ✅ Option 3: Remove the unique index from MongoDB directly
// If you mistakenly created a unique index on id, you can remove it from the Mongo shell or Compass:

// db.promos.dropIndex("id_1")
// Be cautious with this. Make sure it's not used in your app before dropping indexes.

// ✅ Best practice:
// Just rely on MongoDB's default _id unless you have a specific reason to use a custom id.

// Let me know if you want help checking or fixing your Mongoose model or schema.

// You said:
// this is my zustand store review it: import { toast } from 'sonner'
// import {create} from 'zustand'
// import { devtools } from 'zustand/middleware'

// interface PromoItem {
//   _id: string
//   productId: string
//   name: string
//   originalPrice: number
//   price: number
//   imageUrls: string
//   // imageUrl?: string
// }

// interface PromoState {
//   items: PromoItem[]
//   fetchPromoItems: () => Promise<void>
//   addPromoItem: (item: Omit<PromoItem, '_id'>) => Promise<void>
//   deletePromoItem: (id: string) => Promise<void>
//   decreasePriceByPercentage: (percent: number) => void
//   maxItems: number
// }

// export const usePromoStore = create<PromoState>()(
//   devtools((set, get) => ({
//     items: [],
//     maxItems: 10,

//     fetchPromoItems: async () => {
//       try {
//         const res = await fetch('/api/promo')
//         if (!res.ok) throw new Error('Failed to fetch promo items')
//         const data: PromoItem[] = await res.json()
//         set({ items: data })
//       } catch (error) {
//         console.error('fetchPromoItems error:', error)
//       }
//     },

//     addPromoItem: async (item) => {
//       const currentItems = get().items
//       const max = get().maxItems
//       if (currentItems.length >= max) {
//         toast.error(Cannot add more than ${max} items to the promo list.)

//         throw new Error(Cannot add more than ${max} promo items)
//       }
      
//       try {
//         const res = await fetch('/api/promo', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(item),
//         })
//         if (!res.ok) {
//           const err = await res.json()
//           throw new Error(err.error || 'Failed to add promo item')
//         }
//         const newItem: PromoItem = await res.json()
//         set((state) => ({ items: [...state.items, newItem] }))
//       } catch (error) {
//         console.error('addPromoItem error:', error)
//         throw error
//       }
//     },

//     deletePromoItem: async (id) => {
//       try {
//         const res = await fetch(/api/promo/${id}, {
//           method: 'DELETE',
//         })
//         if (!res.ok) throw new Error('Failed to delete promo item')
//         set((state) => ({ items: state.items.filter((item) => item._id !== id) }))
//       } catch (error) {
//         console.error('deletePromoItem error:', error)
//         throw error
//       }
//     },

//     decreasePriceByPercentage: (percent) => {
//       if (percent <= 0 || percent > 100) return
//       const currentItems = get().items
//       const updatedItems = currentItems.map((item) => {
//         const discountAmount = (item.originalPrice * percent) / 100
//         let newPrice = item.price - discountAmount
//         if (newPrice < 0) newPrice = 0
//         return { ...item, price: Number(newPrice.toFixed(2)) }
//       })
//       set({ items: updatedItems })
//     },
//   }))
// )
// ChatGPT said:
// Your zustand store is mostly well-structured and integrates with the API properly, but here's a clear review and feedback with suggestions for improvements — including how it relates to your earlier E11000 duplicate key error.

// ✅ Good Things
// Clean and typed with TypeScript ✅

// Limits max promo items ✅

// Error handling with toast and console.error ✅

// Async logic handled within actions ✅

// Clear naming and code structure ✅

// Includes optional utility: decreasePriceByPercentage ✅

// ❌ Problem 1: id is missing but expected by MongoDB
// You're sending a payload like:

// {
//   "productId": "...",
//   "name": "...",
//   "originalPrice": 1000,
//   "price": 800,
//   "imageUrls": "..."
// }
// And your database expects a unique id field, but you're not including it, resulting in:

// E11000 duplicate key error ... dup key: { id: null }
// ✅ Fix Option 1: Add a unique id on the client (if you actually need one)
// If your database schema has id: { type: String, unique: true }, generate it with nanoid or UUID:

// import { nanoid } from 'nanoid'

// addPromoItem: async (item) => {
//   const currentItems = get().items
//   const max = get().maxItems
//   if (currentItems.length >= max) {
//     toast.error(`Cannot add more than ${max} items to the promo list.`)
//     throw new Error(`Cannot add more than ${max} promo items`)
//   }

//   const payload = {
//     ...item,
//     id: nanoid(), // Generate a unique ID if needed
//   }

//   try {
//     const res = await fetch('/api/promo', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     })
//     if (!res.ok) {
//       const err = await res.json()
//       throw new Error(err.error || 'Failed to add promo item')
//     }
//     const newItem: PromoItem = await res.json()
//     set((state) => ({ items: [...state.items, newItem] }))
//   } catch (error) {
//     console.error('addPromoItem error:', error)
//     throw error
//   }
// }
// 🔁 Or just remove id from your MongoDB schema entirely if it’s redundant (see below).

// ❌ Problem 2: Unclear Schema Compatibility
// Make sure your MongoDB promo schema looks like this (assuming you don’t need a custom id):

// const promoSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   name: String,
//   originalPrice: Number,
//   price: Number,
//   imageUrls: String,
// }, { timestamps: true })
// No id field necessary unless you're doing something like Firebase-style IDs.

// ✅ Suggestions to Improve Further
// 1. Add Duplicate Check on Product ID Before Sending
// You're already checking in the page component, but you can also double-protect in the store:

// if (currentItems.find((i) => i.productId === item.productId)) {
//   toast.error('This product is already in the promo list')
//   throw new Error('Duplicate promo item')
// }
// 2. Use Immer Middleware (optional)
// If you want to simplify immutability, consider using zustand + immer.

// 3. Optimistic Update (optional UX improvement)
// You could update the state optimistically, then revert on error.

// ✅ Conclusion
// You're 99% there — the main issue is the missing id field, which causes the MongoDB duplicate key error because you're not providing it but it's indexed as unique.

// To fix:

// Either add a unique id field manually (e.g. using nanoid)

// Or remove the id field and its unique index from your schema and MongoDB

// Let me know if you want help adjusting your Mongoose model or API route!

// You said:
// this is my api route review it : //import type { NextApiRequest, NextApiResponse } from 'next'
// import { NextRequest, NextResponse } from 'next/server'
// import connectToDatabase from '@/lib/db/dbConnection'
// import Promo from '@/lib/db/models/promo'



// export async function GET() {
//   await connectToDatabase
//   const promos = await Promo.find().sort({ createdAt: -1 })
//   return NextResponse.json(promos)
// }

// export async function POST(req: NextRequest) {
//   await connectToDatabase
//   const data = await req.json()
//   const { productId, name, price, originalPrice, imageUrl } = data

//   try {
//     //Check if product already exists
//     const exists = await Promo.findOne({ productId })
//     if (exists) {
//       console.log("product exist bitch")
//       return NextResponse.json(
//         { message: 'Product already in promo list' },
//         { status: 409 }
//       )
//     }
    
//     // Create PromoProduct with reference to category
//     const promo = await Promo.create({
//       productId,
//       name,
//       price,
//       originalPrice,
//       imageUrl,
//     })
   
//     return NextResponse.json({ promo, success: true })
//   } catch (error) {
//     console.error('Error creating promoProduct:', error)
//     return NextResponse.json(
//       { error: 'Failed to create product' },
//       { status: 500 }
//     )
//   }
// }


// export async function DELETE() {
//   await connectToDatabase
//   // Clear all
//   await Promo.deleteMany({})
//   return NextResponse.json(
//     { message: 'All promo items removed' },
//     { status: 200}
//   )
  
// }
// ChatGPT said:
// Your API route is mostly functional, but there are some issues and improvements to address — especially considering the E11000 duplicate key error you're seeing. Here's a detailed review and suggestions to fix bugs, improve structure, and prevent future issues:

// ✅ What You're Doing Well
// ✅ Mongoose model is being used properly.

// ✅ DB connection is handled.

// ✅ Product duplication is checked in the POST route.

// ✅ Promos are sorted by createdAt in GET.

// ✅ Consistent use of NextResponse.

// ❌ Issues and Fixes
// ❗️1. connectToDatabase is not awaited properly
// You're doing:

// await connectToDatabase
// But connectToDatabase is likely a function, so you need to call it:

// await connectToDatabase()
// Why it matters: Without (), you're not actually initializing the DB connection. That can result in errors or inconsistent behavior.

// ❗️2. You’re returning { promo, success: true }, but store expects PromoItem
// Your zustand store expects this return shape:

// {
//   _id: string,
//   productId: string,
//   name: string,
//   originalPrice: number,
//   price: number,
//   imageUrls: string
// }
// But you're returning:

// { promo, success: true }
// This will break when the store tries to unpack and push it to state.

// ✅ Fix:
// Return promo directly:

// return NextResponse.json(promo)
// OR update your Zustand store to handle .promo from the response.

// ❗️3. Field mismatch: imageUrl vs imageUrls
// Your API expects:

// const { productId, name, price, originalPrice, imageUrl } = data
// But your Zustand store uses:

// imageUrls: string
// So either:

// Update the store to use imageUrl, OR

// Update the API to extract imageUrls:

// const { productId, name, price, originalPrice, imageUrls } = data

// await Promo.create({
//   productId,
//   name,
//   price,
//   originalPrice,
//   imageUrls, // not imageUrl
// })
// ❗️4. MongoDB duplicate key error is from id: { type: String, unique: true } in schema
// As mentioned earlier, the error you're getting is:

// MongoServerError: E11000 duplicate key error ... dup key: { id: null }
// That means your Mongoose schema probably has:

// id: { type: String, unique: true }
// But you're never sending id, so it defaults to null, triggering a unique constraint violation.

// ✅ Fix options:
// Option A: Remove id field from schema if unnecessary (recommended):

// // In models/promo.js
// const promoSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   name: String,
//   price: Number,
//   originalPrice: Number,
//   imageUrls: String,
// }, { timestamps: true })
// Option B: Add a unique ID manually (e.g., nanoid) in the POST request (less ideal unless you need it).

// ✅ Suggested Final API Code (Fixed Version)
// import { NextRequest, NextResponse } from 'next/server'
// import connectToDatabase from '@/lib/db/dbConnection'
// import Promo from '@/lib/db/models/promo'

// export async function GET() {
//   await connectToDatabase()
//   const promos = await Promo.find().sort({ createdAt: -1 })
//   return NextResponse.json(promos)
// }

// export async function POST(req: NextRequest) {
//   await connectToDatabase()
//   const data = await req.json()
//   const { productId, name, price, originalPrice, imageUrls } = data

//   try {
//     const exists = await Promo.findOne({ productId })
//     if (exists) {
//       return NextResponse.json(
//         { message: 'Product already in promo list' },
//         { status: 409 }
//       )
//     }

//     const promo = await Promo.create({
//       productId,
//       name,
//       price,
//       originalPrice,
//       imageUrls,
//     })

//     return NextResponse.json(promo) // ✅ Return the promo directly
//   } catch (error) {
//     console.error('Error creating promoProduct:', error)
//     return NextResponse.json(
//       { error: 'Failed to create product' },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE() {
//   await connectToDatabase()
//   await Promo.deleteMany({})
//   return NextResponse.json(
//     { message: 'All promo items removed' },
//     { status: 200 }
//   )
// }
// ✅ Conclusion
// Your logic is solid, but here are the top fixes you need:

// ✅ Use await connectToDatabase() correctly

// ✅ Remove id field from Mongoose schema if unused

// ✅ Match imageUrls in API and store

// ✅ Return the raw promo object instead of a wrapper

// ✅ Avoid mismatches in returned JSON vs expected types

// Would you like me to help you review the Mongoose model file too to ensure it's aligned?

// You said:

// import mongoose from 'mongoose'

// const PromoSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//       unique: true, // Prevent same product from being added twice
//     },
//     name: String,
//     price: Number,
//     originalPrice: Number,
//     imageUrls: String,
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// )

// export default mongoose.models.Promo || mongoose.model('Promo', PromoSchema)
// ChatGPT said:
// Thanks for sharing your Promo model — it's mostly well-defined, but let me point out a few important details, improvements, and validations based on your setup:

// ✅ What's Good
// ✅ You're using mongoose.Schema.Types.ObjectId for productId and referencing Product, which is great for potential population.

// ✅ unique: true on productId is exactly how you should prevent duplicate promo entries.

// ✅ timestamps: true makes createdAt and updatedAt automatic, so your manual createdAt field is redundant (see below).

// ✅ The default export fallback with mongoose.models.Promo || ... is correct.

// ❌ Issues & Fixes
// ❗️1. Redundant createdAt field
// You're explicitly adding this:

// createdAt: {
//   type: Date,
//   default: Date.now,
// }
// But timestamps: true already handles createdAt and updatedAt. So this is unnecessary and may conflict with the auto-managed version.

// ✅ Fix: Remove the manual createdAt field.

// const PromoSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//       unique: true,
//     },
//     name: String,
//     price: Number,
//     originalPrice: Number,
//     imageUrls: String,
//   },
//   { timestamps: true } // this handles createdAt and updatedAt
// )
// ✅ 2. Optional Enhancements
// These aren't required, but may help:

// ✔️ Add validation for price fields
// price: {
//   type: Number,
//   required: true,
//   min: 0,
// },
// originalPrice: {
//   type: Number,
//   required: true,
//   min: 0,
// }
// ✔️ Add required flags for name and imageUrls if necessary:
// name: {
//   type: String,
//   required: true,
// },
// imageUrls: {
//   type: String,
//   required: true,
// }
// ✅ Final Clean Version
// import mongoose from 'mongoose'

// const PromoSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//       unique: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     originalPrice: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     imageUrls: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// )

// export default mongoose.models.Promo || mongoose.model('Promo', PromoSchema)
// ✅ Summary of Actions You Should Take
// ✅ Remove the manual createdAt field — timestamps already adds it.

// ✅ Ensure field names like imageUrls match in both the API and the frontend/store.

// ✅ Use await connectToDatabase() (not await connectToDatabase) in your route handlers.

// ✅ Return only the promo object in your POST response to align with Zustand expectations.

// Let me know if you also want to populate the productId details when fetching promos — that’s a useful next step for showing product info directly in the UI.

// You said:
// now review all the code i have uploaded from the page ,to zustand store, to model and to the api and get me the source of the error MongoServerError: E11000 duplicate key error ... dup key: { id: null }
// ChatGPT said:
// Thanks for providing all parts of the system — let's walk through what's happening, why you're getting the error, and how to fix it.

// 🔴 The Error
// MongoServerError: E11000 duplicate key error collection: ecom16.promos index: id_1 dup key: { id: null }
// ❗️What it means:
// MongoDB is complaining about an attempt to insert a document where the value for the id field is null, and it's trying to enforce uniqueness on an id field (id_1 means a unique index on id).

// dup key: { id: null } tells us MongoDB tried to insert another document with id: null, which violates the uniqueness constraint.

// 🔎 Root Cause
// You do not define an id field in your schema, but somehow a unique index on id exists in the database.

// This most likely comes from one of two things:

// ✅ 1. The MongoDB collection has a leftover unique index on id
// Even though your schema doesn’t define an id field, MongoDB may still be enforcing a unique index on id from a previous version of your schema or a manual index creation.

// You can confirm this by checking your index list:

// mongo
// > use ecom16
// > db.promos.getIndexes()
// You'll likely see something like:

// {
//   "v": 2,
//   "key": { "id": 1 },
//   "name": "id_1",
//   "unique": true
// }
// ✅ Fix: Drop the Invalid Index
// Drop the id index from the promos collection:

// > db.promos.dropIndex("id_1")
// Then confirm it's gone:

// > db.promos.getIndexes()
// 📋 Code Review Summary
// Now, reviewing your full codebase to confirm you're not mistakenly using id anywhere:

// ✅ Promo Schema
// You define:

// productId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Product',
//   unique: true,
// }
// ✅ No id field here — good.

// ✅ Zustand Store
// You're correctly using _id from MongoDB as:

// interface PromoItem {
//   _id: string
//   ...
// }
// ✅ Good. No id field used in your payloads.

// ✅ API Route
// You create like this:

// const promo = await Promo.create({ productId, name, price, originalPrice, imageUrl })
// return NextResponse.json({ promo, success: true })
// ✅ Still no id used — correct.

// ⚠️ One mismatch to fix:
// In your schema, you use:

// imageUrls: String
// But in the API route:

// const { ..., imageUrl } = data
// And then:

// imageUrl
// This creates:

// {
//   imageUrls: undefined // because you're saving `imageUrl` into `imageUrls` field
// }
// ✅ Fix this by aligning the field name:

// Either rename schema field to imageUrl

// Or update route to use imageUrls:

// const { ..., imageUrls } = data
// ...
// imageUrls,
// ✅ Final Fix Summary
// Problem	Solution
// ❌ MongoDB has a unique index on id (not in your schema)	🛠 Run db.promos.dropIndex("id_1")
// ❌ Mismatch between imageUrl and imageUrls	🛠 Fix field name in schema or route
// ✅ All other logic in Zustand + API + schema	👍 Looks good
// Let me know if you'd like help adding a migration check to auto-drop invalid indexes on startup to prevent this in production.

// You said:
// add other functionalities to this zustand store and create a flashsale page using shadcn ui and add a timer .when the duration of the timer ends the product should be removed from flashsale  list. a history of previously added products should be created also.: import {create} from 'zustand';

// interface FlashSale {
//   _id?: string;
//   productId: string;
//   startAt: string;  // ISO string
//   endAt: string;    // ISO string
//   discountPercent: number;
//   createdBy?: string;
// }

// interface FlashSaleState {
//   items: FlashSale[];
//   fetchFlashSales: () => Promise<void>;
//   addFlashSale: (flashSale: FlashSale) => Promise<void>;
//   deleteFlashSale: (id: string) => Promise<void>;
// }

// export const useFlashSaleStore = create<FlashSaleState>((set, get) => ({
//   items: [],

//   fetchFlashSales: async () => {
//     const res = await fetch('/api/flashsale');
//     if (res.ok) {
//       const data = await res.json();
//       set({ items: data });
//     }
//   },

//   addFlashSale: async (flashSale) => {
//     const res = await fetch('/api/flashsale', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(flashSale),
//     });
//     if (res.ok) {
//       await get().fetchFlashSales();
//     }
//   },

//   deleteFlashSale: async (id) => {
//     const res = await fetch(/api/flashsale/${id}, { method: 'DELETE' });
//     if (res.ok) {
//       set({ items: get().items.filter((item) => item._id !== id) });
//     }
//   },
// }));
// ChatGPT said:
// Updated saved memory
// To upgrade your useFlashSaleStore Zustand store and implement a full Flash Sale Manager system, here's what we'll do:

// ✅ Store Enhancements
// We'll add:

// A history array to track expired flash sales.

// Automatic expiration logic (checked every minute).

// A utility to check expired sales based on endAt.

// 💾 Updated Zustand Store with Expiration and History
// import { create } from 'zustand'

// interface FlashSale {
//   _id?: string
//   productId: string
//   startAt: string
//   endAt: string
//   discountPercent: number
//   createdBy?: string
// }

// interface FlashSaleState {
//   items: FlashSale[]
//   history: FlashSale[]
//   fetchFlashSales: () => Promise<void>
//   addFlashSale: (flashSale: FlashSale) => Promise<void>
//   deleteFlashSale: (id: string) => Promise<void>
//   checkExpiredSales: () => void
// }

// export const useFlashSaleStore = create<FlashSaleState>((set, get) => {
//   const checkExpiredSales = () => {
//     const now = new Date().toISOString()
//     const { items, history } = get()
//     const [expired, active] = items.reduce<[FlashSale[], FlashSale[]]>(
//       ([expired, active], item) => {
//         return new Date(item.endAt) < new Date(now)
//           ? [[...expired, item], active]
//           : [expired, [...active, item]]
//       },
//       [[], []]
//     )

//     if (expired.length > 0) {
//       set({ items: active, history: [...history, ...expired] })
//     }
//   }

//   // Run expiration check every 60 seconds
//   setInterval(checkExpiredSales, 60000)

//   return {
//     items: [],
//     history: [],
//     fetchFlashSales: async () => {
//       const res = await fetch('/api/flashsale')
//       if (res.ok) {
//         const data: FlashSale[] = await res.json()
//         set({ items: data })
//       }
//     },
//     addFlashSale: async (flashSale) => {
//       const res = await fetch('/api/flashsale', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(flashSale),
//       })
//       if (res.ok) {
//         await get().fetchFlashSales()
//       }
//     },
//     deleteFlashSale: async (id) => {
//       const res = await fetch(`/api/flashsale/${id}`, { method: 'DELETE' })
//       if (res.ok) {
//         set((state) => ({
//           items: state.items.filter((item) => item._id !== id),
//         }))
//       }
//     },
//     checkExpiredSales,
//   }
// })
// 🧑‍🎨 Flash Sale Page (with Countdown Timer)
// Here's a basic implementation using ShadCN UI and Zustand.

// 'use client'

// import { useEffect, useState } from 'react'
// import { useFlashSaleStore } from '@/stores/flashSale'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { formatDistanceToNowStrict } from 'date-fns'

// const FlashSalePage = () => {
//   const { items, history, fetchFlashSales, deleteFlashSale } = useFlashSaleStore()
//   const [now, setNow] = useState(new Date())

//   useEffect(() => {
//     fetchFlashSales()
//     const timer = setInterval(() => setNow(new Date()), 1000)
//     return () => clearInterval(timer)
//   }, [fetchFlashSales])

//   const renderTimer = (endAt: string) => {
//     const end = new Date(endAt)
//     if (end < now) return <span className="text-red-500 font-bold">Expired</span>
//     return <span className="text-green-600">{formatDistanceToNowStrict(end)} left</span>
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8">
//       <h1 className="text-3xl font-bold mb-4">🔥 Flash Sale</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {items.map((sale) => (
//           <Card key={sale._id} className="p-4">
//             <CardContent className="space-y-2">
//               <p className="font-semibold">Product ID: {sale.productId}</p>
//               <p>Discount: {sale.discountPercent}%</p>
//               <p>Ends in: {renderTimer(sale.endAt)}</p>
//               <Button
//                 variant="destructive"
//                 onClick={() => deleteFlashSale(sale._id!)}
//                 className="mt-2 w-full"
//               >
//                 Remove
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-10">
//         <h2 className="text-xl font-semibold mb-2">📜 Flash Sale History</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {history.map((sale, idx) => (
//             <Card key={`${sale.productId}-${idx}`} className="p-4 opacity-70">
//               <CardContent>
//                 <p className="font-semibold">Product ID: {sale.productId}</p>
//                 <p>Discount: {sale.discountPercent}%</p>
//                 <p className="text-red-500">Expired: {new Date(sale.endAt).toLocaleString()}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FlashSalePage
// 🧠 What You Can Do Next
// Add a product preview and title lookup from product ID.

// Allow flash sales to be created via a form with date pickers.

// Sync expired items to MongoDB if needed (via a cron job or API call).

// Optional: show a countdown timer as HH:MM:SS using a custom hook.

// Would you like help implementing the Flash Sale creation form or syncing expired items to a persistent history collection?

// You said:
// Allow flash sales to be created via a form with date pickers.
// ChatGPT said:
// Here's a complete Flash Sale creation form using ShadCN UI and react-hook-form with:

// 🗓 Date-Time Pickers (startAt, endAt)

// 🔢 Discount input with validation

// ✅ Submission to Zustand + backend

// ⚛️ UI Feedback and reset

// 🧩 1. Dependencies
// Ensure these are installed:

// npm install react-hook-form zod @hookform/resolvers date-fns
// 🧾 2. Flash Sale Creation Form Component
// 'use client'

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { useFlashSaleStore } from '@/stores/flashSale'
// import { formatISO } from 'date-fns'

// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Label } from '@/components/ui/label'
// import { toast } from 'sonner'

// const flashSaleSchema = z.object({
//   productId: z.string().min(1, 'Product ID is required'),
//   startAt: z.string().min(1, 'Start time is required'),
//   endAt: z.string().min(1, 'End time is required'),
//   discountPercent: z.coerce.number().min(1).max(100),
// })

// type FlashSaleFormData = z.infer<typeof flashSaleSchema>

// export default function CreateFlashSaleForm() {
//   const { addFlashSale } = useFlashSaleStore()

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<FlashSaleFormData>({
//     resolver: zodResolver(flashSaleSchema),
//   })

//   const onSubmit = async (data: FlashSaleFormData) => {
//     try {
//       if (new Date(data.endAt) <= new Date(data.startAt)) {
//         toast.error('End time must be after start time.')
//         return
//       }

//       await addFlashSale({
//         productId: data.productId,
//         startAt: formatISO(new Date(data.startAt)),
//         endAt: formatISO(new Date(data.endAt)),
//         discountPercent: data.discountPercent,
//       })

//       toast.success('Flash Sale created!')
//       reset()
//     } catch (error) {
//       toast.error('Failed to create flash sale')
//       console.error(error)
//     }
//   }

//   return (
//     <Card className="max-w-xl mx-auto mt-10 p-6">
//       <CardContent>
//         <h2 className="text-xl font-semibold mb-4">🆕 Add Flash Sale</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <Label>Product ID</Label>
//             <Input {...register('productId')} />
//             {errors.productId && <p className="text-red-500 text-sm">{errors.productId.message}</p>}
//           </div>

//           <div>
//             <Label>Start Time</Label>
//             <Input type="datetime-local" {...register('startAt')} />
//             {errors.startAt && <p className="text-red-500 text-sm">{errors.startAt.message}</p>}
//           </div>

//           <div>
//             <Label>End Time</Label>
//             <Input type="datetime-local" {...register('endAt')} />
//             {errors.endAt && <p className="text-red-500 text-sm">{errors.endAt.message}</p>}
//           </div>

//           <div>
//             <Label>Discount %</Label>
//             <Input type="number" {...register('discountPercent')} />
//             {errors.discountPercent && (
//               <p className="text-red-500 text-sm">{errors.discountPercent.message}</p>
//             )}
//           </div>

//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Adding...' : 'Add Flash Sale'}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }
// 🧑‍💻 Usage Example
// Add this to your Flash Sale page:

// import CreateFlashSaleForm from '@/components/flash-sale/CreateFlashSaleForm'

// export default function FlashSalePage() {
//   return (
//     <div>
//       <CreateFlashSaleForm />
//       {/* ... other flash sale UI */}
//     </div>
//   )
// }
// ✅ Next Features You Can Add
// Auto-complete product picker instead of plain Product ID

// Disable date inputs based on today

// Limit overlapping flash sales

// Show estimated price after discount in real-time

// Would you like help with any of those?

// You said:
// Auto-complete product picker instead of plain Product ID

// Disable date inputs based on today

// Limit overlapping flash sales

// Show estimated price after discount in real-time
// ChatGPT said:
// Updated saved memory
// Here’s how to implement all your requested Flash Sale form enhancements in a ShadCN/Next.js app using Zustand:

// ✅ 1. Auto-complete Product Picker
// Replace plain productId input with a searchable dropdown.

// import { Input } from '@/components/ui/input'
// import { useEffect, useState } from 'react'

// interface Product {
//   _id: string
//   name: string
//   price: number
// }

// export function ProductAutoComplete({ onSelect }: { onSelect: (product: Product) => void }) {
//   const [query, setQuery] = useState('')
//   const [results, setResults] = useState<Product[]>([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (query.length < 2) return

//     setLoading(true)
//     fetch(`/api/products/search?search=${encodeURIComponent(query)}`)
//       .then((res) => res.json())
//       .then((data) => setResults(data))
//       .finally(() => setLoading(false))
//   }, [query])

//   return (
//     <div className="relative">
//       <Input
//         placeholder="Search product..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       {results.length > 0 && (
//         <ul className="absolute bg-white border w-full mt-1 max-h-40 overflow-y-auto z-10">
//           {results.map((product) => (
//             <li
//               key={product._id}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 onSelect(product)
//                 setQuery(product.name)
//                 setResults([])
//               }}
//             >
//               {product.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }
// ✅ 2. Disable Start/End Date Inputs Based on Today
// import { format, addDays } from 'date-fns'

// const today = format(new Date(), 'yyyy-MM-dd')
// <Input type="date" min={today} value={startAt} onChange={(e) => setStartAt(e.target.value)} />
// <Input type="date" min={startAt || today} value={endAt} onChange={(e) => setEndAt(e.target.value)} />
// ✅ 3. Limit Overlapping Flash Sales
// In your store’s addFlashSale method:

// addFlashSale: async (flashSale) => {
//   const existing = get().items

//   const hasOverlap = existing.some((item) =>
//     flashSale.productId === item.productId &&
//     new Date(flashSale.startAt) < new Date(item.endAt) &&
//     new Date(flashSale.endAt) > new Date(item.startAt)
//   )

//   if (hasOverlap) {
//     throw new Error('This product already has a flash sale in the selected timeframe.')
//   }

//   const res = await fetch('/api/flashsale', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(flashSale),
//   })
//   if (res.ok) await get().fetchFlashSales()
// }
// ✅ 4. Show Estimated Price After Discount (Real-Time)
// {product && discountPercent && (
//   <p className="text-sm text-green-600 font-medium mt-2">
//     Final price: {(product.price * (1 - discountPercent / 100)).toFixed(2)} KES
//   </p>
// )}
// Would you like a complete integrated example with UI and Zustand wiring in a single file for fast development?

// You said:
// yes
// ChatGPT said:
// ✅ Flash Sale creation form complete:

// ✅ Product search with autocomplete

// ✅ Date pickers with min-date validation

// ✅ Overlap prevention logic

// ✅ Real-time discount price preview

// You can now use this in your Flash Sale management page. Want me to add the timer and history tracking next?

// You said:
// 'use client'
// import { useEffect, useRef, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Trash2 } from 'lucide-react'
// import { useFlashSaleStore } from '@/stores/FlashSale'


// interface Product {
//   _id: string
//   name: string
//   imageUrls: string
//   originalPrice: number
//   startAt: Date
//   endAt: Date
// }

// const formatPrice = (value: number) =>
//   new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(
//     value
//   )

// export default function FlashSaleManager() {
//   const { items, fetchFlashSaleItems, addFlashSaleItem, deleteFlashSaleItem } =
//     useFlashSaleStore()

//   const [productId, setProductId] = useState('')
//   const [name, setName] = useState('')
//   const [originalPrice, setOriginalPrice] = useState('')
//   const [discountAmount, setDiscountAmount] = useState('')
//   const [discountPercent, setDiscountPercent] = useState('')
//   const [newPrice, setNewPrice] = useState('')
//   const [imageUrls, setImageUrl] = useState('')
//   const [startAt, setStartAt] = useState('')
//   const [endAt, setEndAt] = useState('')

//   const [errors, setErrors] = useState<{ [key: string]: string }>({})
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<Product[]>([])
//   const [showDropdown, setShowDropdown] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)

//   const original = parseFloat(originalPrice)

//   useEffect(() => {
//     fetchFlashSaleItems()
//   }, [fetchFlashSaleItems])

//   useEffect(() => {
//     if (searchQuery.length < 2) {
//       setSearchResults([])
//       return
//     }

//     let cancelled = false

//     async function fetchProducts() {
//       try {
//         const res = await fetch(
//           /api/products/search?search=${encodeURIComponent(searchQuery)}
//         )
//         if (!res.ok) throw new Error('Failed to fetch products')
//         const data: Product[] = await res.json()
//         if (!cancelled) setSearchResults(data)
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchProducts()

//     return () => {
//       cancelled = true
//     }
//   }, [searchQuery])

//   useEffect(() => {
//     function onClickOutside(e: MouseEvent) {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       ) {
//         setShowDropdown(false)
//       }
//     }
//     document.addEventListener('mousedown', onClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', onClickOutside)
//     }
//   }, [])

//   const validate = () => {
//     const errs: { [key: string]: string } = {}
//     if (!productId) errs.productId = 'Select a product'
//     if (!newPrice || isNaN(Number(newPrice)))
//       errs.newPrice = 'Enter valid new price'
//     if (items.find((item) => item.productId === productId))
//       errs.duplicate = 'Product already in promo list'
//     setErrors(errs)
//     return Object.keys(errs).length === 0
//   }

//   const handleSelect = (product: Product) => {
//     setProductId(product._id)
//     setName(product.name)
//     setOriginalPrice(product.originalPrice.toString())
//     setNewPrice('')
//     setDiscountAmount('')
//     setDiscountPercent('')
//     setImageUrl(product.imageUrls)
//     setSearchQuery(product.name)
//     setShowDropdown(false)
//     setErrors({})
//     setStartAt('')
//     setEndAt('')
//   }

//   const handleAdd = async () => {
//     if (!validate() || items.length >= 10) return

//     try {
//       await addFlashSaleItem({
//         productId,
//         name,
//         originalPrice: Number(originalPrice),
//         price: Number(newPrice),
//         imageUrls,
//         startAt,
//         endAt,
//       })

//       setProductId('')
//       setName('')
//       setOriginalPrice('')
//       setDiscountAmount('')
//       setDiscountPercent('')
//       setNewPrice('')
//       setImageUrl('')
//       setSearchQuery('')
//       setSearchResults([])
//       setErrors({})
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const onDiscountAmountChange = (val: string) => {
//     setDiscountAmount(val)
//     const d = parseFloat(val)
//     if (!isNaN(d) && original) {
//       const newP = original - d
//       const percent = (d / original) * 100
//       setNewPrice(newP.toFixed(2))
//       setDiscountPercent(percent.toFixed(2))
//     }
//   }

//   const onDiscountPercentChange = (val: string) => {
//     setDiscountPercent(val)
//     const p = parseFloat(val)
//     if (!isNaN(p) && original) {
//       const d = (p / 100) * original
//       const newP = original - d
//       setDiscountAmount(d.toFixed(2))
//       setNewPrice(newP.toFixed(2))
//     }
//   }

//   const isAddDisabled =
//     !productId ||
//     !newPrice ||
//     items.length >= 10 ||
//     Object.keys(errors).length > 0

//   return (
//     <div className='max-w-5xl mx-auto p-6'>
//       <h1 className='text-3xl font-bold mb-6'>FlashSale Items</h1>

//       <div
//         className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative'
//         ref={containerRef}
//       >
//         <div className='col-span-1 md:col-span-4'>
//           <label htmlFor='product-search' className='block mb-1 font-medium'>
//             Search product
//           </label>
//           <Input
//             id='product-search'
//             placeholder='Search product...'
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value)
//               setShowDropdown(true)
//             }}
//             onFocus={() => setShowDropdown(true)}
//           />
//           {showDropdown && searchResults.length > 0 && (
//             <ul className='absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md'>
//               {searchResults.map((product) => (
//                 <li
//                   key={product._id}
//                   className='p-2 cursor-pointer hover:bg-blue-100'
//                   onClick={() => handleSelect(product)}
//                 >
//                   {product.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Original Price</label>
//           <Input value={formatPrice(Number(originalPrice))} readOnly />
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Discount Amount</label>
//           <Input
//             type='number'
//             placeholder='e.g. 200'
//             value={discountAmount}
//             onChange={(e) => onDiscountAmountChange(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>
//             Start Date & Time
//             <Input
//               type='datetime-local'
//               value={startAt}
//               onChange={(e) => setStartAt(e.target.value)}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             End Date & Time
//             <Input
//               type='datetime-local'
//               value={endAt}
//               onChange={(e) => setEndAt(e.target.value)}
//             />
//           </label>
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Discount %</label>
//           <Input
//             type='number'
//             placeholder='e.g. 10'
//             value={discountPercent}
//             onChange={(e) => onDiscountPercentChange(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Final Price</label>
//           <Input value={formatPrice(Number(newPrice || 0))} readOnly />
//         </div>

//         {errors.duplicate && (
//           <p className='text-red-600 col-span-4'>{errors.duplicate}</p>
//         )}

//         <div className='md:col-span-3'>
//           <label className='block mb-1 font-medium'>Image URL</label>
//           <Input value={imageUrls} readOnly />
//         </div>

//         <div className='md:col-span-1 flex items-end'>
//           <Button
//             onClick={handleAdd}
//             className='w-full'
//             disabled={isAddDisabled}
//           >
//             Add Promo
//           </Button>
//         </div>
//       </div>

//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//         {items.map((item) => {
//           const discount = item.originalPrice - item.price
//           const percent = ((discount / item.originalPrice) * 100).toFixed(1)
//           return (
//             <Card key={item._id} className='p-3'>
//               <CardContent>
//                 <img
//                   src={item.imageUrls || '/placeholder.png'}
//                   alt={item.name}
//                   className='w-full h-40 object-cover rounded-md mb-3'
//                 />
//                 <h2 className='text-lg font-semibold'>{item.name}</h2>
//                 <p className='text-sm line-through text-gray-400'>
//                   {formatPrice(item.originalPrice)}
//                 </p>
//                 <p className='text-red-600 font-bold text-lg'>
//                   {formatPrice(item.price)}
//                 </p>
//                 <p className='text-xs text-green-700'>
//                   -{formatPrice(discount)} ({percent}%)
//                 </p>
//                 <Button
//                   variant='destructive'
//                   className='mt-4 w-full flex items-center justify-center gap-2'
//                   onClick={() => deleteFlashSaleItem(item._id)}
//                 >
//                   <Trash2 size={16} /> Remove
//                 </Button>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
// ChatGPT said:
// Updated saved memory
// Thanks for sharing the full code! Here's a detailed review and checklist for your Flash Sale Manager implementation, including the Zustand store, UI, and functionality. You've done a solid job with modular state, real-time price updates, and product auto-complete.

// ✅ What You’ve Done Well
// Zustand Store
// Clean structure for managing flash sale state.

// Async actions with fetch, add, and delete methods.

// items state is correctly updated on add/delete.

// UI
// Uses ShadCN UI components effectively.

// Implements:

// Product auto-complete search with live dropdown.

// Date/time pickers for startAt and endAt.

// Real-time discount amount and percentage calculation.

// Validation with duplicate check and product limit.

// Responsive grid and card display of flash sale items.

// ✅ Requirements Covered So Far
// Feature	Status
// Auto-complete product picker	✅
// Disable past date inputs	⚠️ Partial (see below)
// Limit overlapping flash sales	❌ Not implemented yet
// Show real-time discounted price	✅
// Display flash sale items	✅
// 🔧 Recommendations & Enhancements
// 1. ✅ Disable Past Dates
// Add min to your datetime-local inputs to prevent picking past dates:

// const now = new Date().toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"

// <Input
//   type="datetime-local"
//   value={startAt}
//   min={now}
//   onChange={(e) => setStartAt(e.target.value)}
// />
// <Input
//   type="datetime-local"
//   value={endAt}
//   min={startAt || now}
//   onChange={(e) => setEndAt(e.target.value)}
// />
// 2. ✅ Auto-Remove Expired Flash Sale Items
// Update your Zustand store to periodically remove expired items:

// // Add to Zustand store
// useEffect(() => {
//   const interval = setInterval(() => {
//     const now = new Date()
//     const updated = get().items.filter(item => new Date(item.endAt) > now)
//     set({ items: updated })
//   }, 60 * 1000) // check every minute

//   return () => clearInterval(interval)
// }, [])
// Or better: implement auto-prune server-side in your /api/flashsale GET or cron.

// 3. ✅ Prevent Overlapping Flash Sales
// Before addFlashSaleItem, check if the selected productId already has an overlapping sale:

// const hasOverlap = items.some(item =>
//   item.productId === productId &&
//   new Date(item.endAt) > new Date(startAt)
// )
// if (hasOverlap) {
//   setErrors({ overlap: 'This product has an overlapping flash sale.' })
//   return
// }
// 4. ✅ Flash Sale History
// Add a second state in the store like history: FlashSale[], and update it when items expire or are deleted:

// deleteFlashSaleItem: async (id) => {
//   const item = get().items.find(i => i._id === id)
//   if (!item) return
//   const res = await fetch(`/api/flashsale/${id}`, { method: 'DELETE' })
//   if (res.ok) {
//     set((state) => ({
//       items: state.items.filter(i => i._id !== id),
//       history: [...state.history, item],
//     }))
//   }
// }
// ✅ BONUS: Timer per Item
// To show countdown in each card:

// const [remainingTime, setRemainingTime] = useState('')

// useEffect(() => {
//   const interval = setInterval(() => {
//     const now = new Date()
//     const end = new Date(item.endAt)
//     const diff = end.getTime() - now.getTime()
//     if (diff <= 0) {
//       setRemainingTime('Expired')
//     } else {
//       const mins = Math.floor((diff / 1000 / 60) % 60)
//       const hrs = Math.floor((diff / 1000 / 60 / 60) % 24)
//       const days = Math.floor(diff / 1000 / 60 / 60 / 24)
//       setRemainingTime(`${days}d ${hrs}h ${mins}m`)
//     }
//   }, 1000)
//   return () => clearInterval(interval)
// }, [item.endAt])
// Add to card:

// <p className='text-sm text-orange-600'>Ends in: {remainingTime}</p>
// Would you like me to:

// Update your Zustand store with history support and auto-expiry?

// Refactor your Flash Sale Manager to include the countdown and non-overlapping validation?

// Help with the backend route logic too (e.g. GET with expired filtering)?

// Let me know which one you'd like to tackle next!

// You said:
// before making adjustments review my zustand store: import { toast } from 'sonner'
// import { create } from 'zustand'
// import { devtools } from 'zustand/middleware'

// interface FlashSaleItem {
//   _id: string
//   productId: string
//   name: string
//   originalPrice: number
//   price: number
//   imageUrls: string
//   endAt: Date
//   startAt:Date
//   discountPercent: number
//   createdBy?: string
  
// }

// interface FlashSaleState {
//   items: FlashSaleItem[]
//   history: FlashSaleItem[]
//   maxItems: number
//   fetchFlashSaleItems: () => Promise<void>
//   addFlashSaleItem: (item: Omit<FlashSaleItem, '_id'>) => Promise<void>
//   deleteFlashSaleItem: (id: string) => Promise<void>
//   decreasePriceByPercentage: (percent: number) => void
//   checkExpiredSales: () => void
// }

// export const useFlashSaleStore = create<FlashSaleState>()(
//   devtools((set, get) => ({
//     items: [],
//     maxItems: 10,

//     fetchPromoItems: async () => {
//       try {
//         const res = await fetch('/api/promo')
//         if (!res.ok) throw new Error('Failed to fetch FlashSale items')
//         const data: FlashSaleItem[] = await res.json()
//         set({ items: data })
//       } catch (error) {
//         console.error('fetchFlashSaleItems error:', error)
//       }
//     },

//     addFlashSaleItem: async (item) => {
//       const currentItems = get().items
//       const max = get().maxItems
//       if (currentItems.length >= max) {
//         toast.error(Cannot add more than ${max} items to the FlashSale list.)

//         throw new Error(Cannot add more than ${max} flashsale items)
//       }

//       try {
//         const res = await fetch('/api/flashsale', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(item),
//         })
//         if (!res.ok) {
//           const err = await res.json()
//           throw new Error(err.error || 'Failed to add flashsale item')
//         }
//         const newItem: FlashSaleItem = await res.json()
//         set((state) => ({ items: [...state.items, newItem] }))
//       } catch (error) {
//         console.error('addFlashSaleItem error:', error)
//         throw error
//       }
//     },

//     deleteFlashSaleItem: async (id) => {
//       try {
//         const res = await fetch(/api/promo/${id}, {
//           method: 'DELETE',
//         })
//         if (!res.ok) throw new Error('Failed to delete FlashSale item')
//         set((state) => ({
//           items: state.items.filter((item) => item._id !== id),
//         }))
//       } catch (error) {
//         console.error('deleteFlashSaleItem error:', error)
//         throw error
//       }
//     },

//     decreasePriceByPercentage: (percent) => {
//       if (percent <= 0 || percent > 100) return
//       const currentItems = get().items
//       const updatedItems = currentItems.map((item) => {
//         const discountAmount = (item.originalPrice * percent) / 100
//         let newPrice = item.price - discountAmount
//         if (newPrice < 0) newPrice = 0
//         return { ...item, price: Number(newPrice.toFixed(2)) }
//       })
//       set({ items: updatedItems })
//     },
//     checkExpiredSales: () => {
//       const now = new Date().toISOString()
//       const { items, history } = get()
//       const [expired, active] = items.reduce<[FlashSaleItem[], FlashSaleItem[]]>(
//         ([expired, active], item) => {
//           return new Date(item.endAt) < new Date(now)
//             ? [[...expired, item], active]
//             : [expired, [...active, item]]
//         },
//         [[], []]
//       )

//       if (expired.length > 0) {
//         set({ items: active, history: [...history, ...expired] })
//       }
//     },
//   }))
// )
// ChatGPT said:
// Thanks for sharing your Zustand store code! Here's a detailed review and assessment, including what's working, issues to fix, and suggested improvements to prepare for implementing enhancements like auto-expiry and history.

// ✅ What's Working Well
// ✔ Clean Interface
// FlashSaleItem is well-defined, including price, date, and product info.

// Store interface includes relevant actions (fetch, add, delete, decreasePriceByPercentage, checkExpiredSales).

// ✔ Core Features Implemented
// addFlashSaleItem includes max item validation.

// deleteFlashSaleItem removes items cleanly.

// decreasePriceByPercentage safely adjusts prices.

// checkExpiredSales partitions expired items and archives them to history.

// ❌ Issues / Inconsistencies to Fix
// 🔴 fetchFlashSaleItems is incorrectly named
// In the store interface, it's declared as:

// fetchFlashSaleItems: () => Promise<void>
// But in the implementation, you wrote:

// fetchPromoItems: async () => { ... }
// ✅ Fix: Rename to match interface

// fetchFlashSaleItems: async () => { ... }
// 🟠 history is missing from the initial state
// Your state interface defines history: FlashSaleItem[], but you never initialize it.

// ✅ Fix: Add history to initial state:

// history: [],
// 🟠 Inconsistent API endpoints
// fetch uses '/api/promo' and '/api/promo/${id}'

// addFlashSaleItem uses '/api/flashsale'

// Unless /api/promo is intended as an alias for flash sales, this is confusing.

// ✅ Fix:
// Standardize endpoint usage to /api/flashsale unless there’s a clear distinction.

// 🟡 checkExpiredSales is manual-only
// You provide a checkExpiredSales() function, but nothing calls it periodically.

// ✅ Recommendation: Add a call to this in your component using useEffect to auto-clean expired sales every minute:

// useEffect(() => {
//   const interval = setInterval(() => {
//     useFlashSaleStore.getState().checkExpiredSales()
//   }, 60000)
//   return () => clearInterval(interval)
// }, [])
// 🟡 Consider adding updateFlashSaleItem for future extensibility
// You're missing an update action — useful for editing flash sales if needed later.

// ✅ Summary of Fixes
// Issue	Fix
// fetchFlashSaleItems name mismatch	Rename fetchPromoItems to fetchFlashSaleItems
// Missing history state	Add history: [] to initial state
// Inconsistent API routes	Standardize to /api/flashsale
// Expired sales not auto-checked	Call checkExpiredSales in a component with useEffect
// No updateFlashSaleItem	Optional: Add later if edit functionality needed
// ✅ Final (Fixed) Version Snippet
// Here's the corrected structure for your Zustand store:

// export const useFlashSaleStore = create<FlashSaleState>()(
//   devtools((set, get) => ({
//     items: [],
//     history: [],
//     maxItems: 10,

//     fetchFlashSaleItems: async () => {
//       try {
//         const res = await fetch('/api/flashsale')
//         if (!res.ok) throw new Error('Failed to fetch flash sale items')
//         const data: FlashSaleItem[] = await res.json()
//         set({ items: data })
//       } catch (error) {
//         console.error('fetchFlashSaleItems error:', error)
//       }
//     },

//     addFlashSaleItem: async (item) => {
//       const currentItems = get().items
//       const max = get().maxItems
//       if (currentItems.length >= max) {
//         toast.error(`Cannot add more than ${max} items to the Flash Sale.`)
//         throw new Error(`Cannot add more than ${max} flash sale items`)
//       }

//       try {
//         const res = await fetch('/api/flashsale', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(item),
//         })
//         if (!res.ok) {
//           const err = await res.json()
//           throw new Error(err.error || 'Failed to add flash sale item')
//         }
//         const newItem: FlashSaleItem = await res.json()
//         set((state) => ({ items: [...state.items, newItem] }))
//       } catch (error) {
//         console.error('addFlashSaleItem error:', error)
//         throw error
//       }
//     },

//     deleteFlashSaleItem: async (id) => {
//       try {
//         const res = await fetch(`/api/flashsale/${id}`, {
//           method: 'DELETE',
//         })
//         if (!res.ok) throw new Error('Failed to delete flash sale item')
//         const item = get().items.find((i) => i._id === id)
//         set((state) => ({
//           items: state.items.filter((item) => item._id !== id),
//           history: item ? [...state.history, item] : state.history,
//         }))
//       } catch (error) {
//         console.error('deleteFlashSaleItem error:', error)
//         throw error
//       }
//     },

//     decreasePriceByPercentage: (percent) => {
//       if (percent <= 0 || percent > 100) return
//       const updatedItems = get().items.map((item) => {
//         const discountAmount = (item.originalPrice * percent) / 100
//         const newPrice = Math.max(0, item.price - discountAmount)
//         return { ...item, price: Number(newPrice.toFixed(2)) }
//       })
//       set({ items: updatedItems })
//     },

//     checkExpiredSales: () => {
//       const now = new Date()
//       const { items, history } = get()
//       const [expired, active] = items.reduce<[FlashSaleItem[], FlashSaleItem[]]>(
//         ([expired, active], item) =>
//           new Date(item.endAt) < now
//             ? [[...expired, item], active]
//             : [expired, [...active, item]],
//         [[], []]
//       )
//       if (expired.length > 0) {
//         set({ items: active, history: [...history, ...expired] })
//       }
//     },
//   }))
// )
// Let me know if you'd like help next with:

// Adding an auto-refresh hook for expired items.

// Implementing a countdown timer in the UI.

// Backend route fixes for the /api/flashsale.

// Ready when you are!

// You said:
// Refactor your Flash Sale Manager to include the countdown and non-overlapping validation
// ChatGPT said:
// Great — now that your Zustand store is reviewed and ready, here's a full refactored implementation of your Flash Sale Manager page in your Next.js app with the following enhancements:

// ✅ Enhancements Included
// ⏳ Countdown timer showing time remaining for each flash sale.

// 🚫 Validation to prevent overlapping flash sales for the same product.

// 🛑 Disabled past date selections in date picker.

// 📉 Real-time discount preview on form input.

// 🔧 Tech Stack Assumptions
// ✅ shadcn/ui (Form, Input, DatePicker, Button, Card, etc.)

// ✅ Zustand for state management

// ✅ react-hook-form + zod for form validation

// ✅ date-fns for time handling

// ✅ Refactored FlashSaleManager.tsx
// 'use client'

// import { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { differenceInSeconds, formatDistanceToNow, isBefore, isAfter, parseISO } from 'date-fns'

// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { toast } from 'sonner'
// import { useFlashSaleStore } from '@/store/flashSaleStore'
// import { Calendar } from '@/components/ui/calendar'
// import { Label } from '@/components/ui/label'

// const formSchema = z.object({
//   productId: z.string().min(1, 'Product ID required'),
//   name: z.string().min(1),
//   originalPrice: z.number().positive(),
//   discountPercent: z.number().min(1).max(99),
//   startAt: z.date(),
//   endAt: z.date()
// }).refine(data => isBefore(data.startAt, data.endAt), {
//   message: 'Start date must be before end date',
//   path: ['endAt'],
// })

// export default function FlashSaleManager() {
//   const {
//     items,
//     fetchFlashSaleItems,
//     addFlashSaleItem,
//     deleteFlashSaleItem,
//     checkExpiredSales,
//   } = useFlashSaleStore()

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors }
//   } = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       discountPercent: 10,
//     },
//   })

//   const discountPercent = watch('discountPercent')
//   const originalPrice = watch('originalPrice')
//   const discountedPrice = originalPrice && discountPercent
//     ? originalPrice - (originalPrice * discountPercent) / 100
//     : 0

//   // Fetch on mount
//   useEffect(() => {
//     fetchFlashSaleItems()
//     const interval = setInterval(() => {
//       checkExpiredSales()
//     }, 10000)
//     return () => clearInterval(interval)
//   }, [])

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     // Prevent overlapping sale for the same product
//     const overlaps = items.some(item =>
//       item.productId === data.productId &&
//       ((isBefore(data.startAt, new Date(item.endAt)) &&
//         isAfter(data.endAt, new Date(item.startAt))))
//     )

//     if (overlaps) {
//       toast.error('This product already has a flash sale during this time.')
//       return
//     }

//     try {
//       await addFlashSaleItem({
//         ...data,
//         price: discountedPrice,
//         imageUrls: '/placeholder.jpg', // adjust as needed
//       })
//       toast.success('Flash Sale Item added!')
//       reset()
//     } catch (err) {
//       toast.error('Failed to add item')
//     }
//   }

//   const now = new Date()

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       {/* Flash Sale Form */}
//       <div className="p-4 border rounded-xl shadow">
//         <h2 className="text-xl font-bold mb-4">Add Flash Sale Item</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <Label>Product ID</Label>
//             <Input {...register('productId')} />
//             {errors.productId && <p className="text-red-500">{errors.productId.message}</p>}
//           </div>
//           <div>
//             <Label>Product Name</Label>
//             <Input {...register('name')} />
//           </div>
//           <div>
//             <Label>Original Price</Label>
//             <Input type="number" step="0.01" {...register('originalPrice', { valueAsNumber: true })} />
//           </div>
//           <div>
//             <Label>Discount (%)</Label>
//             <Input type="number" {...register('discountPercent', { valueAsNumber: true })} />
//           </div>
//           <div>
//             <Label>Start At</Label>
//             <Calendar
//               mode="single"
//               selected={watch('startAt')}
//               onSelect={(date) => setValue('startAt', date!)}
//               disabled={(date) => date < now}
//             />
//             {errors.startAt && <p className="text-red-500">{errors.startAt.message}</p>}
//           </div>
//           <div>
//             <Label>End At</Label>
//             <Calendar
//               mode="single"
//               selected={watch('endAt')}
//               onSelect={(date) => setValue('endAt', date!)}
//               disabled={(date) => date < now}
//             />
//             {errors.endAt && <p className="text-red-500">{errors.endAt.message}</p>}
//           </div>
//           <p className="text-muted-foreground">
//             Final Price: <span className="font-semibold text-green-600">${discountedPrice.toFixed(2)}</span>
//           </p>
//           <Button type="submit">Add Flash Sale</Button>
//         </form>
//       </div>

//       {/* Flash Sale List with Countdown */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-bold mb-2">Active Flash Sales</h2>
//         {items.length === 0 ? (
//           <p className="text-muted-foreground">No active flash sales.</p>
//         ) : (
//           items.map(item => {
//             const remaining = differenceInSeconds(new Date(item.endAt), now)
//             const timeLeft = formatDistanceToNow(new Date(item.endAt), { includeSeconds: true })

//             return (
//               <Card key={item._id}>
//                 <CardContent className="p-4 space-y-2">
//                   <p><strong>{item.name}</strong></p>
//                   <p>Price: <span className="line-through">${item.originalPrice}</span> → <span className="text-green-600">${item.price}</span></p>
//                   <p className="text-sm text-muted-foreground">Ends in: {timeLeft}</p>
//                   <Button variant="destructive" onClick={() => deleteFlashSaleItem(item._id)}>Remove</Button>
//                 </CardContent>
//               </Card>
//             )
//           })
//         )}
//       </div>
//     </div>
//   )
// }
// 🧠 Key Features Explained
// Feature	Details
// Countdown	Uses formatDistanceToNow() from date-fns to show remaining time.
// Overlap Validation	Prevents adding a sale if the product already has a conflicting time window.
// Disabled Past Dates	Prevents selecting dates in the past using disabled={(date) => date < new Date()}
// Real-Time Price Preview	Auto-updates price using watch() on discount and original price.
// Auto-Cleanup	Periodically checks expired items every 10 seconds via setInterval.
// Would you like:

// To highlight expired flash sales in a separate list?

// To add edit functionality for flash sale entries?

// A backend validation layer for overlaps?

// Let me know how you want to expand it!

// You said:
//  the refactored page lacks the search component from the page i had uploaded it, useState is not used in this page 
// ChatGPT said:
// You're absolutely right — the refactored page I gave you removed the product search autocomplete that was part of your original version, and I didn't include a real use of useState where it had been used for that interactive component. Let’s fix that fully.

// ✅ Updated Flash Sale Manager Page
// This version:

// ✅ Brings back the search/autocomplete for product selection

// ✅ Uses useState for search term and product list

// ✅ Keeps the ⏳ countdown

// ✅ Keeps 🚫 non-overlapping validation

// ✅ Keeps 📉 real-time discount preview

// 🧱 Assumptions
// You have a product search API endpoint like:

// GET /api/products?q=term
// ...which returns:

// type Product = {
//   _id: string
//   name: string
//   price: number
//   imageUrls: string
// }
// ✅ Updated Code
// 'use client'

// import { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { formatDistanceToNow, differenceInSeconds, isBefore, isAfter } from 'date-fns'

// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { toast } from 'sonner'
// import { useFlashSaleStore } from '@/store/flashSaleStore'
// import { Calendar } from '@/components/ui/calendar'
// import { Label } from '@/components/ui/label'

// const formSchema = z.object({
//   productId: z.string().min(1, 'Product required'),
//   name: z.string().min(1),
//   originalPrice: z.number().positive(),
//   discountPercent: z.number().min(1).max(99),
//   startAt: z.date(),
//   endAt: z.date(),
// }).refine(data => isBefore(data.startAt, data.endAt), {
//   message: 'Start date must be before end date',
//   path: ['endAt'],
// })

// export default function FlashSaleManager() {
//   const {
//     items,
//     fetchFlashSaleItems,
//     addFlashSaleItem,
//     deleteFlashSaleItem,
//     checkExpiredSales,
//   } = useFlashSaleStore()

//   const [searchTerm, setSearchTerm] = useState('')
//   const [searchResults, setSearchResults] = useState<
//     { _id: string; name: string; price: number; imageUrls: string }[]
//   >([])

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       discountPercent: 10,
//     },
//   })

//   const discountPercent = watch('discountPercent')
//   const originalPrice = watch('originalPrice')
//   const discountedPrice = originalPrice && discountPercent
//     ? originalPrice - (originalPrice * discountPercent) / 100
//     : 0

//   // Fetch flash sales on load
//   useEffect(() => {
//     fetchFlashSaleItems()
//     const interval = setInterval(() => {
//       checkExpiredSales()
//     }, 10000)
//     return () => clearInterval(interval)
//   }, [])

//   // Handle product search
//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (!searchTerm.trim()) return setSearchResults([])

//       try {
//         const res = await fetch(`/api/products?q=${searchTerm}`)
//         const data = await res.json()
//         setSearchResults(data)
//       } catch (err) {
//         console.error('Search error:', err)
//         setSearchResults([])
//       }
//     }

//     const delay = setTimeout(fetchSearchResults, 300)
//     return () => clearTimeout(delay)
//   }, [searchTerm])

//   const onProductSelect = (product: any) => {
//     setValue('productId', product._id)
//     setValue('name', product.name)
//     setValue('originalPrice', product.price)
//     setSearchTerm(product.name)
//     setSearchResults([])
//   }

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     const overlaps = items.some(item =>
//       item.productId === data.productId &&
//       isBefore(data.startAt, new Date(item.endAt)) &&
//       isAfter(data.endAt, new Date(item.startAt))
//     )

//     if (overlaps) {
//       toast.error('This product already has a flash sale during this time.')
//       return
//     }

//     try {
//       await addFlashSaleItem({
//         ...data,
//         price: discountedPrice,
//         imageUrls: '/placeholder.jpg',
//       })
//       toast.success('Flash Sale Item added!')
//       reset()
//       setSearchTerm('')
//     } catch {
//       toast.error('Failed to add flash sale item.')
//     }
//   }

//   const now = new Date()

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       {/* Flash Sale Form */}
//       <div className="p-4 border rounded-xl shadow">
//         <h2 className="text-xl font-bold mb-4">Add Flash Sale Item</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <Label>Search Product</Label>
//             <Input
//               placeholder="Search by name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchResults.length > 0 && (
//               <div className="bg-white shadow border mt-1 rounded-lg max-h-48 overflow-auto z-10">
//                 {searchResults.map((product) => (
//                   <div
//                     key={product._id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => onProductSelect(product)}
//                   >
//                     {product.name} – ${product.price}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {errors.productId && <p className="text-red-500">{errors.productId.message}</p>}
//           </div>

//           <div>
//             <Label>Original Price</Label>
//             <Input type="number" {...register('originalPrice', { valueAsNumber: true })} />
//           </div>
//           <div>
//             <Label>Discount (%)</Label>
//             <Input type="number" {...register('discountPercent', { valueAsNumber: true })} />
//           </div>

//           <div>
//             <Label>Start At</Label>
//             <Calendar
//               mode="single"
//               selected={watch('startAt')}
//               onSelect={(date) => setValue('startAt', date!)}
//               disabled={(date) => date < now}
//             />
//           </div>
//           <div>
//             <Label>End At</Label>
//             <Calendar
//               mode="single"
//               selected={watch('endAt')}
//               onSelect={(date) => setValue('endAt', date!)}
//               disabled={(date) => date < now}
//             />
//             {errors.endAt && <p className="text-red-500">{errors.endAt.message}</p>}
//           </div>

//           <p className="text-muted-foreground">
//             Final Price: <span className="text-green-600 font-semibold">${discountedPrice.toFixed(2)}</span>
//           </p>

//           <Button type="submit">Add Flash Sale</Button>
//         </form>
//       </div>

//       {/* Flash Sale List */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-bold mb-2">Active Flash Sales</h2>
//         {items.length === 0 ? (
//           <p className="text-muted-foreground">No active flash sales.</p>
//         ) : (
//           items.map(item => {
//             const timeLeft = formatDistanceToNow(new Date(item.endAt), { includeSeconds: true })

//             return (
//               <Card key={item._id}>
//                 <CardContent className="p-4 space-y-2">
//                   <p><strong>{item.name}</strong></p>
//                   <p>
//                     Price: <span className="line-through">${item.originalPrice}</span> →{' '}
//                     <span className="text-green-600">${item.price}</span>
//                   </p>
//                   <p className="text-sm text-muted-foreground">Ends in: {timeLeft}</p>
//                   <Button variant="destructive" onClick={() => deleteFlashSaleItem(item._id)}>
//                     Remove
//                   </Button>
//                 </CardContent>
//               </Card>
//             )
//           })
//         )}
//       </div>
//     </div>
//   )
// }
// ✅ Summary of Key Fixes
// Feature	Status
// Product search / autocomplete	✅ Restored with useState
// Countdown for sale end	✅ Kept
// Real-time discount price	✅ Kept
// Overlap validation	✅ Ensured
// Calendar date restrictions	✅ Prevent past dates
// Would you like to:

// Add loading spinners for product search or API calls?

// Paginate the product search results?

// Show sale history (expired flash sales)?

// Let me know and I’ll help implement it.

// You said:
// Unhandled Runtime Error


// Error: Invalid time value

// app\(admin-side)\admin\dashboard\flashsale\page.tsx (520:49) @ eval


//   518 |         ) : (
//   519 |           items.map(item => {
// > 520 |             const timeLeft = formatDistanceToNow(new Date(item.endAt), { includeSeconds: true })
//       |                                                 ^
//   521 |
//   522 |             return (
//   523 |               <Card key={item._id}>
// ChatGPT said:
// Thanks for pointing that out.

// ❌ Problem:
// The error Invalid time value at:

// formatDistanceToNow(new Date(item.endAt), { includeSeconds: true })
// ...means that item.endAt is either:

// undefined

// Not a valid Date string

// Already a Date object (and running new Date(Date) fails)

// ✅ Solution:
// We need to ensure item.endAt is parsed safely and only once.

// Replace this line:

// const timeLeft = formatDistanceToNow(new Date(item.endAt), { includeSeconds: true })
// With this safer version:

// const endAt = item.endAt instanceof Date ? item.endAt : new Date(item.endAt)
// const timeLeft = isNaN(endAt.getTime())
//   ? 'Invalid date'
//   : formatDistanceToNow(endAt, { includeSeconds: true })
// ✅ Full Fix Snippet:
// Inside your .map(item => { ... }), do:

// const endAt = item.endAt instanceof Date ? item.endAt : new Date(item.endAt)
// const timeLeft = isNaN(endAt.getTime())
//   ? 'Invalid date'
//   : formatDistanceToNow(endAt, { includeSeconds: true })
// 🧠 Bonus Tip:
// If your backend returns endAt as a string (ISO format), using new Date(endAt) is correct — but you should never run new Date() on a Date object, hence the check above.

// Let me know if you'd like to also format start/end times or show countdowns in seconds/minutes with setInterval.

// You said:
// the start at and end at calendars should be hidden and only open when the user clicks the start at or end at. add an input field that shows the set duration from the calendar. add  countdowns in seconds/minutes ,populate original price. the image card should have all of the products details such as the image, price, crossed original price the new price and counter to indicate when the flashsale ends
// ChatGPT said:
// Updated saved memory
// Got it! I'll refactor the Flash Sale Manager accordingly with the following updates:

// Start/End Calendar Inputs: They’ll show date pickers only when clicked.

// Duration Field: Displays the time span between start and end.

// Countdown Timer: Real-time countdown shown in seconds/minutes.

// Auto-fill Original Price: Automatically populated from selected product.

// Product Card Display: Includes image, name, original price (struck-through), discounted price, and countdown.

// I'll proceed to implement this and share the updated code with you.

// ✅ Flash Sale Manager has been fully refactored with the following enhancements:

// Clickable start/end calendar inputs that open the picker on focus.

// Auto-updated duration field showing the difference between start and end time.

// Real-time countdown timer in minutes/seconds.

// Original price auto-filled when a product is selected.

// Improved product card: image, name, original and discounted prices, and time left display.

// Let me know if you'd like styling enhancements or to make the countdown auto-refresh every second.

// You said:
// why are my cards displaying the same countdown time yet the products have different countdown duration. here is my code review it: 
// 'use client'

// import { useEffect, useState } from 'react'
// import { differenceInSeconds, intervalToDuration, isBefore } from 'date-fns'

// interface CountdownTimerProps {
//   endAt: string
//   startAt?: string // for progress bar
// }

// export default function CountdownTimer({ endAt, startAt }: CountdownTimerProps) {
//   const [durationStr, setDurationStr] = useState('')
//   const [percentElapsed, setPercentElapsed] = useState(0)
//   const [timeColor, setTimeColor] = useState('text-green-600')

//   useEffect(() => {
//     const updateCountdown = () => {
//       const now = new Date()
//       const end = new Date(endAt)
//       const start = startAt ? new Date(startAt) : new Date()

//       if (isBefore(end, now)) {
//         setDurationStr('Ended')
//         setPercentElapsed(100)
//         setTimeColor('text-gray-500')
//         return
//       }

//       const totalSeconds = differenceInSeconds(end, start)
//       const elapsedSeconds = differenceInSeconds(now, start)
//       const progress = Math.min((elapsedSeconds / totalSeconds) * 100, 100)

//       const diff = intervalToDuration({ start: now, end })
//       const formatted = ${diff.days}d ${diff.hours}h ${diff.minutes}m ${diff.seconds}s

//       // Color logic
//       const timeLeft = differenceInSeconds(end, now)
//       if (timeLeft < 3600) setTimeColor('text-red-600')
//       else if (timeLeft < 86400) setTimeColor('text-yellow-600')
//       else setTimeColor('text-green-600')

//       setDurationStr(formatted)
//       setPercentElapsed(progress)
//     }

//     updateCountdown()
//     const interval = setInterval(updateCountdown, 1000)
//     return () => clearInterval(interval)
//   }, [endAt, startAt])

//   return (
//     <div className="space-y-1">
//       <span className={font-mono text-sm ${timeColor}}>{durationStr}</span>
//       <div className="h-1 bg-gray-200 rounded">
//         <div
//           className="h-full bg-gradient-to-r from-green-400 to-red-500 rounded"
//           style={{ width: ${percentElapsed}%, transition: 'width 1s linear' }}
//         />
//       </div>
//     </div>
//   )
// } : page.tsx : 'use client'
// import CountdownTimer from '@/components/countdown'
// import { Card, CardContent } from '@/components/ui/card'
// import { useEffect, useRef, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Calendar } from '@/components/ui/calendar'
// import { CalendarIcon, Trash2 } from 'lucide-react'
// import { useFlashSaleStore } from '@/stores/FlashSale'
// import { formatDuration, intervalToDuration } from 'date-fns'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/db/essentials/utils'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { format } from 'date-fns'

// const FormSchema = z.object({
//   startAt: z.date({ required_error: 'Start date is required.' }),
//   endAt: z.date({ required_error: 'End date is required.' }),
// })

// interface Product {
//   _id: string
//   name: string
//   imageUrls: string
//   originalPrice: number
//   startAt: Date
//   endAt: Date
// }

// const formatPrice = (value: number) =>
//   new Intl.NumberFormat('en-KE', {
//     style: 'currency',
//     currency: 'KES',
//   }).format(value)

// export default function FlashSaleManager() {
//   const { items, fetchFlashSaleItems, addFlashSaleItem, deleteFlashSaleItem } =
//     useFlashSaleStore()

//   const [productId, setProductId] = useState('')
//   const [name, setName] = useState('')
//   const [originalPrice, setOriginalPrice] = useState('')
//   const [discountAmount, setDiscountAmount] = useState('')
//   const [discountPercent, setDiscountPercent] = useState('')
//   const [newPrice, setNewPrice] = useState('')
//   const [imageUrls, setImageUrl] = useState('')
//   const [duration, setDuration] = useState('')
//   const [errors, setErrors] = useState<{ [key: string]: string }>({})
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<Product[]>([])
//   const [showDropdown, setShowDropdown] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const original = parseFloat(originalPrice)

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       startAt: undefined,
//       endAt: undefined,
//     },
//   })

//   const { watch, setValue } = form
//   const startAt = watch('startAt')
//   const endAt = watch('endAt')

//   useEffect(() => {
//     fetchFlashSaleItems()
//   }, [fetchFlashSaleItems])

//   useEffect(() => {
//     if (searchQuery.length < 2) {
//       setSearchResults([])
//       return
//     }

//     let cancelled = false
//     async function fetchProducts() {
//       try {
//         const res = await fetch(
//           /api/products/search?search=${encodeURIComponent(searchQuery)}
//         )
//         if (!res.ok) throw new Error('Failed to fetch products')
//         const data: Product[] = await res.json()
//         if (!cancelled) setSearchResults(data)
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchProducts()
//     return () => {
//       cancelled = true
//     }
//   }, [searchQuery])

//   useEffect(() => {
//     function onClickOutside(e: MouseEvent) {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       ) {
//         setShowDropdown(false)
//       }
//     }
//     document.addEventListener('mousedown', onClickOutside)
//     return () => document.removeEventListener('mousedown', onClickOutside)
//   }, [])

//   useEffect(() => {
//     if (startAt && endAt) {
//       const duration = intervalToDuration({
//         start: new Date(startAt),
//         end: new Date(endAt),
//       })
//       setDuration(formatDuration(duration))
//     }
//   }, [startAt, endAt])

//   const validate = () => {
//     const errs: { [key: string]: string } = {}
//     if (!productId) errs.productId = 'Select a product'
//     if (!newPrice || isNaN(Number(newPrice)))
//       errs.newPrice = 'Enter valid new price'
//     if (items.find((item) => item.productId === productId))
//       errs.duplicate = 'Product already in promo list'
//     setErrors(errs)
//     return Object.keys(errs).length === 0
//   }

//   const handleSelect = (product: Product) => {
//     setProductId(product._id)
//     setName(product.name)
//     setOriginalPrice(product.originalPrice.toString())
//     setNewPrice('')
//     setDiscountAmount('')
//     setDiscountPercent('')
//     setImageUrl(product.imageUrls)
//     setSearchQuery(product.name)
//     setShowDropdown(false)
//     setErrors({})
//     form.reset()
//     setDuration('')
//   }

//   const handleAdd = async () => {
//     if (!validate() || items.length >= 10) return

//     try {
//       await addFlashSaleItem({
//         productId,
//         name,
//         originalPrice: Number(originalPrice),
//         price: Number(newPrice),
//         imageUrls,
//         startAt: startAt?.toISOString() || '',
//         endAt: endAt?.toISOString() || '',
//         discountPercent: parseFloat(discountPercent),
//       })

//       setProductId('')
//       setName('')
//       setOriginalPrice('')
//       setDiscountAmount('')
//       setDiscountPercent('')
//       setNewPrice('')
//       setImageUrl('')
//       setSearchQuery('')
//       setSearchResults([])
//       setErrors({})
//       form.reset()
//       setDuration('')
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const onDiscountAmountChange = (val: string) => {
//     setDiscountAmount(val)
//     const d = parseFloat(val)
//     if (!isNaN(d) && original) {
//       const newP = original - d
//       const percent = (d / original) * 100
//       setNewPrice(newP.toFixed(2))
//       setDiscountPercent(percent.toFixed(2))
//     }
//   }

//   const onDiscountPercentChange = (val: string) => {
//     setDiscountPercent(val)
//     const p = parseFloat(val)
//     if (!isNaN(p) && original) {
//       const d = (p / 100) * original
//       const newP = original - d
//       setDiscountAmount(d.toFixed(2))
//       setNewPrice(newP.toFixed(2))
//     }
//   }

//   const renderDatePicker = (name: 'startAt' | 'endAt', label: string) => (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className='flex flex-col'>
//           <FormLabel className='mb-1 font-medium'>{label}</FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant='outline'
//                   className={cn(
//                     'w-[240px] pl-3 text-left font-normal',
//                     !field.value && 'text-muted-foreground'
//                   )}
//                 >
//                   {field.value ? format(field.value, 'PPP') : 'Pick a date'}
//                   <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className='w-auto p-0' align='start'>
//               <Calendar
//                 mode='single'
//                 selected={field.value}
//                 onSelect={field.onChange}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )

//   return (
//     <div className='max-w-5xl mx-auto p-6'>
//       <h1 className='text-3xl font-bold mb-6'>Flash Sale Items</h1>

//       <div
//         className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative'
//         ref={containerRef}
//       >
//         <div className='col-span-4'>
//           <label className='block mb-1 font-medium'>Search product</label>
//           <Input
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value)
//               setShowDropdown(true)
//             }}
//             onFocus={() => setShowDropdown(true)}
//             placeholder='Search product...'
//           />
//           {showDropdown && searchResults.length > 0 && (
//             <ul className='absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md'>
//               {searchResults.map((product) => (
//                 <li
//                   key={product._id}
//                   className='p-2 cursor-pointer hover:bg-blue-100'
//                   onClick={() => handleSelect(product)}
//                 >
//                   {product.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Original Price</label>
//           <Input value={formatPrice(Number(originalPrice))} readOnly />
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Discount Amount</label>
//           <Input
//             type='number'
//             placeholder='e.g. 200'
//             value={discountAmount}
//             onChange={(e) => onDiscountAmountChange(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className='block mb-1 font-medium'>Discount %</label>
//           <Input
//             type='number'
//             placeholder='e.g. 20'
//             value={discountPercent}
//             onChange={(e) => onDiscountPercentChange(e.target.value)}
//           />
//         </div>

//         <div className='col-span-2'>
//           <Form {...form}>
//             <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               {renderDatePicker('startAt', 'Start Date')}
//               {renderDatePicker('endAt', 'End Date')}
//             </form>
//           </Form>
//         </div>
//         <div>
//           <label className='block mb-1 font-medium'>Duration</label>
//           <Input type='text' placeholder='duration' value={duration} />
//         </div>
//         {errors.duplicate && (
//           <p className='text-red-600 col-span-4'>{errors.duplicate}</p>
//         )}

//         <div className='col-span-4'>
//           <Button
//             onClick={handleAdd}
//             disabled={
//               !productId ||
//               !newPrice ||
//               items.length >= 10 ||
//               Object.keys(errors).length > 0
//             }
//           >
//             Add to Flash Sale
//           </Button>
//         </div>
//       </div>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//   {items.map((item) => {
//     const discount = item.originalPrice - item.price
//     const percent = ((discount / item.originalPrice) * 100).toFixed(1)
//     return (
//       <Card key={item._id} className="relative">
//         <CardContent className="p-4 space-y-2">
//           <img src={item.imageUrls} alt={item.name} className="w-full h-32 object-cover rounded" />
//           <h2 className="font-semibold">{item.name}</h2>
//           <p className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</p>
//           <p className="text-lg font-bold text-green-600">{formatPrice(item.price)} ({percent}% OFF)</p>
//           <div>
//             <span className="text-xs text-muted-foreground">Ends in:</span>{' '}
//             <CountdownTimer startAt={item.startAt} endAt={item.endAt} />
//           </div>
//           <Button
//             variant="destructive"
//             size="sm"
//             className="absolute top-2 right-2"
//             onClick={() => deleteFlashSaleItem(item._id)}
//           >
//             <Trash2 size={16} />
//           </Button>
//         </CardContent>
//       </Card>
//     )
//   })}
// </div>

//     </div>
//   )
// } 
// ChatGPT said:

// Thought for 8 seconds
// The symptom—“all cards showing the exact same countdown even though each product should end at a different time”—almost always comes down to one of two things:

// Every item.endAt you’re passing into <CountdownTimer /> is actually the same value (or invalid/empty), so the timer logic has no way to distinguish one card from another.

// The way CountdownTimer parses endAt (and startAt) only ever sees a single “reference” date, so every timer ends up computing from the same timestamp.

// Below are the two most common root‐causes and how to fix them. In most cases, it’s simply a matter of making sure each card really does get its own unique, valid endAt string (or Date), and that CountdownTimer always uses that prop correctly.

// 1. Make sure each card’s endAt (and startAt) are actually different
// In your mapping code you have:

// {items.map((item) => (
//   <Card key={item._id} className="relative">
//     …
//     <CountdownTimer startAt={item.startAt} endAt={item.endAt} />
//     …
//   </Card>
// ))}
// Go back to where items is coming from (your Zustand store + API). Almost always the reason “every card looks identical” is that item.endAt ended up being either:

// The same ISO string for every item (e.g. ":00.000Z"), or

// An empty/invalid string (so new Date(item.endAt) always parses into Invalid Date), or

// A JavaScript Date object that was never serialized back to string—so React “sees” the prop as the same reference for every render.

// The easiest way to verify this is to sprinkle a quick console.log(item._id, item.endAt) right before you render the cards. You should see unique _id and unique end‐times:

// {items.map((item) => {
//   console.log('Card', item._id, 'endAt →', item.endAt)
//   return (
//     <Card key={item._id} className="relative">
//       …
//       <CountdownTimer startAt={item.startAt} endAt={item.endAt} />
//       …
//     </Card>
//   )
// })}
// If that console.log prints the same timestamp string (or undefined) for every item, then the root cause is that the store/API is returning identical or invalid endAt. Fix that first—make sure your API returns:

// [
//   { "_id": "abc123", "startAt": "2025-05-28T12:00:00.000Z", "endAt": "2025-05-28T14:00:00.000Z", … },
//   { "_id": "def456", "startAt": "2025-05-28T15:00:00.000Z", "endAt": "2025-05-28T16:30:00.000Z", … }, 
//   …
// ]
// If you see something like:

// Card abc123 endAt → "" 
// Card def456 endAt → ""
// Card ghi789 endAt → "" 
// …or all three have endAt → "2025-05-28T14:00:00.000Z", that’s why every countdown looks the same.

// 2. Ensure CountdownTimer parses its props correctly
// Assuming your API is returning distinct ISO strings, make sure you’re always calling new Date(endAt) once inside each timer’s effect—never accidentally re‐using a stale value.

// Here’s a bullet‐proof version of CountdownTimer that:

// Accepts endAt (ISO string) and optional startAt (ISO string).

// Re‐computes “time left” every second.

// Shows “Ended” once now ≥ endAt.

// 'use client'
// import { useEffect, useState } from 'react'
// import { differenceInSeconds, intervalToDuration, isBefore } from 'date-fns'

// interface CountdownTimerProps {
//   endAt: string      // ISO string
//   startAt?: string   // ISO string (optional; only used if you want a progress bar)
// }

// export default function CountdownTimer({ endAt, startAt }: CountdownTimerProps) {
//   const [durationStr, setDurationStr] = useState<string>('')  
//   const [percentElapsed, setPercentElapsed] = useState<number>(0)  
//   const [timeColor, setTimeColor] = useState<string>('text-green-600')

//   useEffect(() => {
//     // Parse endAts and startAts once when props change
//     const endDate = new Date(endAt)
//     // If startAt is provided and valid, use it; otherwise use "now" as start
//     const startDate = startAt ? new Date(startAt) : new Date()

//     if (isNaN(endDate.getTime())) {
//       setDurationStr('Invalid date')
//       setPercentElapsed(100)
//       setTimeColor('text-gray-500')
//       return
//     }

//     const totalSeconds = Math.max(differenceInSeconds(endDate, startDate), 0)

//     const update = () => {
//       const now = new Date()

//       if (isBefore(endDate, now)) {
//         // Timer is finished
//         setDurationStr('Ended')
//         setPercentElapsed(100)
//         setTimeColor('text-gray-500')
//         return
//       }

//       // 1️⃣ Compute “time left” for display
//       const diff = intervalToDuration({ start: now, end: endDate })
//       const formatted = `${diff.days}d ${diff.hours}h ${diff.minutes}m ${diff.seconds}s`
//       setDurationStr(formatted)

//       // 2️⃣ Compute “percent elapsed” from start → end
//       const elapsedSeconds = differenceInSeconds(now, startDate)
//       const progress = Math.min((elapsedSeconds / totalSeconds) * 100, 100)
//       setPercentElapsed(progress)

//       // 3️⃣ Color logic based on seconds left
//       const secondsLeft = differenceInSeconds(endDate, now)
//       if (secondsLeft < 3600) {
//         setTimeColor('text-red-600')
//       } else if (secondsLeft < 86400) {
//         setTimeColor('text-yellow-600')
//       } else {
//         setTimeColor('text-green-600')
//       }
//     }

//     // Run immediately once, then every second
//     update()
//     const intervalId = setInterval(update, 1000)
//     return () => clearInterval(intervalId)
//   }, [endAt, startAt])

//   return (
//     <div className="space-y-1">
//       <span className={`font-mono text-sm ${timeColor}`}>{durationStr}</span>
//       <div className="h-1 bg-gray-200 rounded">
//         <div
//           className="h-full bg-gradient-to-r from-green-400 to-red-500 rounded"
//           style={{ width: `${percentElapsed}%`, transition: 'width 1s linear' }}
//         />
//       </div>
//     </div>
//   )
// }
// Key points to double‐check:

// We parse endDate = new Date(endAt) only once (inside useEffect’s body) as soon as the prop changes.

// We check isNaN(endDate.getTime()) to guard against “invalid” strings.

// We compute intervalToDuration({ start: now, end: endDate }) so every instance of the component shows exactly how many days/hours/minutes/seconds are left—independently.

// We use differenceInSeconds(endDate, startDate) and differenceInSeconds(now, startDate) to calculate percentElapsed.

// The effect’s dependency array is [endAt, startAt], so if each <CountdownTimer> gets a different endAt string, each timer’s state is entirely local and won’t clobber the others.

// Checklist to Fix “Same Countdown on Every Card”
// Verify your data

// Add a quick console.log(item._id, item.endAt, item.startAt) inside your card‐render loop to make sure each item.endAt is indeed different:

// {items.map(item => {
//   console.log('DEBUG:', item._id, '→ endAt =', item.endAt)
//   return (
//     <Card key={item._id} className="relative">
//       … <CountdownTimer startAt={item.startAt} endAt={item.endAt} /> …
//     </Card>
//   )
// })}
// If you see the same timestamp or an empty string for every item, you must fix your API/store so that each item.endAt is unique.

// Ensure correct prop types

// Make sure item.endAt is always a valid ISO string (e.g. "2025-05-28T15:30:00.000Z") when you pass it into <CountdownTimer endAt={…} />.

// In your code you were sometimes passing a Date object, sometimes a string. Converting to ISO before saving in the store is usually safest (so the prop is always string).

// Use the updated CountdownTimer

// Copy/paste the version above exactly—notice how we parse new Date(endAt) once per component, and how each hook’s state is local.

// If you still see the same countdown on every card after that, it means that once you log item._id, item.endAt, you’ll find they’re in fact identical.

// Example: Verifying Unique End‐Times
// Below is a minimal snippet inside your FlashSaleManager to confirm each card’s endAt is different:

// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//   {items.map((item) => {
//     // DEBUG: print endAt for each item
//     console.log('Card ID:', item._id, '→ endAt:', item.endAt)

//     return (
//       <Card key={item._id} className="relative">
//         <CardContent className="p-4 space-y-2">
//           <img
//             src={item.imageUrls}
//             alt={item.name}
//             className="w-full h-32 object-cover rounded"
//           />
//           <h2 className="font-semibold">{item.name}</h2>
//           <p className="text-sm text-gray-500 line-through">
//             {formatPrice(item.originalPrice)}
//           </p>
//           <p className="text-lg font-bold text-green-600">
//             {formatPrice(item.price)} ({((item.originalPrice - item.price) / item.originalPrice * 100).toFixed(1)}% OFF)
//           </p>
//           <div>
//             <span className="text-xs text-muted-foreground">Ends in:</span>{' '}
//             <CountdownTimer
//               startAt={item.startAt?.toString() || ''}
//               endAt={item.endAt?.toString() || ''}
//             />
//           </div>
//         </CardContent>
//       </Card>
//     )
//   })}
// </div>
// After you save & reload, open your browser’s console. You should see each product’s unique _id followed by its unique endAt string. If it’s not unique, that’s the bug.

// In Summary
// Data needs to be unique: If every <CountdownTimer> sees the same endAt (or an invalid string), they’ll all show the same countdown.

// Parse your ISO strings correctly: Always do new Date( endAt ) inside the component’s useEffect so each instance has its own “target” date.

// Use the revised CountdownTimer above so that each instance runs its own interval instead of sharing state.

// Once you verify each item.endAt is distinct, and switch to the bulletproof CountdownTimer code, your cards will display the correct, independent countdown for each product.

// You said:
// generate a image skeleton for next js images
// ChatGPT said:
// Below is a small React component you can drop into your Next.js project that wraps the built‐in <Image> component and shows a Tailwind-powered “skeleton” (animate-pulse gray box) until the image has fully loaded.

// // components/NextImageWithSkeleton.tsx
// 'use client'

// import { useState } from 'react'
// import Image, { ImageProps } from 'next/image'
// import clsx from 'clsx'

// interface NextImageWithSkeletonProps extends ImageProps {
//   /** optional Tailwind classes for the wrapper */
//   className?: string
//   /** optional Tailwind classes for the skeleton placeholder */
//   skeletonClassName?: string
// }

// export default function NextImageWithSkeleton({
//   className,
//   skeletonClassName,
//   ...imgProps
// }: NextImageWithSkeletonProps) {
//   const [isLoading, setIsLoading] = useState(true)

//   return (
//     <div className={clsx('relative overflow-hidden', className)}>
//       {/* 1) Skeleton placeholder */}
//       {isLoading && (
//         <div
//           className={clsx(
//             'absolute inset-0 bg-gray-200 animate-pulse',
//             skeletonClassName
//           )}
//         />
//       )}

//       {/* 2) Next.js Image itself */}
//       <Image
//         {...imgProps}
//         className={clsx(
//           imgProps.className,
//           // hide the actual <img> element until loading completes
//           isLoading && 'opacity-0'
//         )}
//         onLoadingComplete={() => setIsLoading(false)}
//       />
//     </div>
//   )
// }
// How it works
// Container <div>
// We wrap everything in a <div className="relative overflow-hidden"> so that both the skeleton placeholder and the real <Image> occupy exactly the same dimensions.

// Skeleton <div>

// {isLoading && (
//   <div className="absolute inset-0 bg-gray-200 animate-pulse" />
// )}
// absolute inset-0 ensures the skeleton covers the full container.

// bg-gray-200 animate-pulse makes a subtle gray block that pulses, serving as the loading “skeleton.”

// You can override or add more Tailwind classes via the optional skeletonClassName prop.

// Next.js <Image>

// <Image
//   {...imgProps}
//   className={clsx(imgProps.className, isLoading && 'opacity-0')}
//   onLoadingComplete={() => setIsLoading(false)}
// />
// We spread all the usual ImageProps (e.g. src, width, height, alt).

// While isLoading is true, we add opacity-0 to make the image invisible so the skeleton shows behind it.

// Once onLoadingComplete fires, we call setIsLoading(false), removing the skeleton and revealing the real image in place.

// Usage example
// import NextImageWithSkeleton from '@/components/NextImageWithSkeleton'

// export default function ProductCard() {
//   return (
//     <div className="max-w-sm mx-auto">
//       <NextImageWithSkeleton
//         src="/images/sample-product.jpg"
//         alt="Sample Product"
//         width={400}
//         height={400}
//         className="rounded-lg object-cover"
//         skeletonClassName="rounded-lg"
//       />
//       <h2 className="mt-4 text-lg font-medium">Awesome Product</h2>
//       <p className="text-gray-600">$29.99</p>
//     </div>
//   )
// }
// Notes:

// Adjust width/height or use fill + a parent container’s dimensions to suit your layout.

// Tweak bg-gray-200 or animate-pulse to match your design (e.g. use bg-gray-300 or animate-pulse/75).

// If you use fill instead of hardcoded width/height, just ensure the wrapper <div> has a fixed aspect ratio (e.g. aspect-w-1 aspect-h-1).

// With this in place, every time you render <NextImageWithSkeleton>, you’ll see a pulsing gray block until the actual image file has loaded, then it fades in seamlessly.

// You said:
// i want an actual image generate it
// ChatGPT said:

// Image created
// Generated image
// Generated image
// Generated image



// Share
// You said:
// analyze for errors. "use client"; 

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
// import { useCartStore } from "@/stores/cart";
// import Price from "@/lib/utils/format";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useEffect, useState } from "react";

// export default function CheckoutPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { items, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCartStore();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [address, setAddress] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Visa");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const subtotal = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
//   const deliveryCost = 0;
//   const discount = 3;
//   const total = subtotal + deliveryCost - discount;

//   useEffect(() => {
//     if (items.length === 0) router.push("/cart");
//   }, [items, router]);

//   // Show a loading UI while session is loading
//   if (status === "loading") {
//     return (
//       <main className="p-6 max-w-7xl mx-auto text-center">
//         <p className="text-xl text-gray-600">Checking your login status...</p>
//       </main>
//     );
//   }

//   const onQuantityChange = (id: string, newQty: number) => {
//     if (newQty < 1) {
//       removeFromCart(id);
//     } else {
//       const currentItem = items.find((item) => item._id === id);
//       if (!currentItem) return;
//       const diff = newQty - currentItem.quantity;
//       if (diff > 0) {
//         for (let i = 0; i < diff; i++) increaseQuantity(id);
//       } else {
//         for (let i = 0; i < -diff; i++) decreaseQuantity(id);
//       }
//     }
//   };

//   const handleOrderSubmit = async () => {
    

//     if (status === "unauthenticated" || !session){
//       toast.error("Please log in to place an order.");
//       router.push("/login");
//       return;
//     }
   

//     if (!firstName || !lastName || !email || !phone || !address || !country || !city || !postalCode) {
//       toast.error("Please fill in all the required fields.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: session.user!.id,
//           customer: {
//             firstName,
//             lastName,
//             email,
//             phone,
//             address,
//             city,
//             country,
//             postalCode,
//           },
//           paymentMethod,
//           items: items.map((item) => ({
//             id: item._id,
//             name: item.name,
//             price: item.originalPrice,
//             quantity: item.quantity,
//           })),
//           total,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         console.error("Checkout error response:", data);
//         throw new Error(data.error || "Checkout failed.");
//       }

//       toast.success("Order placed successfully!");
//       clearCart();
//       router.push("/orders");
//     } catch (error) {
//       toast.error("Failed to place the order.");
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-yellow-600 mb-6">Checkout</h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* LEFT SIDE: FORM */}
//         <div className="space-y-6">
//           {/* Contact Info */}
//           <section>
//             <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//               <Input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//               <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
//             </div>
//           </section>

//           {/* Shipping Info */}
//           <section>
//             <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
//               <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
//               <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
//               <Input placeholder="Postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
//             </div>
//           </section>

//           {/* Payment Method */}
//           <section>
//             <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
//             <div className="space-y-4">
//               {["Visa", "Mpesa", "Google Pay", "PayPal"].map((method) => (
//                 <label key={method} className="flex items-center gap-2 border p-3 rounded cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value={method}
//                     checked={paymentMethod === method}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <span>{method}</span>
//                 </label>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* RIGHT SIDE: ORDER SUMMARY */}
//         <aside className="space-y-4">
//           <Card>
//             <CardContent className="p-4 bg-slate-50">
//               <h2 className="text-lg font-bold text-yellow-600 mb-4">Order Summary</h2>
//               {items.length === 0 ? (
//                 <p className="text-center text-muted-foreground">Your cart is empty.</p>
//               ) : (
//                 items.map((item) => (
//                   <div key={item._id} className="flex gap-4 mb-4">
//                     <Image
//                       src={item.imageUrl}
//                       alt={item.name}
//                       width={80}
//                       height={80}
//                       className="rounded border"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-medium">{item.name}</h3>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Input
//                           type="number"
//                           className="w-16"
//                           min={1}
//                           value={item.quantity}
//                           onChange={(e) => onQuantityChange(item._id, Number(e.target.value))}
//                         />
//                         <Button variant="outline" size="sm" onClick={() => removeFromCart(item._id)}>
//                           Remove
//                         </Button>
//                       </div>
//                       <div className="mt-1 text-sm font-medium">
//                         <Price amount={item.originalPrice * item.quantity} />
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}

//               <div className="border-t pt-4 space-y-1 text-sm">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span><Price amount={subtotal} /></span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Delivery cost</span>
//                   <span className={deliveryCost === 0 ? "text-green-600" : ""}>
//                     {deliveryCost === 0 ? "FREE" : <Price amount={deliveryCost} />}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Discount</span>
//                   <span className="text-red-600">-${discount.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-lg">
//                   <span>Total to pay</span>
//                   <span><Price amount={total} /></span>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <Button className="w-full" onClick={handleOrderSubmit} disabled={isSubmitting }>
//                   {isSubmitting ? "Placing Order..." : "Pay Now"}
//                 </Button>
//                 <div className="mt-2 flex items-start gap-2 text-sm">
//                   <Checkbox id="terms" />
//                   <label htmlFor="terms">
//                     By proceeding I accept the{" "}
//                     <a href="#" className="underline">Terms & Conditions</a>
//                   </label>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </aside>
//       </div>
//     </main>
//   );
// }
// ChatGPT said:

// Thought for 5 seconds
// Below is a list of the most likely causes for runtime or logical problems in your CheckoutPage component. In each case, I explain why it happens and how to fix it.

// 1. Mismatched image URL property
// <Image
//   src={item.imageUrl}
//   alt={item.name}
//   width={80}
//   height={80}
//   className="rounded border"
// />
// – Problem: In your cart store or product model, you might actually be storing image URLs under a property called imageUrls (plural) rather than imageUrl (singular). If item.imageUrl is undefined, Next.js’s <Image> will throw a runtime error or simply render a broken image placeholder.

// – Fix: Verify which field your cart items actually expose. For example, if your store has item.imageUrls instead of item.imageUrl, change it to:

// - src={item.imageUrl}
// + src={item.imageUrls}
// Make sure the prop you pass into <Image> exactly matches the field on your cart‐item object.

// 2. session.user!.id might be undefined
// const res = await fetch("/api/checkout", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     userId: session.user!.id,
//     // … etc.
//   }),
// });
// – Problem: By default NextAuth’s session object only contains session.user.email and session.user.name. Unless you explicitly added id in your NextAuth callbacks, session.user.id will be undefined. That means you’ll send userId: undefined to your backend, which will probably break order creation logic.

// – Fix: Either include id in the NextAuth jwt/session callbacks, or switch to using a guaranteed field such as session.user.email on the server side. For example, if you added an id in your NextAuth callbacks.session, then accessing session.user.id is fine. Otherwise, change:

// - userId: session.user!.id,
// + userEmail: session.user!.email,
// …and adjust your /api/checkout handler to look up the user by email (or add the id into your session payload).

// 3. Missing <form> tag around the inputs
// You laid out all your contact/shipping fields and the “Pay Now” button, but you did not wrap them in an HTML <form> element with a submit handler. As it stands, pressing Enter in an <Input> will not fire handleOrderSubmit. Instead, you are calling handleOrderSubmit only on the button’s onClick. That’s not a crash bug, but it is a UX oversight.

// – Fix: If you want the browser’s native form submission and basic validation (e.g. pressing “Enter” submits), wrap your left‐side inputs in:

// <form onSubmit={(e) => { e.preventDefault(); handleOrderSubmit(); }}>
//   {/*  Contact Info, Shipping Info, Payment Method sections  */}
//   <Button type="submit" disabled={isSubmitting}>Pay Now</Button>
// </form>
// This way, hitting Enter inside any field will trigger your handleOrderSubmit logic. If you prefer the current onClick style, just be aware that “Enter to submit” won’t work.

// 4. Not checking “Terms & Conditions” before submitting
// <Checkbox id="terms" />
// <label htmlFor="terms">
//   By proceeding I accept the <a href="#" className="underline">Terms & Conditions</a>
// </label>
// – Problem: You display a checkbox, but your handleOrderSubmit never validates whether the user actually checked it. As a result, users can click “Pay Now” without agreeing to terms. (This isn’t a runtime crash, but it is almost certainly not intended.)

// – Fix: Add a piece of local state (e.g. const [agreed, setAgreed] = useState(false)) and bind your <Checkbox> to it:

// const [agreed, setAgreed] = useState(false);

// ...

// <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
// <label htmlFor="terms">
//   By proceeding I accept the <a href="#" className="underline">Terms & Conditions</a>
// </label>
// Then, at the top of handleOrderSubmit, do:

// if (!agreed) {
//   toast.error("You must accept the Terms & Conditions.");
//   return;
// }
// 5. Inconsistent API endpoint for deleting cart items
// // In onQuantityChange and elsewhere, you call:
// removeFromCart(id)

// // But in delete handler you wrote:
// await fetch(`/api/promo/${id}`, { method: 'DELETE' })
// – Problem: In your cart summary you use removeFromCart(item._id)—which presumably calls a Zustand store action that updates local state—but your API for deleting a promotional/flash‐sale item uses /api/promo/${id}. If you intended to delete from the “cart” API, that’s a mismatch. (It might be harmless if removeFromCart only updates local state, but double‐check.)

// – Fix: If you meant to delete from the user’s cart on the server, you probably need to hit something like /api/cart/${id} (not /api/promo/${id}). Double‐check your backend route names and ensure that removeFromCart points to the correct endpoint.

// 6. Potential NaN if parsing originalPrice or discountPercent
// const original = parseFloat(originalPrice)
// ...
// const onDiscountPercentChange = (val: string) => {
//   setDiscountPercent(val)
//   const p = parseFloat(val)
//   if (!isNaN(p) && original) {
//     const d = (p / 100) * original
//     const newP = original - d
//     setDiscountAmount(d.toFixed(2))
//     setNewPrice(newP.toFixed(2))
//   }
// }
// – Problem: If originalPrice is an empty string (""), then parseFloat("") returns NaN, so original will be NaN. In the if (!isNaN(p) && original) check, original is falsy (NaN is not truthy), so you skip calculation entirely. But since setNewPrice was never called, newPrice stays empty or stale. In practice this means until you click a product and fill in originalPrice, your discount fields won’t update at all—no crash, but confusing UX.

// – Fix: Make sure you only call the discount handlers once an actual originalPrice has been populated (e.g. via product selection). You could add:

// - if (!isNaN(p) && original) {
// + if (!isNaN(p) && !isNaN(original)) {
// And likewise for onDiscountAmountChange.

// 7. Using startAt / endAt before they’re set
// const handleAdd = async () => {
//   if (!validate() || items.length >= 10) return

//   await addFlashSaleItem({
//     productId,
//     name,
//     originalPrice: Number(originalPrice),
//     price: Number(newPrice),
//     imageUrls,
//     startAt,
//     endAt,
//     discountPercent: parseFloat(discountPercent),
//   })
//   // …
// }
// – Problem: You call validate() which only checks productId and newPrice. You never verify that startAt and endAt have been set in the form. If the user never picks a date, startAt and endAt will be "" (empty string). Your backend will then receive invalid dates for the flash sale. (That can lead to the “Invalid time value” error we saw earlier.)

// – Fix: In validate(), also include checks for startAt and endAt:

// if (!startAt) errs.startAt = "Start date is required."
// if (!endAt) errs.endAt = "End date is required."
// if (new Date(startAt) >= new Date(endAt)) errs.overlap = "Start must be before end."
// Then your user cannot hit “Add to Flash Sale” unless both dates are valid ISO strings.

// 8. Redirecting on empty cart inside useEffect
// useEffect(() => {
//   if (items.length === 0) router.push("/cart")
// }, [items, router])
// – Problem: As soon as this page mounts, if items is empty, you redirect to /cart. That’s fine in itself, but if items has not yet been fetched (e.g. useCartStore starts items = [] before loading from localStorage), this will immediately bounce the user to /cart even if they do have items. In practice it means the checkout page is almost impossible to reach unless you wrap this in a “hasFetched” guard.

// – Fix: Either wait until you know the cart is loaded or add a check so you only redirect if you have explicitly determined the cart is truly empty. For example:

// const [hasInitialized, setHasInitialized] = useState(false)

// useEffect(() => {
//   // Run exactly once, after the first render
//   setHasInitialized(true)
// }, [])

// useEffect(() => {
//   if (hasInitialized && items.length === 0) {
//     router.push("/cart")
//   }
// }, [hasInitialized, items, router])
// 9. No “Terms & Conditions” validation
// You imported Checkbox from @/components/ui/checkbox, then used it as:

// <Checkbox id="terms" />
// <label htmlFor="terms">By proceeding I accept the <a href="#" className="underline">Terms & Conditions</a></label>
// – Problem: Although you display a checkbox, you never read its state in handleOrderSubmit. Users can ignore that checkbox and still place an order.

// – Fix: Use a piece of state to track whether terms are checked:

// const [agreedToTerms, setAgreedToTerms] = useState(false);

// ...

// <Checkbox
//   id="terms"
//   checked={agreedToTerms}
//   onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
// />
// <label htmlFor="terms">By proceeding I accept …</label>
// Then in handleOrderSubmit, check:

// if (!agreedToTerms) {
//   toast.error("You must accept the Terms & Conditions.")
//   return
// }
// 10. Minor: Unused imports
// You imported { Checkbox } but only used the HTML <input type="checkbox"> style syntax earlier. (If you’re using the ShadCN <Checkbox> component, then remove your earlier native <input>. Otherwise remove the import.)

// You imported Card/CardContent from ShadCN and use them, which is correct.

// You imported Price from @/lib/utils/format, which is fine if that component definitely formats currency correctly.

// You imported useState, useEffect—both are used, so that is correct.

// Just double‐check you aren’t bringing in large modules you never use (e.g. if you tried to use a form library but changed your mind).

// Summary
// Putting it all together, here is a checklist of what to adjust:

// Image URL property:
// → Make sure you use the same field name from your cart item (e.g. item.imageUrls) rather than item.imageUrl.

// Session user ID:
// → Confirm session.user.id actually exists (by adding it in NextAuth callbacks). Otherwise send session.user.email or another guaranteed field.

// Wrap inputs in a <form> (optional):
// → If you want “Enter” to submit, wrap your contact/shipping/payment fields in <form onSubmit={…}>.

// Validate “Terms & Conditions” checkbox:
// → Track agreedToTerms in state and block submission until checked.

// API endpoint consistency:
// → If you intended to delete a cart item, call /api/cart/${id}—not /api/promo/${id}—so that your frontend and backend are in sync.

// Date validation:
// → In validate(), also ensure startAt and endAt are non‐empty and startAt < endAt.

// Avoid immediate redirect when items.length === 0:
// → Add a “hasInitialized” guard so you only redirect once you know for sure the cart is truly empty (instead of redirecting before Zustand has loaded from localStorage).

// Remove unused imports:
// → If you’re not using a library (e.g. a form helper), remove it to keep your bundle lean.

// Ensure discount logic only runs when originalPrice is valid:
// → Change checks from if (!isNaN(d) && original) to if (!isNaN(d) && !isNaN(original)).

// Once you apply those fixes, the checkout page should no longer throw “invalid image URL” or “missing user ID” errors, and the form will behave as intended (requiring all fields, terms, and valid dates).

// You said:
// expound on this : 2. session.user!.id might be undefined
// ts
// Copy
// Edit
// const res = await fetch("/api/checkout", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     userId: session.user!.id,
//     // … etc.
//   }),
// });
// – Problem: By default NextAuth’s session object only contains session.user.email and session.user.name. Unless you explicitly added id in your NextAuth callbacks, session.user.id will be undefined. That means you’ll send userId: undefined to your backend, which will probably break order creation logic.

// – Fix: Either include id in the NextAuth jwt/session callbacks, or switch to using a guaranteed field such as session.user.email on the server side. For example, if you added an id in your NextAuth callbacks.session, then accessing session.user.id is fine. Otherwise, change:

// diff
// Copy
// Edit
// - userId: session.user!.id,
// + userEmail: session.user!.email,
// …and adjust your /api/checkout handler to look up the user by email (or add the id into your session payload).
// ChatGPT said:
// When you call useSession() from NextAuth, it returns a session object whose user property by default contains only:

// user.name (string)

// user.email (string)

// (optionally) user.image (string)

// It does not automatically include your database’s internal user ID. So if you write:

// const { data: session } = useSession()
// // …
// const res = await fetch("/api/checkout", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     userId: session!.user!.id, // ❌ session.user.id is not defined by default
//     // … other fields
//   }),
// });
// then session.user.id will be undefined, because NextAuth did not put it there. As a result, your checkout API will receive { userId: undefined, … } and likely fail when it tries to create an order record associated with that user.

// How to fix it
// You have two main options:

// 1) Include id in the NextAuth session via callbacks
// If you want your session to carry the database’s user ID, you must explicitly add it in your NextAuth configuration. Typically this lives in [...nextauth].ts (or wherever you set up NextAuth). You use two callbacks:

// jwt callback (runs when the JWT is created/updated)

// session callback (runs when the session object is returned to the client)

// Below is an example using a Prisma adapter. Adapt it to Mongoose or whatever ORM you use.

// // pages/api/auth/[...nextauth].ts

// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials!.email },
//         })
//         if (user && user.password === credentials!.password) {
//           return { id: user.id, name: user.name, email: user.email }
//         }
//         return null
//       },
//     }),
//     // … any other providers
//   ],

//   callbacks: {
//     // 1️⃣ Whenever a JWT is created (or updated), attach the user ID to the token
//     async jwt({ token, user }) {
//       // `user` is only defined on first sign-in
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },

//     // 2️⃣ When session() is called on the client side, add token.id to session.user
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },

//   // Ensure the session includes those fields
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // for example
//   },

//   jwt: {
//     // You can configure your JWT options here if needed
//   },
// })
// In jwt(), we take user.id (on first sign-in) and stick it onto the JWT payload (token.id = user.id).

// In session(), we read token.id and copy it into session.user.id. After this, when you call useSession() on the client, you can write session.user.id and it will exist.

// Once that’s in place, your checkout code can safely do:

// const { data: session } = useSession()
// // session.user.id is now defined
// const res = await fetch("/api/checkout", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     userId: session!.user!.id,
//     // … other fields
//   }),
// })
// Your backend /api/checkout route can now read userId from the request body and proceed to create an order record.

// 2) Use session.user.email instead of session.user.id
// If you don’t want to modify NextAuth’s callbacks (or if you only have email guaranteed for each user), you can simply send the email to your API and let the server look up the user’s ID on its own. In that approach, your frontend becomes:

// const { data: session, status } = useSession()
// // session.user.email is guaranteed if status !== 'loading'
// const res = await fetch("/api/checkout", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     userEmail: session!.user!.email, // use email instead of id
//     customer: { firstName, lastName, … },
//     paymentMethod,
//     items: items.map(item => ({
//       id: item._id,
//       name: item.name,
//       price: item.originalPrice,
//       quantity: item.quantity,
//     })),
//     total,
//   }),
// })
// Then, in your backend /api/checkout route, you would do something like:

// // app/api/checkout/route.ts (Next.js App Router example)
// import { NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import { connectDB } from "@/lib/db"
// import User from "@/models/User"
// import Order from "@/models/Order"

// export async function POST(req: NextRequest) {
//   await connectDB()
//   const body = await req.json()
//   const { userEmail, customer, paymentMethod, items, total } = body

//   // Look up the user document by email
//   const user = await User.findOne({ email: userEmail })
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 })
//   }

//   // Now user._id is available
//   const newOrder = new Order({
//     userId: user._id,
//     customer,
//     paymentMethod,
//     items,
//     total,
//     status: "pending",
//   })
//   await newOrder.save()

//   return NextResponse.json({ success: true, orderId: newOrder._id })
// }
// In this approach, you never rely on session.user.id being present; instead, you use session.user.email (which NextAuth always provides) to look up the user on the server side. This is simpler if you don’t need the ID in your client code.

// In summary
// By default, NextAuth’s session object only contains

// session.user: {
//   name: string,
//   email: string,
//   image?: string
// }
// It does not include id unless you explicitly add it via callbacks.

// If you try to read session.user!.id without adding it, you’ll end up with undefined. That means your userId in the request body is undefined, and your backend can’t associate the order with the correct user.

// To fix this, either:

// Add id via NextAuth callbacks (jwt + session) so that session.user.id actually exists on the client, or

// Send session.user.email instead, then perform a server‐side lookup (User.findOne({ email })) to get your MongoDB (or Prisma) user’s _id.

// Choose whichever option best fits your codebase. If you frequently need the user ID in multiple places on the client, it’s worth adding it via callbacks. If you only need email (to look up the user on the server), it’s simpler to send email.

// You said:
// //we add our providers here
// import NextAuth from 'next-auth'
// import Tiktok from 'next-auth/providers/tiktok'
// import Google from 'next-auth/providers/google'
// import Instagram from 'next-auth/providers/instagram'
// import Credentials from 'next-auth/providers/credentials'
// import type { Provider } from 'next-auth/providers'

// const providers: Provider[] = [
//   Credentials({
//     credentials: { password: { label: 'Password', type: 'password' } },
//     authorize(c) {
//       if (c.password !== 'password') return null
//       return {
//         id: 'test',
//         name: 'Test User',
//         email: 'test@example.com',
//       }
//     },
//   }),

//   Google({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),

//   Tiktok({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),

//   Instagram({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ]

// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === 'function') {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== 'credentials')

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: '/login',
//     signOut: '/sign-out',
//   },
// })
// ChatGPT said:
// To ensure session.user.id is populated, you need to add two callbacks to your NextAuth configuration: one to embed the user’s ID into the JWT when they log in, and another to copy that ID from the token into the session object that goes to the client. Add these callbacks alongside your existing providers array.

// // pages/api/auth/[...nextauth].ts
// import NextAuth from "next-auth"
// import TikTokProvider from "next-auth/providers/tiktok"
// import GoogleProvider from "next-auth/providers/google"
// import InstagramProvider from "next-auth/providers/instagram"
// import CredentialsProvider from "next-auth/providers/credentials"
// import type { NextAuthOptions } from "next-auth"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: { password: { label: "Password", type: "password" } },
//       async authorize(credentials) {
//         // replace with real credential check
//         if (credentials?.password !== "password") {
//           return null
//         }
//         return { id: "test", name: "Test User", email: "test@example.com" }
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     TikTokProvider({
//       clientId: process.env.TIKTOK_CLIENT_ID!,
//       clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//     }),

//     InstagramProvider({
//       clientId: process.env.INSTAGRAM_CLIENT_ID!,
//       clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     // 1) When a user signs in, add user.id to the token
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id as string
//       }
//       return token
//     },

//     // 2) When the session object is created, copy token.id into session.user.id
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },

//   pages: {
//     signIn: "/login",
//     signOut: "/sign-out",
//   },

//   session: {
//     strategy: "jwt",
//   },
// }

// export default NextAuth(authOptions)
// What changed:

// callbacks.jwt

// When a user successfully signs in via any provider, NextAuth calls jwt(). The user object contains id (e.g. "test" for your credentials flow, or the provider’s user ID).

// We do token.id = user.id so that the JWT payload carries the user’s ID.

// callbacks.session

// When useSession() runs on the client, NextAuth reads the JWT and creates the session object. By default, session.user contains only name and email.

// Here we copy token.id into session.user.id. After this, session.user.id will be defined on the client.

// How to consume in your component
// Now in your checkout page or anywhere else, you can safely reference:

// const { data: session, status } = useSession()
// // ...
// const userId = session?.user?.id  // guaranteed to exist if signed in
// If the user is not signed in, status === "unauthenticated" and session will be null. Once they sign in, session.user.id is available.

// If you’d rather send email instead of ID
// If you do not want to modify your NextAuth callbacks, you can simply send session.user.email to your backend. In that case, change:

// body: JSON.stringify({
// -  userId: session.user!.id,
// +  userEmail: session.user!.email,
//   /* …other fields… */
// }),
// and adjust your /api/checkout handler to look up the user by email:

// // app/api/checkout/route.ts
// import { NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/lib/db"
// import User from "@/models/User"
// import Order from "@/models/Order"

// export async function POST(req: NextRequest) {
//   await connectDB()
//   const { userEmail, customer, paymentMethod, items, total } = await req.json()

//   const user = await User.findOne({ email: userEmail })
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 })
//   }

//   const newOrder = new Order({
//     userId: user._id,
//     customer,
//     paymentMethod,
//     items,
//     total,
//     status: "pending",
//   })
//   await newOrder.save()

//   return NextResponse.json({ success: true, orderId: newOrder._id })
// }
// Either approach ensures that your backend knows which user is placing the order.

// You said:
// 'use client'

// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Card, CardContent } from '@/components/ui/card'
// import Image from 'next/image'
// import { useCartStore } from '@/stores/cart'
// import Price from '@/lib/utils/format'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'
// import { useEffect, useState } from 'react'

// export default function CheckoutPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const {
//     items,
//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,
//     clearCart,
//   } = useCartStore()

//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [phone, setPhone] = useState('')
//   const [country, setCountry] = useState('')
//   const [city, setCity] = useState('')
//   const [address, setAddress] = useState('')
//   const [postalCode, setPostalCode] = useState('')
//   const [paymentMethod, setPaymentMethod] = useState('Visa')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [agreed, setAgreed] = useState(false)

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.originalPrice * item.quantity,
//     0
//   )
//   const deliveryCost = 0
//   const discount = 3
//   const total = subtotal + deliveryCost - discount

//   useEffect(() => {
//     if (items.length === 0) router.push('/cart')
//   }, [items, router])

//   // Show a loading UI while session is loading
//   if (status === 'loading') {
//     return (
//       <main className='p-6 max-w-7xl mx-auto text-center'>
//         <p className='text-xl text-gray-600'>Checking your login status...</p>
//       </main>
//     )
//   }

//   const onQuantityChange = (id: string, newQty: number) => {
//     if (newQty < 1) {
//       removeFromCart(id)
//     } else {
//       const currentItem = items.find((item) => item._id === id)
//       if (!currentItem) return
//       const diff = newQty - currentItem.quantity
//       if (diff > 0) {
//         for (let i = 0; i < diff; i++) increaseQuantity(id)
//       } else {
//         for (let i = 0; i < -diff; i++) decreaseQuantity(id)
//       }
//     }
//   }
//   if (!agreed) {
//     toast.error("You must accept the Terms & Conditions.");
//     return;
//   }

//   const handleOrderSubmit = async () => {
//     if (status === 'unauthenticated' || !session) {
//       toast.error('Please log in to place an order.')
//       router.push('/login')
//       return
//     }

//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !phone ||
//       !address ||
//       !country ||
//       !city ||
//       !postalCode
//     ) {
//       toast.error('Please fill in all the required fields.')
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       const res = await fetch('/api/checkout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userEmail: session.user.email,
//           customer: {
//             firstName,
//             lastName,
//             email,
//             phone,
//             address,
//             city,
//             country,
//             postalCode,
//           },
//           paymentMethod,
//           items: items.map((item) => ({
//             id: item._id,
//             name: item.name,
//             price: item.originalPrice,
//             quantity: item.quantity,
//           })),
//           total,
//         }),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         console.error('Checkout error response:', data)
//         throw new Error(data.error || 'Checkout failed.')
//       }

//       toast.success('Order placed successfully!')
//       clearCart()
//       router.push('/orders')
//     } catch (error) {
//       toast.error('Failed to place the order.')
//       console.error(error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <main className='p-6 max-w-7xl mx-auto'>
//       <h1 className='text-3xl font-bold text-yellow-600 mb-6'>Checkout</h1>
//       <div className='grid md:grid-cols-2 gap-8'>
//         {/* LEFT SIDE: FORM */}
//         <div className='space-y-6'>
//           {/* Contact Info */}
//           <section>
//             <h2 className='text-lg font-semibold mb-2'>Contact Information</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <Input
//                 placeholder='First name'
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               <Input
//                 placeholder='Last name'
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//               <Input
//                 placeholder='Email address'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Input
//                 placeholder='Phone number'
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//           </section>

//           {/* Shipping Info */}
//           <section>
//             <h2 className='text-lg font-semibold mb-2'>Shipping Information</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <Input
//                 placeholder='Country'
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//               />
//               <Input
//                 placeholder='City'
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//               <Input
//                 placeholder='Address'
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               <Input
//                 placeholder='Postal code'
//                 value={postalCode}
//                 onChange={(e) => setPostalCode(e.target.value)}
//               />
//             </div>
//           </section>

//           {/* Payment Method */}
//           <section>
//             <h2 className='text-lg font-semibold mb-2'>Payment Method</h2>
//             <div className='space-y-4'>
//               {['Visa', 'Mpesa', 'Google Pay', 'PayPal'].map((method) => (
//                 <label
//                   key={method}
//                   className='flex items-center gap-2 border p-3 rounded cursor-pointer'
//                 >
//                   <input
//                     type='radio'
//                     name='payment'
//                     value={method}
//                     checked={paymentMethod === method}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <span>{method}</span>
//                 </label>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* RIGHT SIDE: ORDER SUMMARY */}
//         <aside className='space-y-4'>
//           <Card>
//             <CardContent className='p-4 bg-slate-50'>
//               <h2 className='text-lg font-bold text-yellow-600 mb-4'>
//                 Order Summary
//               </h2>
//               {items.length === 0 ? (
//                 <p className='text-center text-muted-foreground'>
//                   Your cart is empty.
//                 </p>
//               ) : (
//                 items.map((item) => (
//                   <div key={item._id} className='flex gap-4 mb-4'>
//                     <Image
//                       src={item.imageUrl}
//                       alt={item.name}
//                       width={80}
//                       height={80}
//                       className='rounded border'
//                     />
//                     <div className='flex-1'>
//                       <h3 className='font-medium'>{item.name}</h3>
//                       <div className='flex items-center gap-2 mt-2'>
//                         <Input
//                           type='number'
//                           className='w-16'
//                           min={1}
//                           value={item.quantity}
//                           onChange={(e) =>
//                             onQuantityChange(item._id, Number(e.target.value))
//                           }
//                         />
//                         <Button
//                           variant='outline'
//                           size='sm'
//                           onClick={() => removeFromCart(item._id)}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                       <div className='mt-1 text-sm font-medium'>
//                         <Price amount={item.originalPrice * item.quantity} />
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}

//               <div className='border-t pt-4 space-y-1 text-sm'>
//                 <div className='flex justify-between'>
//                   <span>Subtotal</span>
//                   <span>
//                     <Price amount={subtotal} />
//                   </span>
//                 </div>
//                 <div className='flex justify-between'>
//                   <span>Delivery cost</span>
//                   <span className={deliveryCost === 0 ? 'text-green-600' : ''}>
//                     {deliveryCost === 0 ? (
//                       'FREE'
//                     ) : (
//                       <Price amount={deliveryCost} />
//                     )}
//                   </span>
//                 </div>
//                 <div className='flex justify-between'>
//                   <span>Discount</span>
//                   <span className='text-red-600'>-${discount.toFixed(2)}</span>
//                 </div>
//                 <div className='flex justify-between font-semibold text-lg'>
//                   <span>Total to pay</span>
//                   <span>
//                     <Price amount={total} />
//                   </span>
//                 </div>
//               </div>

//               <div className='mt-4'>
//                 <Button
//                   className='w-full'
//                   onClick={handleOrderSubmit}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Placing Order...' : 'Pay Now'}
//                 </Button>
//                 <div className='mt-2 flex items-start gap-2 text-sm'>
//                   <Checkbox
//                     id='terms'
//                     checked={agreed}
//                     onCheckedChange={(checked) => setAgreed(checked as boolean)}
//                   />
//                   <label htmlFor='terms'>
//                     By proceeding I accept the{' '}
//                     <a href='#' className='underline'>
//                       Terms & Conditions
//                     </a>
//                   </label>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </aside>
//       </div>
//     </main>
//   )
// }
// ChatGPT said:

// Thought for a couple of seconds
// Below are the main issues I see in your updated CheckoutPage. In each case, I explain why it’s a problem and how to fix it.

// 1. The “ `if (!agreed) { … return; } ” block is outside of any handler
//   // … inside CheckoutPage component body …
//   const onQuantityChange = (id: string, newQty: number) => { /* … */ }
//   if (!agreed) {
//     toast.error("You must accept the Terms & Conditions.");
//     return;
//   }
//   const handleOrderSubmit = async () => { /* … */ }
//   // …
// Problem: That if (!agreed) check sits directly in the component’s render path. As soon as React tries to render CheckoutPage, it hits that check. If agreed is false (which it is initially), you immediately toast.error(...) and then do a bare return;—which means your component returns undefined instead of JSX. This will:

// Fire a toast every time the component tries to render with agreed === false.

// Return undefined instead of valid JSX, causing React to throw (you’ll see an error like “Nothing was returned from render”).

// You intended to make “Terms & Conditions” a requirement when the user clicks “Pay Now”, not on every render.

// Fix: Move that check inside handleOrderSubmit (or wrap it in whatever function actually submits the form). For example:

// -  const onQuantityChange = (…) => { … }
// -  if (!agreed) {
// -    toast.error("You must accept the Terms & Conditions.");
// -    return;
// -  }
// -  const handleOrderSubmit = async () => { … }

// +  const onQuantityChange = (…) => { … }

// +  const handleOrderSubmit = async () => {
// +    if (!agreed) {
// +      toast.error("You must accept the Terms & Conditions.")
// +      return
// +    }
// +
// +    if (status === 'unauthenticated' || !session) {
// +      toast.error("Please log in to place an order.")
// +      router.push("/login")
// +      return
// +    }
// +    // … rest of validation & API call …
// +  }
// With that change, nobody gets bounced off render, and the terms‐checkbox check only fires when “Pay Now” is clicked.

// 2. item.imageUrl vs. your data shape
// <Image
//   src={item.imageUrl}
//   alt={item.name}
//   width={80}
//   height={80}
//   className="rounded border"
// />
// Problem: You call item.imageUrl, but in your store you might actually be storing that field under a different name—commonly imageUrls (plural) or something else. If item.imageUrl is undefined:

// Next.js’s <Image> will throw “Invalid src” or render a broken placeholder.

// You’ll see “Unhandled Runtime Error: image prop must be a string” or a console warning.

// Fix: Double‐check exactly how your cart‐item object is shaped. If the cart store defines each item with item.imageUrls, then switch to:

// - src={item.imageUrl}
// + src={item.imageUrls}
// (or whatever matches your actual field). Make sure the prop you pass to <Image> is always a valid string URL.

// 3. Missing <form> wrapper means Enter/auto‐validation won’t work
// Right now you have:

// {/* LEFT SIDE: FORM */}
// <div className="space-y-6">
//   <section>
//     {/* …inputs for name, email, phone… */}
//   </section>
//   <section>
//     {/* …inputs for country, city, address… */}
//   </section>
//   <section>
//     {/* …payment‐method radios… */}
//   </section>
// </div>
// and your “Pay Now” button is outside any <form>:

// <Button className="w-full" onClick={handleOrderSubmit} disabled={isSubmitting}>
//   {isSubmitting ? "Placing Order..." : "Pay Now"}
// </Button>
// Problem:

// Hitting “Enter” in any input won’t submit automatically.

// You also miss out on simple HTML5 validation if you ever add required to input fields.

// Fix (optional but recommended): Wrap your inputs and the “Pay Now” button in a <form>:

// {/* LEFT SIDE: FORM */}
// <form onSubmit={(e) => { e.preventDefault(); handleOrderSubmit() }} className="space-y-6">
//   <section>…contact inputs…</section>
//   <section>…shipping inputs…</section>
//   <section>…payment method inputs…</section>

//   <div className="mt-4">
//     <Button type="submit" className="w-full" disabled={isSubmitting}>
//       {isSubmitting ? "Placing Order..." : "Pay Now"}
//     </Button>
//   </div>
// </form>
// Now pressing Enter in a text field will automatically call handleOrderSubmit().

// If you later add attributes like <Input required />, the browser will enforce non‐empty fields before “submit.”

// 4. No check that required fields are valid HTML5
// In handleOrderSubmit() you check:

// if (!firstName || !lastName || !email || !phone || !address || !country || !city || !postalCode) {
//   toast.error("Please fill in all the required fields.")
//   return
// }
// Possible issues:

// Email format is not validated. A user can type “foo” into the email field and you accept it.

// Phone format is not validated. It could be “abc123” and pass your JavaScript check.

// Fix (optional): If you want basic HTML5 validation, use type="email" for the email <Input>, and maybe a pattern or type="tel" for phone. For example:

// <Input
//   type="email"
//   placeholder="Email address"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
//   required
// />
// <Input
//   type="tel"
//   placeholder="Phone number"
//   value={phone}
//   onChange={(e) => setPhone(e.target.value)}
//   pattern="[0-9]{10}"     // example: exactly 10 digits
//   required
// />
// Then the browser will prevent submission (if wrapped in <form>) until the email looks valid and phone matches the pattern.

// 5. Redirecting to /cart too eagerly
// useEffect(() => {
//   if (items.length === 0) router.push('/cart')
// }, [items, router])
// Problem: If useCartStore initially loads items = [] (because it hasn’t yet rehydrated from localStorage or your backend), this will immediately push the user to /cart—even if the store is about to populate items a moment later.

// Fix: Introduce a “hasLoadedCart” guard so that you only redirect once you know for sure the cart is truly empty. For example:

// const [hasLoadedCart, setHasLoadedCart] = useState(false)

// useEffect(() => {
//   // Run once on mount to indicate we’ve “attempted” to load the store
//   setHasLoadedCart(true)
// }, [])

// useEffect(() => {
//   // Only redirect if we have finished loading AND the cart is empty
//   if (hasLoadedCart && items.length === 0) {
//     router.push('/cart')
//   }
// }, [hasLoadedCart, items, router])
// Now you won’t bounce the user to /cart until after the store has had a chance to fill in any saved items.

// 6. Session check should use user.email (or add session.user.id via callbacks)
// You already fixed this by submitting userEmail: session.user.email rather than userId: session.user.id. Just double-check that your backend’s /api/checkout handler expects userEmail (not userId).

// body: JSON.stringify({
//   userEmail: session.user.email, 
//   // …
// })
// Your backend must do something like:

// const { userEmail, customer, paymentMethod, items, total } = await req.json()
// const user = await User.findOne({ email: userEmail })
// If you ever switch back to sending userId, be sure to add session.user.id in your NextAuth callbacks (as explained earlier).

// 7. Terms & Conditions checkbox must be inside the form
// Once you move the “Pay Now” into a <form> with type="submit", also ensure the <Checkbox> for “Terms & Conditions” is inside that same form. Otherwise, the user might be able to click “Enter” in an input and bypass checking the box. For example:

// <form onSubmit={(e) => { e.preventDefault(); handleOrderSubmit() }} className="space-y-6">
//   {/* …fields for name, address, etc. … */}

//   <div className="mt-4 flex items-start gap-2 text-sm">
//     <Checkbox
//       id="terms"
//       checked={agreed}
//       onCheckedChange={(checked) => setAgreed(checked as boolean)}
//       required
//     />
//     <label htmlFor="terms">
//       By proceeding I accept the <a href="#" className="underline">Terms & Conditions</a>
//     </label>
//   </div>

//   <Button type="submit" className="w-full" disabled={isSubmitting}>
//     {isSubmitting ? "Placing Order…" : "Pay Now"}
//   </Button>
// </form>
// Putting required on the <Checkbox> means the browser will refuse to submit (and will highlight that field) if it’s not checked—without even calling your JavaScript validation.

// If you still want to rely on your custom if (!agreed) check, at least keep the input inside the same <form> so the validation logic is unified.

// 8. Minor styling/UX notes
// Empty cart message: When items.length === 0, you push to /cart. Just make sure the user sees a smooth redirect rather than a flash of “Order Summary → Your cart is empty.”

// Disabled “Pay Now”: You disable Pay Now via disabled={isSubmitting}, but you may also want to disable it when required fields are missing. If you wrap everything in a <form> with HTML required attributes, the button will remain disabled until the form is valid.

// Error boundaries: If any of your async calls fail (e.g. /api/checkout is down), you log console.error and toast.error. That’s fine, but consider wrapping the entire <main> in a try/catch boundary if you want to catch unexpected exceptions.

// Summary of fixes
// Move the “must agree” check inside handleOrderSubmit, not in the main render path.

// Correct the image field name (item.imageUrls vs. item.imageUrl).

// Wrap inputs + button in a <form> so “Enter” submits and browser‐native required works.

// Validate the T&C checkbox inside that same <form> (either via React state or HTML required).

// Guard against redirecting on “empty” cart until you actually know the store has loaded.

// Ensure your backend expects userEmail (or else add an id to the session).

// Once you apply these changes, your checkout page should render without crashing, require that checkbox only when the button is clicked, and properly submit a valid userEmail (or userId) to the /api/checkout route.

// You said:
// // app/api/checkout/route.ts
// import { NextResponse } from "next/server";
// import connectToDatabase from "@/lib/db/dbConnection";
// //import { Order } from "@/lib/db/models/order";
// import { auth } from "@/auth";
// import { Order } from "@/lib/db/models/order";


// export async function POST(req: Request) {
//   // 1) Authenticate
//   const session = await auth();
//   if (!session?.user?.id) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   // 2) Parse payload
//   const {
//     customer,
//     paymentMethod,
//     items,
//     total,
//   } = await req.json();

//   // 3) Connect to DB
//   await connectToDatabase;

//   try {
//     // 4) Create the order
//     const order = await Order.create({
//       userId: session.user.id,
//       shippingAddress: customer,
//       paymentMethod,
//       items,
//       total,
//     });

//     return NextResponse.json(order, { status: 201 });
//   } catch (err) {
//     console.error("CHECKOUT_ERROR", err);
//     return NextResponse.json(
//       { error: "Failed to create order" },
//       { status: 500 }
//     );
//   }
// }
// ChatGPT said:
// Below are the main issues I see in your POST /api/checkout handler, along with explanations and how to fix each one:

// 1. Missing “()when callingconnectToDatabase`
// // 3) Connect to DB
// await connectToDatabase;
// Problem: You wrote await connectToDatabase; instead of await connectToDatabase(). As written, you’re awaiting a reference to the function itself, not invoking it. In other words, your code never actually opens a connection to MongoDB.

// Fix: Change that line to:

// await connectToDatabase();
// This ensures Mongoose (or whatever your adapter does) actually connects before you call Order.create(...).

// 2. Assuming session.user.id exists without verifying your auth() callback
// const session = await auth();
// if (!session?.user?.id) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }
// Problem: By default NextAuth’s session object only contains { user: { name, email, image? } }. You must have added a custom callback to include id in session.user.id. If you haven’t actually configured your NextAuth callbacks, then session.user.id will be undefined and every request will be treated as “Unauthorized.”

// Fix:

// Verify that your NextAuth configuration (e.g. in pages/api/auth/[...nextauth].ts) includes something like:

// callbacks: {
//   async jwt({ token, user }) {
//     if (user) token.id = user.id;
//     return token;
//   },
//   async session({ session, token }) {
//     if (session.user) {
//       session.user.id = token.id as string;
//     }
//     return session;
//   },
// }
// Otherwise, session.user.id will never be set.

// If you prefer not to add id to the session, switch to using session.user.email (which NextAuth always provides) and look up the user by email on the server:

// - if (!session?.user?.id) {
// -   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// - }
// + if (!session?.user?.email) {
// +   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// + }
// Then, when creating the order, do:

// const user = await User.findOne({ email: session.user.email });
// if (!user) {
//   return NextResponse.json({ error: "User not found" }, { status: 404 });
// }
// const order = await Order.create({
//   userId: user._id,
//   shippingAddress: customer,
//   /* … */
// });
// 3. No validation of incoming JSON payload
// const {
//   customer,
//   paymentMethod,
//   items,
//   total,
// } = await req.json();
// Problem: You assume that the client always sends a well-formed body containing customer, paymentMethod, items, and total. If any of these are missing or malformed (e.g. items is not an array, or total is not a number), you could end up with runtime errors or invalid orders in your database.

// Fix (at minimum): Perform a quick check before calling Order.create. For example:

// const data = await req.json();
// const { customer, paymentMethod, items, total } = data;

// if (
//   !customer ||
//   typeof paymentMethod !== "string" ||
//   !Array.isArray(items) ||
//   typeof total !== "number"
// ) {
//   return NextResponse.json(
//     { error: "Invalid request body" },
//     { status: 400 }
//   );
// }
// For stronger guarantees, use a library like Zod to validate:

// import { z } from "zod";

// const CheckoutSchema = z.object({
//   customer: z.object({
//     firstName: z.string(),
//     lastName: z.string(),
//     email: z.string().email(),
//     phone: z.string(),
//     address: z.string(),
//     city: z.string(),
//     country: z.string(),
//     postalCode: z.string(),
//   }),
//   paymentMethod: z.enum(["Visa", "Mpesa", "Google Pay", "PayPal"]),
//   items: z.array(
//     z.object({
//       id: z.string(),
//       name: z.string(),
//       price: z.number().nonnegative(),
//       quantity: z.number().min(1),
//     })
//   ),
//   total: z.number().nonnegative(),
// });

// const parseResult = CheckoutSchema.safeParse(await req.json());
// if (!parseResult.success) {
//   return NextResponse.json(
//     { error: "Invalid request data", issues: parseResult.error.format() },
//     { status: 400 }
//   );
// }
// const { customer, paymentMethod, items, total } = parseResult.data;
// 4. No check for “Terms & Conditions” or other business‐logic before creating the order
// Your front-end code now enforces “must check checkbox,” but on the backend you never re‐verify that the user agreed to terms. A malicious client could POST directly to /api/checkout without setting that flag.

// Fix (optional): If you care about that, add a boolean to the request and check it:

// const { customer, paymentMethod, items, total, agreedToTerms } = await req.json();
// if (!agreedToTerms) {
//   return NextResponse.json({ error: "Must accept terms" }, { status: 400 });
// }
// and on the client, include agreedToTerms: agreed in the JSON body.

// 5. Consistency between your front-end and back-end field names
// On the front-end you do:

// body: JSON.stringify({
//   userEmail: session.user.email,
//   customer: { /* … */ },
//   paymentMethod,
//   items: items.map((item) => ({
//     id: item._id,
//     name: item.name,
//     price: item.originalPrice,
//     quantity: item.quantity,
//   })),
//   total,
// });
// But on the back-end you only destructure:

// const {
//   customer,
//   paymentMethod,
//   items,
//   total,
// } = await req.json();
// You never read userEmail here—so you aren’t actually storing the user’s email or associating it with the order. Instead, you check session.user.id and use that.

// Fix: Either

// Keep sending userId (after implementing the NextAuth callbacks above), or

// Change your front-end to send userId: session.user.id (once id is in the session), and then on the backend simply read userId instead of userEmail:

// const {
//   customer,
//   paymentMethod,
//   items,
//   total,
//   userId,
//   customer,
//   paymentMethod,
//   items,
//   total,
// } = await req.json();

// // skip the auth-check if you rely on userId
// const order = await Order.create({
// userId,
// shippingAddress: customer,
// paymentMethod,
// items,
// total,
// });


// or  
// 3. On the backend, read `userEmail` (as shown in point 2 above) instead of checking `session.user.id`.
// 6. Returning NextResponse.json(order, { status: 201 }) directly
// return NextResponse.json(order, { status: 201 });
// Note (not an error): This serializes the entire Mongoose document, including fields like __v. That’s fine if you want the client to know all fields (including createdAt, _id, etc.), but if you only want to return selected order fields, you might do:

// return NextResponse.json({
//   orderId: order._id,
//   status: "created",
//   total: order.total,
//   createdAt: order.createdAt,
// }, { status: 201 });
// That way, you’re not exposing any “internal” model details by accident.

// 7. Summary of changes needed
// Invoke connectToDatabase() instead of await connectToDatabase

// Ensure session.user.id actually exists (by adding NextAuth callbacks) or switch to using session.user.email and fetching the user on the server.

// Validate the incoming JSON payload (e.g. check that customer, items, paymentMethod, and total are present and well-formed).

// (Optional) Re-check “agreed to terms” on the server to guard against malicious clients.

// Make front-end and back-end field names line up—either post userId or post userEmail and use that on the server.

// (Optional) Trim down the JSON response to only the fields the client actually needs, rather than returning the whole Mongoose document.

// Once you make those changes, your /api/checkout route should correctly authenticate, validate inputs, connect to MongoDB, and create the order with a valid userId or userEmail.

// You said:
// //auth.ts 
// import NextAuth from 'next-auth'
// import Tiktok from 'next-auth/providers/tiktok'
// import Google from 'next-auth/providers/google'
// import Instagram from 'next-auth/providers/instagram'
// import Credentials from 'next-auth/providers/credentials'
// import type { Provider } from 'next-auth/providers'

// const providers: Provider[] = [
//   Credentials({
//     credentials: { password: { label: 'Password', type: 'password' } },
//     authorize(c) {
//       if (c.password !== 'password') return null
//       return {
//         id: 'test',
//         name: 'Test User',
//         email: 'test@example.com',
//       }
//     },
//   }),

//   Google({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),

//   Tiktok({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),

//   Instagram({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ]

// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === 'function') {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== 'credentials')

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: '/login',
//     signOut: '/sign-out',
//   },
// })
//   //  By default, the id property does not exist on token or session. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) { // User is available during sign-in
//         token.id = user.id
//       }
//       return token
//     },
//     session({ session, token }) {
//       session.user.id = token.id
//       return session
//     },
//   },
// }
// ChatGPT said:

// Thought for 6 seconds
// Below is a corrected version of your auth.ts (NextAuth) file. The key fixes are:

// Move the callbacks object inside the NextAuth configuration (rather than dangling after it).

// Ensure you actually invoke NextAuth(...) with the entire options object, including providers, pages, and callbacks.

// Export a named authOptions so you can reuse it elsewhere (e.g., in app/api/checkout/route.ts).

// Destructure handlers, auth, signIn, and signOut from the return value of NextAuth(authOptions).

// // auth.ts
// import NextAuth from "next-auth"
// import type { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
// import TiktokProvider from "next-auth/providers/tiktok"
// import InstagramProvider from "next-auth/providers/instagram"
// import type { Provider } from "next-auth/providers"

// // 1) Define all of your providers here:
// const providers: Provider[] = [
//   CredentialsProvider({
//     name: "Credentials",
//     credentials: { password: { label: "Password", type: "password" } },
//     async authorize(credentials) {
//       // (This is just an example—replace with your real logic.)
//       if (credentials?.password !== "password") {
//         return null
//       }
//       return {
//         id: "test",
//         name: "Test User",
//         email: "test@example.com",
//       }
//     },
//   }),

//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),

//   TiktokProvider({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),

//   InstagramProvider({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ]

// /**
//  * 2) Export a named authOptions object so you can import it elsewhere (e.g. in API routes).
//  *    Note that session.user.id will only exist if we add it in the callbacks below.
//  */
// export const authOptions: NextAuthOptions = {
//   providers,

//   // 3) If you want custom sign-in or sign-out pages:
//   pages: {
//     signIn: "/login",
//     signOut: "/sign-out",
//   },

//   // 4) Callbacks control what ends up in `token` and `session.user`:
//   callbacks: {
//     // Called when a user signs in. We copy `user.id` into the token.
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },

//     // Called whenever the session object is created (Sent to the client).
//     // We copy `token.id` into `session.user.id`.
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },

//   session: {
//     strategy: "jwt", // ensure we are using JWT so `token.id` is available
//   },
// }

// /**
//  * 5) Finally, call NextAuth() with the full `authOptions` object,
//  *    and destructure out `handlers`, `auth`, `signIn`, `signOut`.
//  */
// export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
// Explanation of Each Fix
// Callbacks must live inside the NextAuth call
// In your original code, the callbacks block was placed after the closing }) of NextAuth({ … }), so it wasn’t actually part of the configuration. By moving callbacks: { … } inside authOptions, NextAuth will run those functions to inject user.id into token and then into session.user.id.

// Export a named authOptions
// By exporting authOptions, you can now do:

// import { authOptions } from "@/auth"
// // e.g. in app/api/checkout/route.ts
// const session = await auth({ ... , options: authOptions })
// (Or however you wire up your auth() helper.)

// Destructure handlers, auth, signIn, signOut
// In a Next.js App Router setup, calling NextAuth(authOptions) returns an object containing:

// handlers: The request handlers for /api/auth/[...nextauth].

// auth: A function that lets you check session.user.id from the server side.

// signIn, signOut: Utilities to call those actions from code.

// Exporting them in one line (export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)) wires everything up correctly.

// After These Changes
// useSession() on the client will now include session.user.id (because the session callback copied it there).

// In your API route you can do:

// import { auth } from "@/auth"

// export async function POST(req: Request) {
//   const session = await auth()
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }
//   // session.user.id is now guaranteed to exist if the user is signed in
//   // … proceed to create the order …
// }
// If instead you don’t want id in the session, you could skip the jwt/session callbacks entirely and send session.user.email from the client—then look up the user by email on the server. But if you do need the raw id in session.user.id, the above callbacks are required.

// With this setup, session.user.id will no longer be undefined, and your checkout route can reliably use it.

// You said:

// import NextAuth from 'next-auth'
// import Tiktok from 'next-auth/providers/tiktok'
// import Google from 'next-auth/providers/google'
// import Instagram from 'next-auth/providers/instagram'
// import Credentials from 'next-auth/providers/credentials'
// import type { Provider } from 'next-auth/providers'



// const providers: Provider[] = [
//   Credentials({
//     credentials: { password: { label: 'Password', type: 'password' } },
//     authorize(c) {
//       if (c.password !== 'password') return null
//       return {
//         id: 'test',
//         name: 'Test User',
//         email: 'test@example.com',
//       }
//     },
//   }),

//   Google({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),

//   Tiktok({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),

//   Instagram({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ]

// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === 'function') {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== 'credentials')

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: '/login',
//     signOut: '/sign-out',
//   },
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) { // User is available during sign-in
//         token.id = user.id
//       }
//       return token
//     },
//     session({ session, token }) {
//       session.user.id = token.id
//       return session
//     },
//   },
// })
//   //  By default, the id property does not exist on token or session. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
  
// ChatGPT said:
// Your NextAuth configuration now correctly includes the callbacks block inside the call, so that session.user.id will in fact be populated. Here are a few things to double‐check and (if needed) tweak:

// 1. Confirm id actually makes it into the session
// You have:

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: '/login',
//     signOut: '/sign-out',
//   },
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     session({ session, token }) {
//       session.user.id = token.id
//       return session
//     },
//   },
// })
// On first sign‐in, NextAuth calls jwt({ token, user }). Because user is non‐null at that moment, you do token.id = user.id.

// On subsequent requests, NextAuth populates session.user from the token via the session callback: session.user.id = token.id.

// After this, any client that calls useSession() will see:

// const { data: session } = useSession()
// // session.user.id now exists (e.g. "test" in your credentials example)
// 2. TypeScript types (optional)
// If you’re using TypeScript, you may get type‐errors like “Property id does not exist on type Session["user"]” or “token.id does not exist on type JWT.” To fix that, add a small declaration file:

// // types/next-auth.d.ts

// import NextAuth, { DefaultSession, DefaultJWT } from "next-auth"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id?: string
//   }
// }
// Then add "types/next-auth.d.ts" (or whatever path you choose) to your tsconfig.json’s "include" array. This tells TypeScript that:

// session.user.id is a valid string.

// token.id is a valid (possibly undefined) string.

// Without that, you’ll get compile‐time errors even though the runtime behavior is correct.

// 3. Ensure your authorize() returns id
// In your Credentials provider, you wrote:

// Credentials({
//   credentials: { password: { label: "Password", type: "password" } },
//   authorize(c) {
//     if (c.password !== "password") return null
//     return {
//       id: 'test',
//       name: 'Test User',
//       email: 'test@example.com',
//     }
//   },
// })
// That id: "test" will flow into user.id in the jwt callback. If you switch to Google/TikTok/Instagram, those providers’ user objects already come with .id (for TikTok, .sub; NextAuth maps it to .id internally). So as soon as one of those providers succeeds, token.id will be set.

// 4. What to do on the API side
// Now that session.user.id is guaranteed, your checkout route can do exactly this:

// import { NextResponse } from "next/server"
// import { auth } from "@/auth"
// import connectToDatabase from "@/lib/db/dbConnection"
// import { Order } from "@/lib/db/models/order"

// export async function POST(req: Request) {
//   // 1) Authenticate
//   const session = await auth()
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 2) Parse payload
//   const { customer, paymentMethod, items, total } = await req.json()

//   // 3) Connect to DB (note the ()
//   await connectToDatabase()

//   try {
//     // 4) Create the order using session.user.id
//     const order = await Order.create({
//       userId: session.user.id,
//       shippingAddress: customer,
//       paymentMethod,
//       items,
//       total,
//     })

//     return NextResponse.json(order, { status: 201 })
//   } catch (err) {
//     console.error("CHECKOUT_ERROR", err)
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
//   }
// }
// Because your NextAuth callbacks put id into the session, session.user.id will no longer be undefined.

// 5. Double‐check environment variables
// Make sure you have all of these set in your .env.local (or environment):

// GOOGLE_CLIENT_ID=…
// GOOGLE_CLIENT_SECRET=…
// TIKTOK_CLIENT_ID=…
// TIKTOK_CLIENT_SECRET=…
// INSTAGRAM_CLIENT_ID=…
// INSTAGRAM_CLIENT_SECRET=…
// NEXTAUTH_SECRET=…         # recommended for production
// NEXTAUTH_URL=http://localhost:3000  # or your production URL
// If any provider’s clientId or clientSecret is missing, NextAuth may throw an error on startup. Also, having NEXTAUTH_SECRET defined ensures your JWTs and session tokens are signed properly.

// 6. Summing up
// Your callbacks.jwt and callbacks.session are now inside the NextAuth({ … }) options object—this is correct.

// If you still see session.user.id as undefined, verify that (a) the user actually signed in via one of those providers or credentials flow, and (b) TypeScript isn’t masking the property (you may need to add types/next-auth.d.ts).

// On the server side, using await auth() will now give you a session with session.user.id set, so you can safely create orders tied to that User ID in MongoDB.

// With these steps, session.user.id should no longer be undefined, and all downstream routes (like /api/checkout) will be able to read a valid user ID.

// You said:


// import Tiktok from 'next-auth/providers/tiktok'
// import Google from 'next-auth/providers/google'
// import Instagram from 'next-auth/providers/instagram'
// import Credentials from 'next-auth/providers/credentials'
// import type { Provider } from 'next-auth/providers'
// import NextAuth, { DefaultSession} from "next-auth"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
// }


// const providers: Provider[] = [
//   Credentials({
//     credentials: { password: { label: 'Password', type: 'password' } },
//     authorize(c) {
//       if (c.password !== 'password') return null
//       return {
//         id: 'test',
//         name: 'Test User',
//         email: 'test@example.com',
//       }
//     },
//   }),

//   Google({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),

//   Tiktok({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),

//   Instagram({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ]

// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === 'function') {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== 'credentials')

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: '/login',
//     signOut: '/sign-out',
//   },
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) { // User is available during sign-in
//         token.id = user.id
//       }
//       return token
//     },
//     session({ session, token }) {
//       session.user.id = token.id
//       return session
//     },
//   },
// })
//   //  By default, the id property does not exist on token or session. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
  
// ChatGPT said:
// Your NextAuth configuration and TypeScript augmentation look almost correct. Here are a few notes and minor fixes to ensure everything works smoothly:

// 1. Module Augmentation for session.user.id
// You wrote:

// import NextAuth, { DefaultSession } from "next-auth"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
// }
// This tells TypeScript that session.user.id is a string in addition to whatever fields DefaultSession["user"] already provides (name, email, image).

// That’s exactly what you need for session.user.id to be recognized in your code.

// 2. You also want to augment the JWT type
// Because you are storing token.id = user.id inside the jwt callback, you should let TypeScript know that token.id exists. Add the following right after—or in the same file—so your JWT is aware of id:

// import NextAuth, { DefaultSession, DefaultJWT } from "next-auth"

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id?: string
//   }
// }
// With both of these in place:

// token.id (in your jwt callback) is typed as string | undefined.

// session.user.id (in your session callback) is typed as string.

// 3. Verify your NextAuth call includes the callbacks
// Your exported code:

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: '/login',
//     signOut: '/sign-out',
//   },
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     session({ session, token }) {
//       session.user.id = token.id!
//       return session
//     },
//   },
// })
// Make sure those callbacks are inside the NextAuth({ ... }) call, which they are.

// Also ensure your providers array is defined correctly (which it is).

// 4. Putting it all together
// Below is a consolidated version of your file with both module augmentations:

// // auth.ts

// import NextAuth, { DefaultSession, DefaultJWT } from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import Tiktok from "next-auth/providers/tiktok"
// import Instagram from "next-auth/providers/instagram"
// import type { Provider } from "next-auth/providers"

// // 1) Augment the Session type to include user.id
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
// }

// // 2) Augment the JWT type to include token.id
// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id?: string
//   }
// }

// // 3) Define your providers
// const providers: Provider[] = [
//   Credentials({
//     credentials: { password: { label: "Password", type: "password" } },
//     async authorize(credentials) {
//       // Example credential check
//       if (credentials?.password !== "password") {
//         return null
//       }
//       return {
//         id: "test",
//         name: "Test User",
//         email: "test@example.com",
//       }
//     },
//   }),

//   Google({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),

//   Tiktok({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),

//   Instagram({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ]

// // 4) Export provider map for your UI, if needed
// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === "function") {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== "credentials")

// // 5) Instantiate NextAuth with callbacks
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: "/login",
//     signOut: "/sign-out",
//   },
//   callbacks: {
//     // When a user signs in, copy user.id into token.id
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     // Whenever a session is checked, copy token.id into session.user.id
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
// })
// With this setup:

// At sign-in, jwt() will receive user.id (e.g. "test"). We store it in token.id.

// On any subsequent request, session() will read token.id and attach it to session.user.id.

// In your React code, calling useSession() now gives you:

// const { data: session } = useSession()
// // session.user.id is available here
// Summary
// Add module augmentation for both next-auth and next-auth/jwt so TypeScript knows about user.id and token.id.

// Ensure your callbacks block is inside the NextAuth({ … }) configuration.

// Export handlers, auth, signIn, signOut, which you can then import in your API routes (e.g. auth() in /api/checkout).

// Once all of that is in place, session.user.id will no longer be undefined, and you can safely use it in your backend and frontend code.

// You said:
// types.d.ts
// ChatGPT said:
// Create a file named types.d.ts (in your project root or a types/ folder) with the following contents:

// // types.d.ts

// // 1) Augment NextAuth’s Session type to include `user.id`
// import { DefaultSession } from "next-auth"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       /** This property is added in your callbacks.jwt and callbacks.session */
//       id: string
//     } & DefaultSession["user"]
//   }
// }

// // 2) Augment NextAuth’s JWT type to include `token.id`
// import { DefaultJWT } from "next-auth/jwt"

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     /** We assign this in callbacks.jwt */
//     id?: string
//   }
// }
// Steps to integrate:

// Place this file somewhere your compiler can see it—e.g. at the project root, or in a types/ folder.

// Update your tsconfig.json (if needed) to include it, for example:

// {
//   "compilerOptions": {
//     // … other options …
//     "strict": true
//   },
//   "include": [
//     "next-env.d.ts",
//     "**/*.ts",
//     "**/*.tsx",
//     "types.d.ts"            // ← ensure this file is included
//   ]
// }
// Restart your TypeScript server (or npm run dev) so these new module declarations take effect.

// After that, whenever you refer to session.user.id or token.id, TypeScript will know those properties exist.

// You said:


// declare module "next-auth" {
//     /**
//      * The shape of the user object returned in the OAuth providers' profile callback,
//      * or the second parameter of the session callback, when using a database.
//      */
//     interface User {}
//     /**
//      * The shape of the account object returned in the OAuth providers' account callback,
//      * Usually contains information about the provider being used, like OAuth tokens (access_token, etc).
//      */
//     interface Account {}
   
//     /**
//      * Returned by useSession, auth, contains information about the active session.
//      */
//     declare module "next-auth" {
//       interface Session {
//         user: {
//           id: string
//         } & DefaultSession["user"]
//       }
//     }
//   }
   
//   // The JWT interface can be found in the next-auth/jwt submodule
  
   
//   declare module "next-auth/jwt" {
//     /** Returned by the jwt callback and auth, when using JWT sessions */
//     interface JWT {
//       /** OpenID ID Token */
//       idToken?: string
//     }
//   }
// ChatGPT said:
// Below is a clean, minimal types.d.ts that correctly augments both the NextAuth Session and JWT types. Make sure this file is included in your tsconfig.json (e.g. under "include": ["types.d.ts", ...]).

// // types.d.ts

// import { DefaultSession } from "next-auth"
// import { DefaultJWT } from "next-auth/jwt"

// // 1) Augment the NextAuth `Session` object so that `session.user.id` exists:
// declare module "next-auth" {
//   interface Session {
//     user: {
//       /** This will be injected in callbacks.session */
//       id: string
//     } & DefaultSession["user"]
//   }

//   // (Optional) If you ever use `User` or `Account` from NextAuth and want to augment them,
//   // you can do so here. For now, leave them empty or remove if unused:
//   interface User {}
//   interface Account {}
// }


// // 2) Augment the NextAuth `JWT` payload so that `token.id` exists:
// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     /** This is set in callbacks.jwt */
//     id?: string
//   }
// }
// How to integrate
// Save this file as types.d.ts (in your project root or a types/ folder).

// Ensure tsconfig.json includes it. For example:

// {
//   "compilerOptions": {
//     "target": "esnext",
//     "module": "esnext",
//     "lib": ["dom", "dom.iterable", "esnext"],
//     "strict": true,
//     // … other options …
//   },
//   "include": [
//     "next-env.d.ts",
//     "**/*.ts",
//     "**/*.tsx",
//     "types.d.ts"       // ← Add this line if you named the file in the root
//   ]
// }
// Restart your dev server/TS server so TypeScript picks up these new module augmentations.

// Why this works
// declare module "next-auth"
// Extends the runtime Session type. Now anywhere you do:

// const { data: session } = useSession()
// console.log(session.user.id) // Typed as `string`
// TypeScript knows session.user.id is available.

// declare module "next-auth/jwt"
// Tells TypeScript that the JWT object (inside your jwt({ token, user }) callback) will have an optional id property. This aligns with us writing token.id = user.id in that callback.

// With these two declarations in place, you can safely use session.user.id on the client and token.id (on the server) without any TypeScript errors.

// You said:
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import Tiktok from "next-auth/providers/tiktok"
// import Instagram from "next-auth/providers/instagram"
// import type { Provider } from "next-auth/providers"
// import NextAuth from "next-auth"


// // 3) Define your providers
// const providers: Provider[] = [
//   Credentials({
//     credentials: { password: { label: "Password", type: "password" } },
//     async authorize(credentials) {
//       // Example credential check
//       if (credentials?.password !== "password") {
//         return null
//       }
//       return {
//         id: "test",
//         name: "Test User",
//         email: "test@example.com",
//       }
//     },
//   }),

//   Google({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),

//   Tiktok({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),

//   Instagram({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ]

// // 4) Export provider map for your UI, if needed
// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === "function") {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== "credentials")

// // 5) Instantiate NextAuth with callbacks
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: "/login",
//     signOut: "/sign-out",
//   },
//   callbacks: {
//     // When a user signs in, copy user.id into token.id
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     // Whenever a session is checked, copy token.id into session.user.id
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
// })
// ChatGPT said:
// Your NextAuth setup now looks correct. Here are a few final checks to ensure everything is wired up properly:

// 1. Ensure your module augmentation (types.d.ts) is loaded
// Make sure you have a file (e.g. at the project root) called types.d.ts with these contents:

// // types.d.ts

// import { DefaultSession } from "next-auth"
// import { DefaultJWT } from "next-auth/jwt"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id?: string
//   }
// }
// And then verify your tsconfig.json includes it:

// {
//   "compilerOptions": {
//     // … your existing options …
//   },
//   "include": [
//     "next-env.d.ts",
//     "**/*.ts",
//     "**/*.tsx",
//     "types.d.ts"    // ← make sure this path matches your actual file
//   ]
// }
// That way, TypeScript knows about both session.user.id and token.id.

// 2. Verify environment variables
// You are using four OAuth providers, so double-check that each of these is defined in your .env.local (or your hosting environment):

// GOOGLE_CLIENT_ID=…
// GOOGLE_CLIENT_SECRET=…
// TIKTOK_CLIENT_ID=…
// TIKTOK_CLIENT_SECRET=…
// INSTAGRAM_CLIENT_ID=…
// INSTAGRAM_CLIENT_SECRET=…
// NEXTAUTH_SECRET=…          # (recommended for production)
// NEXTAUTH_URL=http://localhost:3000  # or your deployment URL
// If any of those are missing, NextAuth will either throw an error on startup or silently fail for that provider.

// 3. Confirm your NextAuth call
// Your final NextAuth({ … }) invocation should look exactly like this:

// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import Tiktok from "next-auth/providers/tiktok"
// import Instagram from "next-auth/providers/instagram"
// import type { Provider } from "next-auth/providers"

// const providers: Provider[] = [
//   Credentials({
//     credentials: { password: { label: "Password", type: "password" } },
//     async authorize(credentials) {
//       if (credentials?.password !== "password") return null
//       return {
//         id: "test",
//         name: "Test User",
//         email: "test@example.com",
//       }
//     },
//   }),

//   Google({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),

//   Tiktok({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),

//   Instagram({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ]

// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === "function") {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== "credentials")

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: "/login",
//     signOut: "/sign-out",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
// })
// callbacks.jwt ensures that, on initial sign-in, user.id (e.g. "test") is copied into token.id.

// callbacks.session copies token.id into session.user.id so that the client can read session.user.id.

// Because you set session.strategy: "jwt", you get a JSON Web Token (which carries id) instead of a database-backed session.

// 4. Using auth() in your API routes
// In your API route (for example app/api/checkout/route.ts):

// import { NextResponse } from "next/server"
// import connectToDatabase from "@/lib/db/dbConnection"
// import { auth } from "@/auth"          // ← points to the file you just defined
// import { Order } from "@/lib/db/models/order"

// export async function POST(req: Request) {
//   // 1) Authenticate the request
//   const session = await auth()
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 2) Parse and validate the incoming JSON
//   const { customer, paymentMethod, items, total } = await req.json()
//   // … (optional: add additional validation here) …

//   // 3) Connect to DB (note the parentheses)
//   await connectToDatabase()

//   try {
//     // 4) Create the order with a valid userId
//     const order = await Order.create({
//       userId: session.user.id,
//       shippingAddress: customer,
//       paymentMethod,
//       items,
//       total,
//     })

//     return NextResponse.json(order, { status: 201 })
//   } catch (err) {
//     console.error("CHECKOUT_ERROR", err)
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
//   }
// }
// Thanks to the callbacks you added, session.user.id is guaranteed to exist (provided the user is actually signed in). If a request arrives without a valid session, it returns 401 Unauthorized.

// Recap
// types.d.ts ensures TypeScript knows about session.user.id and token.id.

// Your NextAuth call includes both jwt and session callbacks, so that id flows from user → token → session.

// Environment variables must all be set (especially GOOGLE_CLIENT_*, TIKTOK_CLIENT_*, INSTAGRAM_CLIENT_*, and NEXTAUTH_SECRET).

// In your API routes, use const session = await auth() to get a session with session.user.id populated.

// With all of that in place, session.user.id should no longer be undefined, and your checkout (or any other protected route) can safely rely on the user’s ID.

// You said:
// 'use client'

// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Card, CardContent } from '@/components/ui/card'
// import Image from 'next/image'
// import { useCartStore } from '@/stores/cart'
// import Price from '@/lib/utils/format'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'
// import { useEffect, useState } from 'react'

// export default function CheckoutPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const {
//     items,
//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,
//     clearCart,
//   } = useCartStore()

//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [phone, setPhone] = useState('')
//   const [country, setCountry] = useState('')
//   const [city, setCity] = useState('')
//   const [address, setAddress] = useState('')
//   const [postalCode, setPostalCode] = useState('')
//   const [paymentMethod, setPaymentMethod] = useState('Visa')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [agreed, setAgreed] = useState(false)

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.originalPrice * item.quantity,
//     0
//   )
//   const deliveryCost = 0
//   const discount = 3
//   const total = subtotal + deliveryCost - discount

//   useEffect(() => {
//     if (items.length === 0) router.push('/cart')
//   }, [items, router])

//   // Show a loading UI while session is loading
//   if (status === 'loading') {
//     return (
//       <main className='p-6 max-w-7xl mx-auto text-center'>
//         <p className='text-xl text-gray-600'>Checking your login status...</p>
//       </main>
//     )
//   }

//   const onQuantityChange = (id: string, newQty: number) => {
//     if (newQty < 1) {
//       removeFromCart(id)
//     } else {
//       const currentItem = items.find((item) => item._id === id)
//       if (!currentItem) return
//       const diff = newQty - currentItem.quantity
//       if (diff > 0) {
//         for (let i = 0; i < diff; i++) increaseQuantity(id)
//       } else {
//         for (let i = 0; i < -diff; i++) decreaseQuantity(id)
//       }
//     }
//   }
  

//   const handleOrderSubmit = async () => {
//     if (!agreed) {
//       toast.error("You must accept the Terms & Conditions.");
//       return;
//     }
//     if (status === 'unauthenticated' || !session) {
//       toast.error('Please log in to place an order.')
//       router.push('/login')
//       return
//     }

//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !phone ||
//       !address ||
//       !country ||
//       !city ||
//       !postalCode
//     ) {
//       toast.error('Please fill in all the required fields.')
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       const res = await fetch('/api/checkout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: session.user?.id,
//           customer: {
//             firstName,
//             lastName,
//             email,
//             phone,
//             address,
//             city,
//             country,
//             postalCode,
//           },
//           paymentMethod,
//           items: items.map((item) => ({
//             id: item._id,
//             name: item.name,
//             price: item.originalPrice,
//             quantity: item.quantity,
//           })),
//           total,
//         }),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         console.error('Checkout error response:', data)
//         throw new Error(data.error || 'Checkout failed.')
//       }

//       toast.success('Order placed successfully!')
//       clearCart()
//       router.push('/orders')
//     } catch (error) {
//       toast.error('Failed to place the order.')
//       console.error(error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <main className='p-6 max-w-7xl mx-auto'>
//       <h1 className='text-3xl font-bold text-yellow-600 mb-6'>Checkout</h1>
//       <div className='grid md:grid-cols-2 gap-8'>
//         {/* LEFT SIDE: FORM */}
//         <div className='space-y-6'>
//           {/* Contact Info */}
//           <section>
//             <h2 className='text-lg font-semibold mb-2'>Contact Information</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <Input
//                 placeholder='First name'
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               <Input
//                 placeholder='Last name'
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//               <Input
//                 placeholder='Email address'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Input
//                 placeholder='Phone number'
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//           </section>

//           {/* Shipping Info */}
//           <section>
//             <h2 className='text-lg font-semibold mb-2'>Shipping Information</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <Input
//                 placeholder='Country'
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//               />
//               <Input
//                 placeholder='City'
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//               <Input
//                 placeholder='Address'
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               <Input
//                 placeholder='Postal code'
//                 value={postalCode}
//                 onChange={(e) => setPostalCode(e.target.value)}
//               />
//             </div>
//           </section>

//           {/* Payment Method */}
//           <section>
//             <h2 className='text-lg font-semibold mb-2'>Payment Method</h2>
//             <div className='space-y-4'>
//               {['Visa', 'Mpesa', 'Google Pay', 'PayPal'].map((method) => (
//                 <label
//                   key={method}
//                   className='flex items-center gap-2 border p-3 rounded cursor-pointer'
//                 >
//                   <input
//                     type='radio'
//                     name='payment'
//                     value={method}
//                     checked={paymentMethod === method}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <span>{method}</span>
//                 </label>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* RIGHT SIDE: ORDER SUMMARY */}
//         <aside className='space-y-4'>
//           <Card>
//             <CardContent className='p-4 bg-slate-50'>
//               <h2 className='text-lg font-bold text-yellow-600 mb-4'>
//                 Order Summary
//               </h2>
//               {items.length === 0 ? (
//                 <p className='text-center text-muted-foreground'>
//                   Your cart is empty.
//                 </p>
//               ) : (
//                 items.map((item) => (
//                   <div key={item._id} className='flex gap-4 mb-4'>
//                     <Image
//                       src={item.imageUrl}
//                       alt={item.name}
//                       width={80}
//                       height={80}
//                       className='rounded border'
//                     />
//                     <div className='flex-1'>
//                       <h3 className='font-medium'>{item.name}</h3>
//                       <div className='flex items-center gap-2 mt-2'>
//                         <Input
//                           type='number'
//                           className='w-16'
//                           min={1}
//                           value={item.quantity}
//                           onChange={(e) =>
//                             onQuantityChange(item._id, Number(e.target.value))
//                           }
//                         />
//                         <Button
//                           variant='outline'
//                           size='sm'
//                           onClick={() => removeFromCart(item._id)}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                       <div className='mt-1 text-sm font-medium'>
//                         <Price amount={item.originalPrice * item.quantity} />
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}

//               <div className='border-t pt-4 space-y-1 text-sm'>
//                 <div className='flex justify-between'>
//                   <span>Subtotal</span>
//                   <span>
//                     <Price amount={subtotal} />
//                   </span>
//                 </div>
//                 <div className='flex justify-between'>
//                   <span>Delivery cost</span>
//                   <span className={deliveryCost === 0 ? 'text-green-600' : ''}>
//                     {deliveryCost === 0 ? (
//                       'FREE'
//                     ) : (
//                       <Price amount={deliveryCost} />
//                     )}
//                   </span>
//                 </div>
//                 <div className='flex justify-between'>
//                   <span>Discount</span>
//                   <span className='text-red-600'>-${discount.toFixed(2)}</span>
//                 </div>
//                 <div className='flex justify-between font-semibold text-lg'>
//                   <span>Total to pay</span>
//                   <span>
//                     <Price amount={total} />
//                   </span>
//                 </div>
//               </div>

//               <div className='mt-4'>
//                 <Button
//                   className='w-full'
//                   onClick={handleOrderSubmit}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Placing Order...' : 'Pay Now'}
//                 </Button>
//                 <div className='mt-2 flex items-start gap-2 text-sm'>
//                   <Checkbox
//                     id='terms'
//                     checked={agreed}
//                     onCheckedChange={(checked) => setAgreed(checked as boolean)}
//                   />
//                   <label htmlFor='terms'>
//                     By proceeding I accept the{' '}
//                     <a href='#' className='underline'>
//                       Terms & Conditions
//                     </a>
//                   </label>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </aside>
//       </div>
//     </main>
//   )
// }
// ChatGPT said:
// Below are a few things to watch for in your final CheckoutPage implementation—both potential runtime errors and suggested improvements—so that it behaves correctly and safely:

// 1. Ensure item.imageUrl actually exists
// <Image
//   src={item.imageUrl}
//   alt={item.name}
//   width={80}
//   height={80}
//   className="rounded border"
// />
// Check your cart‐store shape: If your cart items are actually storing the image under a property named imageUrls (plural) or something else, then item.imageUrl will be undefined. Next.js’s <Image> component will throw an error like:

// Error: Invalid src prop (undefined) on next/image, expect a string.
// Fix: Make sure this matches your store. For example, if you really have:

// interface CartItem {
//   _id: string
//   name: string
//   imageUrls: string  // note the “s”
//   originalPrice: number
//   quantity: number
// }
// then change it to:

// - src={item.imageUrl}
// + src={item.imageUrls}
// Until that is corrected, every image tag will break.

// 2. Redirecting too aggressively when items.length === 0
// useEffect(() => {
//   if (items.length === 0) router.push('/cart')
// }, [items, router])
// Problem: If your cart store initially starts with items = [] (before rehydrating from local storage or an API), this useEffect will immediately redirect to /cart—even when the user actually has items, but they just haven’t been loaded yet.

// Fix: Introduce a “has loaded cart” guard. For example:

// const [cartLoaded, setCartLoaded] = useState(false);

// useEffect(() => {
//   setCartLoaded(true);
// }, []);

// useEffect(() => {
//   if (cartLoaded && items.length === 0) {
//     router.push('/cart')
//   }
// }, [cartLoaded, items, router]);
// This way, the redirect only happens once you know for sure the store has rehydrated.

// 3. Missing <form> wrapper for HTML5 validation / “Enter” key
// Currently, your left‐side inputs and the “Pay Now” button are separate. Because “Pay Now” is not inside an HTML <form>, pressing Enter in any text field will not automatically submit, and the browser’s native “required” validation won’t fire if you add required attributes later.

// Recommendation: Wrap your contact/shipping fields and Pay button in a <form>:

// <form
//   onSubmit={(e) => {
//     e.preventDefault();
//     handleOrderSubmit();
//   }}
//   className="space-y-6"
// >
//   {/* Contact Info fields */}
//   {/* Shipping Info fields */}
//   {/* Payment Method radios */}

//   <div className="mt-4">
//     <Button type="submit" className="w-full" disabled={isSubmitting}>
//       {isSubmitting ? 'Placing Order...' : 'Pay Now'}
//     </Button>
//   </div>

//   <div className="mt-2 flex items-start gap-2 text-sm">
//     <Checkbox
//       id="terms"
//       checked={agreed}
//       onCheckedChange={(checked) => setAgreed(checked as boolean)}
//       required
//     />
//     <label htmlFor="terms">
//       By proceeding I accept the{' '}
//       <a href="#" className="underline">
//         Terms & Conditions
//       </a>
//     </label>
//   </div>
// </form>
// Now pressing Enter in any <Input> box triggers handleOrderSubmit().

// You can also add required attributes to <Input>s (e.g. type="email" or type="tel") and let the browser enforce simple validation.

// 4. Validate “Terms & Conditions” inside the submit handler
// You correctly moved the T&C check into handleOrderSubmit:

// if (!agreed) {
//   toast.error("You must accept the Terms & Conditions.");
//   return;
// }
// Just ensure that checkbox is actually inside the same <form> (or visually adjacent) so users cannot bypass it by pressing Enter before checking the box.

// 5. Confirm session.user.id is defined
// const { data: session, status } = useSession();
// ...
// body: JSON.stringify({
//   userId: session.user?.id,
//   // …
// }),
// If you followed the earlier NextAuth setup (with callbacks.jwt and callbacks.session), then session.user.id should be properly populated.

// If you still see undefined, double‐check that:

// Your types.d.ts (module augmentation) includes:

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id?: string
//   }
// }
// Your NextAuth config has the callbacks baked in:

// callbacks: {
//   async jwt({ token, user }) {
//     if (user) token.id = user.id;
//     return token;
//   },
//   async session({ session, token }) {
//     session.user.id = token.id as string;
//     return session;
//   }
// }
// If you prefer to send email instead, replace userId: session.user?.id with userEmail: session.user?.email, and then have your /api/checkout handler look up the user.

// 6. Payload field names must match your API
// Your front‐end does:

// body: JSON.stringify({
//   userId: session.user?.id,
//   customer: { firstName, lastName, email, phone, address, city, country, postalCode },
//   paymentMethod,
//   items: items.map((item) => ({ id: item._id, name: item.name, price: item.originalPrice, quantity: item.quantity })),
//   total,
// })
// But your /api/checkout/route.ts currently expects:

// const { customer, paymentMethod, items, total } = await req.json();
// // and uses session.user.id directly
// Either send userEmail and look up the user in the backend,

// Or continue sending userId (once you know it’s defined), and read it on the server as:

// const { userId, customer, paymentMethod, items, total } = await req.json();
// Make sure the JSON keys line up.

// 7. Validate incoming data on the server
// On the server side (/api/checkout), add a quick shape check before Order.create(...):

// const payload = await req.json();
// const { userId, customer, paymentMethod, items, total } = payload;

// if (!userId || typeof userId !== "string") {
//   return NextResponse.json({ error: "Invalid user" }, { status: 400 });
// }
// if (!customer || typeof customer !== "object") {
//   return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
// }
// // … similarly check paymentMethod, items array, total …
// Even better, use Zod or another validation library to ensure that items is an array of objects with { id: string, name: string, price: number, quantity: number } and that total is a number. This prevents malformed requests from creating bogus orders.

// 8. Minor UX/styling improvements
// For email and phone fields, consider using:

// <Input
//   type="email"
//   placeholder="Email address"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
//   required
// />
// <Input
//   type="tel"
//   placeholder="Phone number"
//   value={phone}
//   onChange={(e) => setPhone(e.target.value)}
//   pattern="[0-9]{10}"
//   required
// />
// so the browser can enforce correct formats (type="email" or a pattern for phone numbers).

// If you want the user to see a short “Loading…” modal when they click Pay Now, you could disable all inputs and show a spinner while isSubmitting === true.

// The “Discount” of $3 is hardcoded. If you eventually make that dynamic (promo codes, etc.), extract it into state or props.

// Final Checklist
// Fix src={item.imageUrl} if your store actually uses imageUrls.

// Wrap inputs + button in a <form> so Enter‐key and <input required> work natively.

// Move T&C validation inside handleOrderSubmit (already done).

// Ensure session.user.id is truly provided (verify module augmentation and NextAuth callbacks).

// Align field names between your fetch('/api/checkout', { body: JSON.stringify({ … }) }) and your /api/checkout handler.

// Add server‐side validation for the JSON payload in /api/checkout.

// (Optional) Use type="email" and type="tel" or pattern attributes on inputs for extra HTML5 validation.

// Once all of these are verified, your checkout page should render correctly, require that the user check “Terms & Conditions,” send a valid userId (or userEmail) to the server, and create orders without runtime errors.

// You said:
// import { NextResponse } from "next/server"
// import connectToDatabase from "@/lib/db/dbConnection"
// import { auth } from "@/auth"          // ← points to the file you just defined
// import { Order } from "@/lib/db/models/order"

// export async function POST(req: Request) {
//   // 1) Authenticate the request
//   const session = await auth()
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 2) Parse and validate the incoming JSON
//   const { userId, customer, paymentMethod, items, total } = await req.json();
//   if (!userId || typeof userId !== "string") {
//     return NextResponse.json({ error: "Invalid user" }, { status: 400 });
//   }
//   if (!customer || typeof customer !== "object") {
//     return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
//   }
//   // … (optional: add additional validation here) …

//   // 3) Connect to DB (note the parentheses)
//   await connectToDatabase

//   try {
//     // 4) Create the order with a valid userId
//     const order = await Order.create({
//       userId: session.user.id,
//       shippingAddress: customer,
//       paymentMethod,
//       items,
//       total,
//     })

//     return NextResponse.json(order, { status: 201 })
//   } catch (err) {
//     console.error("CHECKOUT_ERROR", err)
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
//   }
// }
// ChatGPT said:
// Below are the key issues and fixes in your POST /api/checkout handler:

// 1. Missed Function Call for Connecting to the Database
// // 3) Connect to DB (note the parentheses)
// await connectToDatabase
// Problem: You wrote await connectToDatabase instead of invoking it. That means you are awaiting the function object itself, not actually opening a connection.

// Consequence: As a result, your code never actually connects to MongoDB before calling Order.create(…), which will cause runtime errors or a hanging request.

// Fix: Add parentheses so the function actually runs:

// - await connectToDatabase
// + await connectToDatabase()
// 2. Duplicated userId Checks
// const { userId, customer, paymentMethod, items, total } = await req.json();
// if (!userId || typeof userId !== "string") {
//   return NextResponse.json({ error: "Invalid user" }, { status: 400 });
// }
// Yet immediately afterward you use:

// const order = await Order.create({
//   userId: session.user.id,
//   ...
// })
// Problem: You validate userId from the request body, but then ignore it and use session.user.id when creating the order. If those two values ever disagree, you end up trusting session.user.id and throwing away the request’s userId. Conversely, if session.user.id were missing (though you checked it earlier), you’d already returned a 401.

// Fix: Pick one source of truth—either:

// Use the session ID (recommended). In that case, remove the userId check from the request body entirely. Instead just rely on:

// const session = await auth();
// if (!session?.user?.id) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }

// // No need to read `userId` from JSON
// const { customer, paymentMethod, items, total } = await req.json();

// // …validate customer, items, etc.…
// // Create using session.user.id
// const order = await Order.create({
//   userId: session.user.id,
//   shippingAddress: customer,
//   paymentMethod,
//   items,
//   total,
// });
// Trust the request’s userId (less secure). Then you must still verify it matches the authenticated user:

// const { userId, customer, paymentMethod, items, total } = await req.json();
// if (!session?.user?.id || session.user.id !== userId) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }
// // …validate other fields…
// const order = await Order.create({
//   userId, // same as session.user.id
//   shippingAddress: customer,
//   paymentMethod,
//   items,
//   total,
// });
// Most apps simply ignore the request’s userId entirely and always use session.user.id as the one true ID. If that’s your approach, remove this block:

// if (!userId || typeof userId !== "string") {
//   return NextResponse.json({ error: "Invalid user" }, { status: 400 });
// }
// 3. Missing Validation for items and total
// const { userId, customer, paymentMethod, items, total } = await req.json();
// if (!customer || typeof customer !== "object") {
//   return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
// }
// // … no check for `items` or `total` …
// Problem: You only check that customer is an object. If items isn’t an array, or total isn’t a number, then Order.create({ items, total, … }) could throw or insert malformed data.

// Fix (minimum): Add simple shape checks:

// if (!Array.isArray(items) || items.length === 0) {
//   return NextResponse.json({ error: "Items must be a non-empty array" }, { status: 400 });
// }
// if (typeof total !== "number" || total < 0) {
//   return NextResponse.json({ error: "Total must be a non-negative number" }, { status: 400 });
// }
// For stronger guarantees, use a schema validator like Zod:

// import { z } from "zod";

// const CheckoutSchema = z.object({
//   customer: z.object({
//     firstName: z.string().min(1),
//     lastName: z.string().min(1),
//     email: z.string().email(),
//     phone: z.string().min(5),
//     address: z.string().min(1),
//     city: z.string().min(1),
//     country: z.string().min(1),
//     postalCode: z.string().min(1),
//   }),
//   paymentMethod: z.string().min(1),
//   items: z.array(
//     z.object({
//       id: z.string(),
//       name: z.string(),
//       price: z.number().nonnegative(),
//       quantity: z.number().min(1),
//     })
//   ),
//   total: z.number().nonnegative(),
// });

// const parseResult = CheckoutSchema.safeParse(await req.json());
// if (!parseResult.success) {
//   return NextResponse.json(
//     { error: "Invalid request data", issues: parseResult.error.format() },
//     { status: 400 }
//   );
// }
// const { customer, paymentMethod, items, total } = parseResult.data;
// 4. Correcting the DB Connection Call
// Putting it all together, here’s an updated route that:

// Always uses session.user.id as the user ID.

// Validates customer, items, and total.

// Actually invokes connectToDatabase().

// // app/api/checkout/route.ts

// import { NextResponse } from "next/server"
// import connectToDatabase from "@/lib/db/dbConnection"
// import { auth } from "@/auth"
// import { Order } from "@/lib/db/models/order"

// // Optional: Zod schema for robust validation
// import { z } from "zod"

// const CustomerSchema = z.object({
//   firstName: z.string().min(1),
//   lastName: z.string().min(1),
//   email: z.string().email(),
//   phone: z.string().min(5),
//   address: z.string().min(1),
//   city: z.string().min(1),
//   country: z.string().min(1),
//   postalCode: z.string().min(1),
// })

// const ItemSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   price: z.number().nonnegative(),
//   quantity: z.number().min(1),
// })

// const CheckoutSchema = z.object({
//   customer: CustomerSchema,
//   paymentMethod: z.string().min(1),
//   items: z.array(ItemSchema).min(1),
//   total: z.number().nonnegative(),
// })

// export async function POST(req: Request) {
//   // 1) Authenticate the request
//   const session = await auth()
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 2) Parse & validate JSON payload
//   const body = await req.json()
//   const parseResult = CheckoutSchema.safeParse(body)
//   if (!parseResult.success) {
//     return NextResponse.json(
//       { error: "Invalid request data", issues: parseResult.error.format() },
//       { status: 400 }
//     )
//   }

//   const { customer, paymentMethod, items, total } = parseResult.data

//   // 3) Connect to DB
//   await connectToDatabase()

//   try {
//     // 4) Create the order using session.user.id
//     const order = await Order.create({
//       userId: session.user.id,
//       shippingAddress: customer,
//       paymentMethod,
//       items,
//       total,
//     })

//     return NextResponse.json(order, { status: 201 })
//   } catch (err) {
//     console.error("CHECKOUT_ERROR", err)
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
//   }
// }
// Summary of fixes:
// Invoke await connectToDatabase() instead of await connectToDatabase.

// Use session.user.id (not the userId from the request body) to prevent mismatches.

// Validate the request payload—at least check that items is an array and total is a number.

// (Optional) Use a schema library like Zod for comprehensive shape validation.

// With these adjustments, your /api/checkout route will correctly authenticate, validate inputs, connect to MongoDB, and create the order record tied to the authenticated user.

// You said:
// user id is not being returned when i check the payload
// ChatGPT said:
// If you’re seeing session.user.id come back as undefined in your component (and thus userId never shows up in your checkout request body), it means your NextAuth callbacks aren’t actually populating id into the session. Here are a few steps to diagnose and fix:

// 1. Verify your NextAuth API route is active
// NextAuth must be mounted at /api/auth/[...nextauth].ts (or .js) so that:

// Requests to /api/auth/signin and

// Calls to auth() in your server code

// all go through the same NextAuth configuration (including callbacks). If you simply created an auth.ts file in some arbitrary folder, Next.js will not automatically wire that up. Make sure your file structure looks like:

// /pages
//   /api
//     /auth
//       [...nextauth].ts     ←– this must be the filename
// Inside pages/api/auth/[...nextauth].ts, you should have something like:

// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import Tiktok from "next-auth/providers/tiktok"
// import Instagram from "next-auth/providers/instagram"
// import { NextAuthOptions } from "next-auth"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       credentials: { password: { label: "Password", type: "password" } },
//       async authorize(credentials) {
//         if (credentials?.password !== "password") return null
//         return { id: "test", name: "Test User", email: "test@example.com" }
//       },
//     }),
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Tiktok({
//       clientId: process.env.TIKTOK_CLIENT_ID!,
//       clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//     }),
//     Instagram({
//       clientId: process.env.INSTAGRAM_CLIENT_ID!,
//       clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       // On sign-in, NextAuth passes `user` (with .id) to this callback.
//       if (user) token.id = user.id
//       return token
//     },
//     async session({ session, token }) {
//       // Copy token.id into session.user.id
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },

//   pages: {
//     signIn: "/login",
//     signOut: "/sign-out",
//   },
// }

// export default NextAuth(authOptions)
// If your file isn’t literally at /pages/api/auth/[...nextauth].ts, Next.js will not run these callbacks. In other words, the NextAuth “engine” won’t be inserted into the /api route tree, so session.user.id never gets injected.

// 2. Double-check your TypeScript declarations
// In types.d.ts (or anywhere under src/ as long as it’s included in tsconfig.json), you need:

// import { DefaultSession } from "next-auth"
// import { DefaultJWT } from "next-auth/jwt"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id?: string
//   }
// }
// Make sure that tsconfig.json’s "include" array actually mentions types.d.ts. For example:

// {
//   "compilerOptions": { /* … */ },
//   "include": [
//     "next-env.d.ts",
//     "**/*.ts",
//     "**/*.tsx",
//     "types.d.ts"
//   ]
// }
// If the declaration file is not included, TypeScript might hide type errors, but the runtime behavior could still work (or fail). If you see type errors about “id does not exist on session.user,” that’s a sign that the file isn’t being loaded.

// 3. Test useSession() directly
// In your checkout page (client side), add a quick log to see what session actually contains:

// import { useSession } from "next-auth/react"
// import { useEffect } from "react"

// export default function CheckoutPage() {
//   const { data: session, status } = useSession()

//   useEffect(() => {
//     console.log("SESSION object:", session)
//   }, [session])

//   // …rest of your component…
// }
// Reload the page (and sign in if necessary).

// Look in the browser console for the “SESSION object” log. You should see something like:

// {
//   user: {
//     id: "test",         // <— this must appear
//     name: "Test User",
//     email: "test@example.com",
//     image: null
//   },
//   expires: "2025-06-xxTxx:xx:xx.000Z"
// }
// If you see session.user.id: undefined (or the entire user object missing), that means the NextAuth callbacks did not run (commonly because the API route isn’t wired up at /api/auth/[...nextauth].ts).

// 4. Make sure you’re actually signed in
// Sometimes it’s possible to hit useSession() before the user signs in (e.g. you cleared cookies or your session expired). Confirm you have:

// Visited /login (or whatever custom sign-in page you have).

// Completed the flow (e.g. entered “password” for credentials, or clicked the Google/TikTok/Instagram sign-in button).

// After you sign in, you should be redirected back to the checkout page. Only then will session.user.id appear.

// If the user is still “unauthenticated” (status === "unauthenticated"), obviously session.user is undefined.

// 5. Example of a working flow
// Sign in at /login.

// After successful login, you’re redirected back (e.g. to /checkout).

// In your checkout page’s console you see:

// SESSION object: {
//   user: {
//     id: "test",
//     name: "Test User",
//     email: "test@example.com",
//     image: null
//   },
//   expires: "2025-06-xxTxx:xx:xx.000Z"
// }
// Submit the order: your fetch body now contains:

// {
//   "userId": "test",
//   "customer": { … },
//   "paymentMethod": "Visa",
//   "items": [ … ],
//   "total": 123.45
// }
// If at any point session.user.id is missing, go back to step 1 and confirm:

// /pages/api/auth/[...nextauth].ts exists and exports NextAuth(authOptions).

// callbacks.jwt/callbacks.session are present.

// types.d.ts is included in tsconfig.json.

// You have environment variables set (especially NEXTAUTH_SECRET).

// You actually click “Sign in” and complete the provider’s flow.

// TL;DR
// Most likely, your NextAuth file is not named (or not located) as /pages/api/auth/[...nextauth].ts. Until it’s in exactly that folder path, Next.js will not run the callbacks you wrote, so session.user.id will remain undefined. Rename or relocate your file to /pages/api/auth/[...nextauth].ts, restart the server, and then test again. You should then see session.user.id populate correctly.

// You said:
// C:\Users\YOUNG TYCOO…eckout\page.tsx:135 Checkout error response: 
// {error: 'Unauthorized'}
// error
// : 
// "Unauthorized"
// [[Prototype]]
// : 
// Object
// handleOrderSubmit	@	C:\Users\YOUNG TYCOO…eckout\page.tsx:135
// <button>		
// Button	@	C:\Users\YOUNG TYCOO…ts\ui\button.tsx:50
// <Button>		
// CheckoutPage	@	C:\Users\YOUNG TYCOO…eckout\page.tsx:312
// ChatGPT said:
// The “Unauthorized” error in your checkout payload indicates that, on the server side,

// const session = await auth();
// if (!session?.user?.id) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }
// is running with session.user.id === undefined. In other words, your NextAuth session is not being picked up by auth() and therefore you never see a valid user.id on the server.

// Below are the most common reasons for this, and exactly how to fix each one.

// 1. Make sure your NextAuth route is in pages/api/auth/[...nextauth].ts
// Every NextAuth setup in a “pages/”‐based project must live in a file named pages/api/auth/[...nextauth].ts. If you place it anywhere else (for example, in src/auth.ts), Next.js will not wire up the NextAuth handlers, and useSession() on the client side will never actually create a valid session cookie.

// Create (or move) your NextAuth file to:

// /pages
//   /api
//     /auth
//       [...nextauth].ts
// Inside that file, export NextAuth. For example:

// // pages/api/auth/[...nextauth].ts
// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import Tiktok from "next-auth/providers/tiktok"
// import Instagram from "next-auth/providers/instagram"

// export default NextAuth({
//   providers: [
//     Credentials({
//       credentials: { password: { label: "Password", type: "password" } },
//       async authorize(credentials) {
//         if (credentials?.password !== "password") return null
//         return { id: "test", name: "Test User", email: "test@example.com" }
//       },
//     }),
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Tiktok({
//       clientId: process.env.TIKTOK_CLIENT_ID!,
//       clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//     }),
//     Instagram({
//       clientId: process.env.INSTAGRAM_CLIENT_ID!,
//       clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) session.user.id = token.id as string
//       return session
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },

//   pages: {
//     signIn: "/login",
//     signOut: "/sign-out",
//   },
// })
// Once this file is in pages/api/auth/[...nextauth].ts, Next.js will register:

// GET /api/auth/signin

// GET /api/auth/signout

// POST /api/auth/callback/… for each provider

// and the underlying API that sets/reads cookies on every request, so that useSession() (on the client) and getServerSession() or your custom auth() (on the server) will actually work.

// 2. If you’re using the App Router (app/), use getServerSession(authOptions) instead of a custom auth()
// In Next.js 13+ with the App Router, the recommended way to read a server‐side session inside your /app/api/* route is:

// // app/api/checkout/route.ts
// import { NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/pages/api/auth/[...nextauth]"  // or wherever you export it
// import connectToDatabase from "@/lib/db/dbConnection"
// import { Order } from "@/lib/db/models/order"

// export async function POST(req: Request) {
//   // 1) Read the session from the request context
//   const session = await getServerSession(authOptions)

//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 2) Parse & validate body…
//   const { customer, paymentMethod, items, total } = await req.json()
//   // … do any additional checks …

//   // 3) Connect to the database
//   await connectToDatabase()

//   // 4) Create the order
//   try {
//     const order = await Order.create({
//       userId: session.user.id,
//       shippingAddress: customer,
//       paymentMethod,
//       items,
//       total,
//     })
//     return NextResponse.json(order, { status: 201 })
//   } catch (err) {
//     console.error("CHECKOUT_ERROR", err)
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
//   }
// }
// Why this matters:

// In the App Router, Next.js does not automatically pass cookies into a custom auth() helper.

// getServerSession(authOptions) is guaranteed to read the incoming request’s cookies (including the NextAuth JWT cookie) and build a valid session object.

// If you had a custom auth() that looked like export const { auth } = NextAuth(authOptions), that auth() call would not automatically know about the incoming cookies in the App Router context—you would need to explicitly pass them in, which is error‐prone. In contrast, getServerSession(authOptions) is the built‐in, recommended approach.

// 3. Verify that the client actually signs in and holds a valid session cookie
// Even if your NextAuth file is correct and you use getServerSession, the user must:

// Visit /login (or whatever you configured as pages.signIn)

// Complete the provider flow (e.g. click “Sign in with Google” or enter the password “password” for credentials)

// Be redirected back to your checkout page with a valid JWT cookie set in the browser

// You can verify this quickly:

// // In your CheckoutPage component (client side)
// import { useSession } from "next-auth/react"
// import { useEffect } from "react"

// export default function CheckoutPage() {
//   const { data: session, status } = useSession()

//   useEffect(() => {
//     console.log("🔥 Client sees session:", session)
//   }, [session])

//   // … rest of your component …
// }
// Reload the page after you sign in.

// Open your browser’s DevTools → Application → Cookies → your-domain.com.

// Look for a cookie named next-auth.session-token (or __Secure-next-auth.session-token in production with HTTPS).

// If you do not see that cookie, the login did not actually complete (maybe you never clicked “Sign in,” or there was an error).

// 4. Summary
// If you’re on the Pages Router (pages/):

// Your NextAuth file must live at pages/api/auth/[...nextauth].ts exactly.

// Inside that file, export NextAuth({ … }) with callbacks.jwt and callbacks.session that set token.id and session.user.id.

// Then useSession() on the client will yield a session.user.id.

// If you’re on the App Router (app/):

// You still need a Pages‐Router NextAuth file at pages/api/auth/[...nextauth].ts.

// In your API route (e.g. app/api/checkout/route.ts), use:

// import { getServerSession } from "next-auth"
// import { authOptions } from "@/pages/api/auth/[...nextauth]" 
// const session = await getServerSession(authOptions)
// Do not rely on a custom auth() helper unless you explicitly pass the request cookies into it.

// Once you unify on exactly one of those patterns—Pages Router with useSession() and auth() or App Router with useSession() and getServerSession()—you will see session.user.id appear both on the client and on the server. At that point, your checkout fetch body will include a valid "userId": "some‐string" and the server will accept it instead of returning “Unauthorized.”

// You said:
// async session({ session, token, user }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return {
//         ...session,
//         user: {
//           ...session.user,
          
//         },
//       }

//     },
// ChatGPT said:
// Your session callback is almost correct—by assigning session.user.id = token.id, you’re ensuring user.id is populated. However, the extra return shape you wrote:

// return {
//   ...session,
//   user: {
//     ...session.user,
//   },
// }
// is functionally the same as simply returning session (since you’re not adding any new properties under user). In other words, those two forms are equivalent:

// // A. Your current structure
// return {
//   ...session,
//   user: {
//     ...session.user,
//   },
// }

// // B. A simpler equivalent
// return session
// Why you can just return session
// When you do:

// if (session.user) {
//   session.user.id = token.id as string
// }
// return {
//   ...session,
//   user: {
//     ...session.user,
//   },
// }
// You mutate session.user.id in place.

// Then you spread ...session and ...session.user back into a new object—but you’re not actually injecting any extra fields beyond what’s already in session.user.

// So it has the same runtime effect as:

// if (session.user) {
//   session.user.id = token.id as string
// }
// return session
// Which is the recommended pattern.

// The simplest “session” callback
// Unless you need to add other fields (for example, session.user.role or some custom token claims), you can condense your callback to:

// callbacks: {
//   async jwt({ token, user }) {
//     if (user) {
//       token.id = user.id
//     }
//     return token
//   },
//   async session({ session, token }) {
//     if (session.user) {
//       session.user.id = token.id as string
//     }
//     return session
//   },
// },
// That will:

// On sign-in, store user.id into token.id (in the jwt callback).

// Whenever useSession() (or your server code) reads the session, copy token.id into session.user.id, then return session.

// Example with extra custom fields
// If you wanted to include additional data from the token or from user, you would extend the returned object. For instance, suppose your token has both id and a role claim, and you want:

// {
//   user: {
//     id: "abc123",
//     name: "Alice",
//     email: "alice@example.com",
//     role: "admin"
//   },
//   expires: "2025-06-01T12:00:00.000Z"
// }
// You would write:

// callbacks: {
//   async jwt({ token, user }) {
//     if (user) {
//       token.id = user.id
//       // Suppose `user.role` also exists at sign-in time
//       token.role = (user as any).role ?? "user"
//     }
//     return token
//   },
//   async session({ session, token }) {
//     if (session.user) {
//       session.user.id = token.id as string
//       // Inject the role from token into session.user
//       (session.user as any).role = token.role as string
//     }
//     return session
//   },
// },
// Notice here we add role to session.user on return. In that scenario, the return shape would need the spread:

// return {
//   ...session,
//   user: {
//     ...session.user,
//     role: token.role as string,
//   },
// }
// But if you’re only adding id—which you already assigned inside session.user—it’s safe to return session directly.

// In summary
// If your goal is only to have session.user.id = token.id, you can simplify to:

// async session({ session, token }) {
//   if (session.user) session.user.id = token.id as string
//   return session
// }
// Use the more verbose spread/merge only if you plan to inject additional fields (e.g. role, permissions, etc.).

// Either form will populate session.user.id correctly—just pick the simpler version when you don’t need to add any other properties.

// You said:
//  GET /api/auth/session 200 in 41ms
// {
//   user: {
//     name: 'Collins',
//     email: 'ngigecollins630@gmail.com',
//     image: 'https://lh3.googleusercontent.com/a/ACg8ocJZQM4FR3bMfF_IW2chewxTVua49ZlXZIre4MyY9p8jj30Av2z1=s96-c',
//     id: undefined
//   },
// ChatGPT said:
// The fact that you see:

// {
//   user: {
//     name: "Collins",
//     email: "ngigecollins630@gmail.com",
//     image: "...",
//     id: undefined
//   }
// }
// means that your session callback never actually copied token.id into session.user.id. In other words, token.id was never set (or was lost), so by the time session() runs, token.id is undefined.

// Below are the most common reasons for this and the precise fixes:

// 1. Ensure your jwt callback actually sets token.id
// Inside your NextAuth configuration (in pages/api/auth/[...nextauth].ts), you must have a jwt callback that looks something like this:

// callbacks: {
//   async jwt({ token, user }) {
//     // The `user` object is only defined on the very first sign‐in.
//     if (user) {
//       token.id = user.id
//     }
//     return token
//   },
//   async session({ session, token }) {
//     // Now token.id should be available, so copy it into session.user.id
//     if (session.user) {
//       session.user.id = token.id as string
//     }
//     return session
//   },
// },
// Possible mistakes that lead to token.id never being set:

// Forgot to mark async
// If you write jwt({ token, user }) { … } without async, any await inside won’t run as expected, but most importantly the function signature changes. Make sure it’s:

// async jwt({ token, user }) { … }
// Not returning the modified token
// You must always return token at the end of the jwt callback. If you forget, NextAuth will use a fresh token object with no id.

// Your authorize function never returns id
// In a Credentials flow, your authorize() must return an object containing id. For example:

// Credentials({
//   credentials: { password: { label: "Password", type: "password" } },
//   async authorize(credentials) {
//     if (credentials?.password !== "password") return null
//     return {
//       id: "some‐unique‐id",      // ← This must exist
//       name: "Collins",
//       email: "ngigecollins630@gmail.com",
//     }
//   }
// })
// If you returned { name, email } but no id, then user.id is undefined on the first sign‐in, so jwt() never sets token.id.

// Action items:

// Open pages/api/auth/[...nextauth].ts.

// Verify your Credentials provider’s authorize always returns an object that includes an id string.

// Verify your jwt callback is exactly:

// async jwt({ token, user }) {
//   if (user) {
//     token.id = user.id
//   }
//   return token
// }
// Verify you return session in the session callback:

// async session({ session, token }) {
//   if (session.user) {
//     session.user.id = token.id as string
//   }
//   return session
// }
// After you correct those, do a full restart of your dev server—any change in pages/api/auth/[...nextauth].ts requires a server restart.

// 2. Check the flow for OAuth providers (Google/TikTok/Instagram)
// If you signed in with Google (or any OAuth provider), NextAuth will fetch a “profile” object from Google that typically includes sub (the unique user ID). NextAuth automatically maps that to user.id for you. But:

// If your environment variables (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET) are missing or incorrect, the provider may fail silently, and you might fall back to a different sign‐in path.

// If you never clicked “Sign in with Google” and only used Credentials (with id: "test"), then you must carefully inspect that id is indeed "test" immediately after sign‐in.

// In short: test each provider path. After you sign in with Google, open your browser console briefly on the callback page to see:

// const { data: session } = useSession()
// console.log("After Google sign‐in, session:", session)
// You should see:

// {
//   user: {
//     name: "Your Name from Google",
//     email: "your.email@gmail.com",
//     image: "https://…",
//     id: "some‐Google‐ID"
//   },
//   expires: "…"
// }
// If you instead see id: undefined, that means the jwt() callback did not copy the profile’s sub into token.id. Confirm your jwt callback is present and correct.

// 3. Confirm your NextAuth file lives at the correct path
// In a Pages‐Router setup, the NextAuth configuration must be in:

// /pages
//   /api
//     /auth
//       [...nextauth].ts
// If it’s anywhere else (e.g. in src/auth.ts or pages/auth.ts), Next.js will not register your callbacks. Double‐check the path is exactly /pages/api/auth/[...nextauth].ts. If it is not, move it there.

// 4. Example of a fully working pages/api/auth/[...nextauth].ts
// Copy‐paste this entire file (adjust your provider config as needed) and restart:

// // pages/api/auth/[...nextauth].ts

// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import Tiktok from "next-auth/providers/tiktok"
// import Instagram from "next-auth/providers/instagram"
// import { NextAuthOptions } from "next-auth"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: { password: { label: "Password", type: "password" } },
//       async authorize(credentials) {
//         // Example: only accept the literal password "password"
//         if (credentials?.password !== "password") {
//           return null
//         }
//         return {
//           id: "test",  // must return an `id` here
//           name: "Collins",
//           email: "ngigecollins630@gmail.com",
//         }
//       },
//     }),
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Tiktok({
//       clientId: process.env.TIKTOK_CLIENT_ID!,
//       clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//     }),
//     Instagram({
//       clientId: process.env.INSTAGRAM_CLIENT_ID!,
//       clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//     signOut: "/sign-out",
//   },
// }

// export default NextAuth(authOptions)
// Restart your dev server.

// Go to http://localhost:3000/api/auth/signin and sign in (via credentials or Google, etc.).

// After successful sign‐in, head back to /checkout and check the console:

// // In your CheckoutPage component:
// useEffect(() => {
//   console.log("Session on client:", session)
// }, [session])
// It should now show:

// {
//   user: {
//     name: "Collins",
//     email: "ngigecollins630@gmail.com",
//     image: "…",
//     id: "test"           // <— not undefined
//   },
//   expires: "…"
// }
// Submit your order—the server’s auth() (or getServerSession()) will now see session.user.id as "test", and the 401 “Unauthorized” error will disappear.

// TL;DR
// Ensure your NextAuth file is at /pages/api/auth/[...nextauth].ts.

// Ensure your authorize() returns a valid id.

// Ensure your jwt() callback does token.id = user.id.

// Ensure your session() callback does session.user.id = token.id.

// Restart the server after making these changes.

// Once those points are all correct, session.user.id will no longer be undefined and your checkout endpoint will accept the request instead of returning 401.

// You said:
// make this card dynamic to show previous orders after completing the above checkout: // components/OrderCard.tsx

// import Image from 'next/image'
// import { Button } from "@/components/ui/button"
// import { CheckCircle } from "lucide-react"

// export function OrderCard() {
//   return (
//     <div className="border rounded-xl p-6 space-y-4 shadow-sm">
//       {/* Top section: Order info + buttons */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
//           <div>
//             <div className="font-medium text-black">Order number</div>
//             <div>WU88191111</div>
//           </div>
//           <div>
//             <div className="font-medium text-black">Date placed</div>
//             <div>Jul 6, 2021</div>
//           </div>
//           <div>
//             <div className="font-medium text-black">Total amount</div>
//             <div>$160.00</div>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">View Order</Button>
//           <Button variant="outline">View Invoice</Button>
//         </div>
//       </div>

//       <hr />

//       {/* Product section */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         {/* Product image */}
//         <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//           <Image
//             src="/images/backpack.png" // Replace with actual image path
//             alt="Micro Backpack"
//             width={96}
//             height={96}
//             className="object-contain w-full h-full"
//           />
//         </div>

//         {/* Product details */}
//         <div className="flex-1 space-y-1 text-sm">
//           <div className="flex justify-between">
//             <p className="font-medium text-black">Micro Backpack</p>
//             <p className="font-medium text-black">$70.00</p>
//           </div>
//           <p className="text-muted-foreground">
//             Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.
//           </p>

//           {/* Delivery status */}
//           <div className="flex items-center gap-2 text-green-600 mt-2">
//             <CheckCircle size={16} />
//             <span className="text-sm">Delivered on July 12, 2021</span>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-4 text-sm font-medium mt-2">
//             <a href="#" className="text-purple-600 hover:underline">View product</a>
//             <a href="#" className="text-purple-600 hover:underline">Buy again</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// ChatGPT said:
// Below is a fully‐dynamic version of OrderCard.tsx. It accepts an order prop (with all the necessary fields) and renders the UI accordingly. You can then fetch a user’s past orders (from your API/DB) and map over them like:

// {orders.map((order) => (
//   <OrderCard key={order._id} order={order} />
// ))}
// 1. Define a TypeScript interface for your order data
// First, create (or modify) a shared type file (e.g. types.d.ts or types/order.ts) to describe what an Order looks like on the frontend. For example:

// // types/order.ts

// export interface OrderedItem {
//   id: string
//   name: string
//   description: string
//   imageUrl: string
//   price: number
//   quantity: number
//   deliveredAt?: string   // ISO date string, if delivered
// }

// export interface Order {
//   _id: string
//   orderNumber: string        // e.g. "WU88191111"
//   createdAt: string          // ISO date string of when the order was placed
//   totalAmount: number
//   items: OrderedItem[]
//   deliveryStatus?: "pending" | "shipped" | "delivered" | "cancelled"
//   deliveredAt?: string       // ISO date string if delivered
// }
// You may already have a similar Mongoose schema on the server, but this interface is what you’ll use in React/Next components.

// 2. Create components/OrderCard.tsx
// // components/OrderCard.tsx
// 'use client'

// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { CheckCircle } from 'lucide-react'
// import { format } from 'date-fns'
// import { Order } from '@/types/order'

// interface OrderCardProps {
//   order: Order
//   onViewOrder?: (orderId: string) => void
//   onViewInvoice?: (orderId: string) => void
//   onBuyAgain?: (itemId: string) => void
// }

// export function OrderCard({
//   order,
//   onViewOrder,
//   onViewInvoice,
//   onBuyAgain,
// }: OrderCardProps) {
//   // Format the order date (e.g. "Jul 6, 2021")
//   const orderDate = format(new Date(order.createdAt), 'MMM d, yyyy')

//   return (
//     <div className="border rounded-xl p-6 space-y-4 shadow-sm">
//       {/* ── Top section: Order info + buttons ── */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
//           <div>
//             <div className="font-medium text-black">Order number</div>
//             <div>{order.orderNumber}</div>
//           </div>
//           <div>
//             <div className="font-medium text-black">Date placed</div>
//             <div>{orderDate}</div>
//           </div>
//           <div>
//             <div className="font-medium text-black">Total amount</div>
//             <div>${order.totalAmount.toFixed(2)}</div>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             onClick={() => onViewOrder?.(order._id)}
//           >
//             View Order
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => onViewInvoice?.(order._id)}
//           >
//             View Invoice
//           </Button>
//         </div>
//       </div>

//       <hr />

//       {/* ── For each ordered item, render a sub‐card ── */}
//       {order.items.map((item) => {
//         // Format delivery date if available
//         const deliveredOn =
//           item.deliveredAt &&
//           format(new Date(item.deliveredAt), 'MMM d, yyyy')

//         return (
//           <div
//             key={item.id}
//             className="flex flex-col sm:flex-row gap-4 pb-4 border-b last:border-b-0"
//           >
//             {/* Image */}
//             <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//               <Image
//                 src={item.imageUrl}
//                 alt={item.name}
//                 width={96}
//                 height={96}
//                 className="object-contain w-full h-full"
//               />
//             </div>

//             {/* Details */}
//             <div className="flex-1 space-y-1 text-sm">
//               <div className="flex justify-between">
//                 <p className="font-medium text-black">{item.name}</p>
//                 <p className="font-medium text-black">
//                   ${item.price.toFixed(2)} &times; {item.quantity}
//                 </p>
//               </div>
//               <p className="text-muted-foreground">{item.description}</p>

//               {/* Delivery status */}
//               {order.deliveryStatus === 'delivered' && deliveredOn ? (
//                 <div className="flex items-center gap-2 text-green-600 mt-2">
//                   <CheckCircle size={16} />
//                   <span className="text-sm">
//                     Delivered on {deliveredOn}
//                   </span>
//                 </div>
//               ) : order.deliveryStatus === 'shipped' ? (
//                 <div className="flex items-center gap-2 text-blue-600 mt-2">
//                   <span className="font-medium">Shipped</span>
//                 </div>
//               ) : order.deliveryStatus === 'pending' ? (
//                 <div className="flex items-center gap-2 text-yellow-600 mt-2">
//                   <span className="font-medium">Pending</span>
//                 </div>
//               ) : order.deliveryStatus === 'cancelled' ? (
//                 <div className="flex items-center gap-2 text-red-600 mt-2">
//                   <span className="font-medium">Cancelled</span>
//                 </div>
//               ) : null}

//               {/* Actions */}
//               <div className="flex gap-4 text-sm font-medium mt-2">
//                 <a
//                   href={`/products/${item.id}`}
//                   className="text-purple-600 hover:underline"
//                 >
//                   View product
//                 </a>
//                 <button
//                   onClick={() => onBuyAgain?.(item.id)}
//                   className="text-purple-600 hover:underline"
//                 >
//                   Buy again
//                 </button>
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }
// Notes on the above:

// Props (OrderCardProps)

// order: Order: Your order object.

// onViewOrder?(orderId): Optional callback when “View Order” is clicked.

// onViewInvoice?(orderId): Optional callback for “View Invoice.”

// onBuyAgain?(itemId): Optional callback to re‐purchase a specific item.

// Formatting dates
// We use date-fns’s format() to display createdAt and deliveredAt in a human‐readable form ("Jul 6, 2021"). Make sure to install it:

// npm install date-fns
// Delivery status

// If order.deliveryStatus === 'delivered' and item.deliveredAt is defined, we show a green check icon and “Delivered on ….”

// If it’s 'shipped', show a blue “Shipped.”

// If 'pending', show yellow “Pending.”

// If 'cancelled', show red “Cancelled.”
// Adjust colors and text as needed in your design.

// Action buttons/links

// “View Order” / “View Invoice” buttons live in the top right.

// Under each item, we render “View product” (links to /products/[item.id]) and a “Buy again” button that calls onBuyAgain(item.id).

// 3. Example usage in a page
// Below is a minimal example of how you might fetch the user’s past orders in your page.tsx and render a list of OrderCard components:

// // app/orders/page.tsx  (or pages/orders.tsx if using Pages Router)
// 'use client'

// import { useEffect, useState } from 'react'
// import OrderCard from '@/components/OrderCard'
// import { Order } from '@/types/order'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'

// export default function OrdersPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [orders, setOrders] = useState<Order[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (status === 'loading') return
//     if (status === 'unauthenticated') {
//       router.push('/login')
//       return
//     }

//     async function fetchOrders() {
//       try {
//         const res = await fetch('/api/orders') // your endpoint to get user orders
//         if (!res.ok) throw new Error('Failed to fetch orders')
//         const data: Order[] = await res.json()
//         setOrders(data)
//       } catch (err) {
//         console.error(err)
//         toast.error('Could not load your orders.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrders()
//   }, [status, router])

//   if (status === 'loading' || loading) {
//     return <div className="p-6">Loading orders…</div>
//   }

//   return (
//     <main className="p-6 max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">My Orders</h1>
//       {orders.length === 0 ? (
//         <p className="text-muted-foreground">You have no past orders.</p>
//       ) : (
//         orders.map((order) => (
//           <OrderCard
//             key={order._id}
//             order={order}
//             onViewOrder={(orderId) => {
//               router.push(`/orders/${orderId}`)
//             }}
//             onViewInvoice={(orderId) => {
//               router.push(`/invoices/${orderId}`)
//             }}
//             onBuyAgain={(itemId) => {
//               // e.g. re-add to cart and redirect
//               console.log('Re-buy item', itemId)
//               // add to cart logic here…
//             }}
//           />
//         ))
//       )}
//     </main>
//   )
// }
// Explanation:

// We call useSession() to ensure the user is authenticated; if not, redirect to /login.

// If authenticated, we fetch('/api/orders')—an endpoint you must create on the server that returns something like:

// // Example server response:
// [
//   {
//     _id: 'abc123',
//     orderNumber: 'WU88191111',
//     createdAt: '2021-07-06T12:34:56.000Z',
//     totalAmount: 160.0,
//     items: [
//       {
//         id: 'prod1',
//         name: 'Micro Backpack',
//         description: 'Are you a minimalist …',
//         imageUrl: '/images/backpack.png',
//         price: 70.0,
//         quantity: 1,
//         deliveredAt: '2021-07-12T14:00:00.000Z',
//       },
//       {
//         id: 'prod2',
//         name: 'Slim Wallet',
//         description: 'A sleek wallet …',
//         imageUrl: '/images/wallet.png',
//         price: 90.0,
//         quantity: 1,
//         deliveredAt: '2021-07-12T14:00:00.000Z',
//       },
//     ],
//     deliveryStatus: 'delivered',
//     deliveredAt: '2021-07-12T14:00:00.000Z',
//   },
//   // …other orders…
// ]
// We store that array in orders state and map over it, rendering OrderCard for each.

// The onViewOrder and onViewInvoice props simply push to the corresponding page; adjust routes to match your application.

// 4. Summary
// Define a shared Order & OrderedItem interface so both server and client know the shape.

// Implement OrderCard.tsx to accept a single order prop and render everything dynamically (order number, date, total, each item, delivered date, etc.).

// On your page, fetch the user’s orders from /api/orders, store them in state, and map over them with <OrderCard order={…} />.

// This makes your “previous orders” UI fully dynamic: after a successful checkout, the new order shows up in /api/orders and immediately appears as a new OrderCard on your “My Orders” page.

// You said:
// C:\Users\YOUNG TYCOO…-orders\page.tsx:33 Error: Failed to fetch orders
//     at fetchOrders (C:\Users\YOUNG TYCOO…ders\page.tsx:29:28)
// fetchOrders	@	C:\Users\YOUNG TYCOO…-orders\page.tsx:33
// await in fetchOrders		
// OrdersPage.useEffect	@	C:\Users\YOUNG TYCOO…-orders\page.tsx:40
// "use server"		
// (app-pages-browser)/./node_modules/next/dist/client/app-index.js	@	main-app.js?v=1748636404399:160
// options.factory	@	webpack.js?v=1748636404399:717
// __webpack_require__	@	webpack.js?v=1748636404399:37
// fn	@	webpack.js?v=1748636404399:374
// (app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js	@	main-app.js?v=1748636404399:182
// options.factory	@	webpack.js?v=1748636404399:717
// __webpack_require__	@	webpack.js?v=1748636404399:37
// __webpack_exec__	@	main-app.js?v=1748636404399:2977
// (anonymous)	@	main-app.js?v=1748636404399:2978
// webpackJsonpCallback	@	webpack.js?v=1748636404399:1393
// (anonymous)
// ChatGPT said:
// The “Failed to fetch orders” message means your client tried to GET /api/orders but nothing responded (or it returned a non-OK status). You need to create an API route that returns the current user’s orders. Below is a minimal example of how to do that in the App Router. Adjust accordingly if you’re still using the Pages Router.

// 1. Create an “orders” API route
// If you’re using the Next.js App Router (app/ directory)
// Create a file at:

// app/api/orders/route.ts
// Inside route.ts, write:

// // app/api/orders/route.ts

// import { NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/pages/api/auth/[...nextauth]" // make sure this path matches where you export your NextAuth options
// import connectToDatabase from "@/lib/db/dbConnection"
// import { Order } from "@/lib/db/models/order"

// export async function GET(req: Request) {
//   // 1) Authenticate the user
//   const session = await getServerSession(authOptions)
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 2) Connect to your MongoDB (Mongoose) 
//   await connectToDatabase()

//   try {
//     // 3) Query all orders belonging to this user, sorted newest first
//     const userId = session.user.id
//     const orders = await Order.find({ userId })
//       .sort({ createdAt: -1 })
//       .lean()

//     // 4) Return them as JSON
//     return NextResponse.json(orders, { status: 200 })
//   } catch (err) {
//     console.error("FETCH_ORDERS_ERROR", err)
//     return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
//   }
// }
// Why each step matters:
// getServerSession(authOptions)
// Reads the incoming request’s cookies and returns the NextAuth session object (including session.user.id). If that id is missing, we return 401 Unauthorized.

// await connectToDatabase()
// Actually opens the Mongoose connection. (Note the ()—if you wrote await connectToDatabase without parentheses, it won’t run.)

// Order.find({ userId })
// Fetches only the orders where userId matches the signed-in user. We call .sort({ createdAt: -1 }) so that the most recent orders appear first.

// .lean()
// Converts Mongoose documents into plain JavaScript objects, which serializes to JSON faster.

// NextResponse.json(orders, { status: 200 })
// Sends back the array of orders with HTTP status 200. If anything goes wrong, we catch it and send a 500.

// 2. Adjust your client to call that endpoint
// In your OrdersPage component (e.g. app/(authenticated)/orders/page.tsx), update the fetch to match:

// // app/orders/page.tsx or wherever your “My Orders” page lives
// 'use client'

// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'
// import OrderCard from '@/components/OrderCard'
// import { Order } from '@/types/order'

// export default function OrdersPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [orders, setOrders] = useState<Order[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (status === 'loading') return
//     if (status === 'unauthenticated') {
//       router.push('/login')
//       return
//     }

//     async function fetchOrders() {
//       try {
//         const res = await fetch('/api/orders')
//         if (!res.ok) {
//           const errBody = await res.json()
//           throw new Error(errBody.error || 'Failed to fetch orders')
//         }
//         const data: Order[] = await res.json()
//         setOrders(data)
//       } catch (err) {
//         console.error('FETCH ORDERS ERROR', err)
//         toast.error('Could not load your orders.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrders()
//   }, [status, router])

//   if (status === 'loading' || loading) {
//     return <div className="p-6">Loading orders…</div>
//   }

//   return (
//     <main className="p-6 max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">My Orders</h1>
//       {orders.length === 0 ? (
//         <p className="text-muted-foreground">You have no past orders.</p>
//       ) : (
//         orders.map((order) => (
//           <OrderCard
//             key={order._id}
//             order={order}
//             onViewOrder={(orderId) => router.push(`/orders/${orderId}`)}
//             onViewInvoice={(orderId) => router.push(`/invoices/${orderId}`)}
//             onBuyAgain={(itemId) => {
//               // Example: add `itemId` to cart and redirect
//               localStorage.setItem('reBuyId', itemId)
//               router.push('/cart')
//             }}
//           />
//         ))
//       )}
//     </main>
//   )
// }
// Notice the fetch is now await fetch('/api/orders').

// We check res.ok; if not, we read res.json() for an error message.

// If successful, we setOrders(data).

// 3. Make sure your Order model matches what the frontend expects
// In @/lib/db/models/order.ts (or wherever you defined Order), confirm you have a schema that includes:

// import mongoose from 'mongoose'

// const OrderedItemSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   name: { type: String, required: true },
//   description: String,
//   imageUrl: String,
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   deliveredAt: Date,       // or String if you store as ISO
// })

// const OrderSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     orderNumber: { type: String, required: true, unique: true },
//     items: [OrderedItemSchema],
//     shippingAddress: {
//       firstName: String,
//       lastName: String,
//       email: String,
//       phone: String,
//       address: String,
//       city: String,
//       country: String,
//       postalCode: String,
//     },
//     paymentMethod: String,
//     totalAmount: Number,
//     deliveryStatus: {
//       type: String,
//       enum: ['pending', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },
//     deliveredAt: Date,
//   },
//   { timestamps: true }
// )

// export const Order =
//   mongoose.models.Order || mongoose.model('Order', OrderSchema)
// Key points:

// timestamps: true automatically adds createdAt and updatedAt.

// We store userId as a string (matching session.user.id).

// We give each order a unique orderNumber (you can auto‐generate that when you create the order).

// 4. How to generate and store orderNumber when creating the order
// When your checkout API created a new order, you probably did something like:

// // In your POST /api/checkout route
// const orderNumber = generateOrderNumber() // implement a function or use a UUID
// const newOrder = await Order.create({
//   userId: session.user.id,
//   orderNumber,
//   items,
//   shippingAddress: customer,
//   paymentMethod,
//   totalAmount: total,
//   deliveryStatus: 'pending',
// })
// Make sure you store that orderNumber in the document so that when you GET /api/orders, the client sees:

// [
//   {
//     _id: "abc123",
//     orderNumber: "WU88191111",
//     createdAt: "2025-05-30T12:34:56.000Z",
//     totalAmount: 160.0,
//     items: [ /* … */ ],
//     deliveryStatus: "delivered",
//     deliveredAt: "2025-06-05T14:00:00.000Z"
//   },
//   // …
// ]
// 5. Verify everything end-to-end
// Place an order on your checkout page. Ensure the POST to /api/checkout succeeds (200/201).

// Check your database: confirm the new Order document has fields like _id, orderNumber, userId, items, totalAmount, deliveryStatus, and timestamps.

// Navigate to /orders in the browser. Your OrdersPage component now does a GET /api/orders. If that endpoint is returning your array of order documents, you should see them rendered by OrderCard.

// Open the browser console and verify you no longer see “Failed to fetch orders.” Instead you see a 200 response and an array of orders in JSON form.

// Summary
// Step 1: Create app/api/orders/route.ts (or pages/api/orders.ts in Pages Router) that uses getServerSession(authOptions) (or auth()) to verify session.user.id, then queries Order.find({ userId }).

// Step 2: In your Orders page, fetch('/api/orders') and map over the returned array of orders, passing each to <OrderCard order={order} />.

// Step 3: Confirm your Mongoose schema matches what the frontend expects (especially fields like orderNumber, createdAt, items, totalAmount, deliveryStatus, deliveredAt).

// Step 4: After placing a new order, reload /orders and confirm the new order appears.

// Once you implement that API route and wire it up exactly as above, the “Failed to fetch orders” error will go away, and your dynamic OrderCard list will work.

// You said:
// generateOrderNumber()
// ChatGPT said:
// Below is a simple helper you can drop into your codebase (for example, in lib/utils/order.ts) that will produce a reasonably unique, human‐readable order number string each time you call generateOrderNumber().

// // lib/utils/order.ts

// /**
//  * Returns a semi‐unique order number string in the format:
//  *   ORD-YYYYMMDD-HHMMSS-XXXX
//  * where:
//  *   • YYYYMMDD is the current date
//  *   • HHMMSS is the current time
//  *   • XXXX is a four‐digit random number (0000–9999)
//  *
//  * Example output: "ORD-20250530-144523-0821"
//  */
// export function generateOrderNumber(): string {
//   const now = new Date()

//   // YYYYMMDD
//   const year  = now.getFullYear().toString()
//   const month = String(now.getMonth() + 1).padStart(2, '0')
//   const day   = String(now.getDate()).padStart(2, '0')

//   // HHMMSS
//   const hours   = String(now.getHours()).padStart(2, '0')
//   const minutes = String(now.getMinutes()).padStart(2, '0')
//   const seconds = String(now.getSeconds()).padStart(2, '0')

//   // a four‐digit random number
//   const randomSuffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0')

//   return `ORD-${year}${month}${day}-${hours}${minutes}${seconds}-${randomSuffix}`
// }
// How it works
// Date portion (YYYYMMDD)

// const year  = now.getFullYear().toString()             // e.g. "2025"
// const month = String(now.getMonth() + 1).padStart(2, '0') // e.g. "05"
// const day   = String(now.getDate()).padStart(2, '0')      // e.g. "30"
// // → "20250530"
// Time portion (HHMMSS)

// const hours   = String(now.getHours()).padStart(2, '0')   // e.g. "14"
// const minutes = String(now.getMinutes()).padStart(2, '0') // e.g. "45"
// const seconds = String(now.getSeconds()).padStart(2, '0') // e.g. "23"
// // → "144523"
// Random four digits

// const randomSuffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
// // e.g. Math.floor(Math.random()*10000) might be 821 → pad to "0821"
// Combine into a single string

// return `ORD-${year}${month}${day}-${hours}${minutes}${seconds}-${randomSuffix}`
// // Example: "ORD-20250530-144523-0821"
// Because the date/time portion changes each second and you append a random 4‐digit suffix, the chance of a collision is extremely low—especially if you’re generating a handful of orders per second.

// Usage
// Import and call generateOrderNumber() whenever you need a new order number, for example in your checkout handler:

// // In pages/api/checkout/route.ts (or app/api/checkout/route.ts)
// import { generateOrderNumber } from "@/lib/utils/order"

// export async function POST(req: Request) {
//   // … authenticate, parse body, etc. …

//   const orderNumber = generateOrderNumber()

//   const newOrder = await Order.create({
//     userId: session.user.id,
//     orderNumber,                // use our generated string
//     items,
//     shippingAddress: customer,
//     paymentMethod,
//     totalAmount: total,
//     deliveryStatus: "pending",
//   })

//   return NextResponse.json(newOrder, { status: 201 })
// }
// Now each order stored in MongoDB will have its own orderNumber field—e.g. "ORD-20250530-144523-0821". You can display that on the frontend, include it in emails, etc.

// Alternative: using nanoid
// If you’d prefer a cryptographically‐strong random ID rather than a timestamp‐based string, you can install nanoid and do something like:

// npm install nanoid
// // lib/utils/order.ts
// import { customAlphabet } from "nanoid"

// // Generate a 12‐character alphanumeric ID (A–Z, a–z, 0–9)
// const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12)

// export function generateOrderNumber(): string {
//   // Prefix with “ORD-” plus a short nanoid, e.g. "ORD‐G5k93AKLp2X7"
//   return `ORD-${nanoid()}`
// }
// Either approach is valid—go with timestamp+random if you like human‐readable chronology, or nanoid if you want purely random IDs.

// You said:
// import { NextResponse } from "next/server"
// import connectToDatabase from "@/lib/db/dbConnection"
// import { auth } from "@/auth"          // ← points to the file you just defined
// import { Order } from "@/lib/db/models/order"
// import { generateOrderNumber } from "@/lib/utils/order";


// export async function POST(req: Request) {
//   // 1) Authenticate the request
//   const session = await auth();
// if (!session?.user?.id) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }

//   // 2) Parse and validate the incoming JSON
//   const { customer, paymentMethod, items, total } = await req.json();
  
//   if (!customer || typeof customer !== "object") {
//     return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
//   }
//   // … (optional: add additional validation here) …

//   // 3) Connect to DB (note the parentheses)
//   await connectToDatabase

//   try {
//     // 4) Create the order with a valid userId
//     const orderNumber = generateOrderNumber() // implement a function or use a UUID
// const newOrder = await Order.create({
//   userId: session.user.id,
//   orderNumber,
//   items,
//   shippingAddress: customer,
//   paymentMethod,
//   totalAmount: total,
//   deliveryStatus: 'pending',
// });
    
//     return NextResponse.json(newOrder, { status: 201 })
//   } catch (err) {
//     console.error("CHECKOUT_ERROR", err)
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
//   }
// }
// ChatGPT said:
// The one issue here is that you never actually call connectToDatabase()—you only await the function reference itself. As a result, Mongoose never opens a connection before you do Order.create(...). To fix this, change:

//   // 3) Connect to DB (note the parentheses)
// - await connectToDatabase
// + await connectToDatabase()
// With that in place, your handler becomes:

// import { NextResponse } from "next/server"
// import connectToDatabase from "@/lib/db/dbConnection"
// import { auth } from "@/auth"
// import { Order } from "@/lib/db/models/order"
// import { generateOrderNumber } from "@/lib/utils/order";

// export async function POST(req: Request) {
//   // 1) Authenticate the request
//   const session = await auth();
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // 2) Parse and validate the incoming JSON
//   const { customer, paymentMethod, items, total } = await req.json();
//   if (!customer || typeof customer !== "object") {
//     return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
//   }
//   // …any other validation…

//   // 3) Connect to DB (invoke the function)
//   await connectToDatabase()

//   try {
//     // 4) Create the order with a valid userId
//     const orderNumber = generateOrderNumber();
//     const newOrder = await Order.create({
//       userId: session.user.id,
//       orderNumber,
//       items,
//       shippingAddress: customer,
//       paymentMethod,
//       totalAmount: total,
//       deliveryStatus: 'pending',
//     });

//     return NextResponse.json(newOrder, { status: 201 });
//   } catch (err) {
//     console.error("CHECKOUT_ERROR", err);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }
// You said:

// 'use client'

// import { useState } from 'react'
// import { Card, CardContent } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
// import { Button } from '@/components/ui/button'
// import Price from '@/lib/utils/format'

// import { typeOrder } from '@/lib/types/order'
// import { format } from 'date-fns'
// import { ShoppingBag, CheckCircle } from 'lucide-react'
// import { motion } from 'framer-motion'
// import Link from 'next/link'


// interface OrderCardProps {
//     order: typeOrder
//     // onViewOrder?: (orderId: string) => void
//     // onViewInvoice?: (orderId: string) => void
//     // onBuyAgain?: (itemId: string) => void
//   }

// export default function PreviousOrderCard({ order }: OrderCardProps) {
//   const orderDate = format(new Date(order.createdAt), 'MMM d, yyyy')
//   //const shippingAddress = order.shippingAddress
//   const [loading, setLoading] = useState(true)
  
  

  

  

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-white p-4 sm:p-6">
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="text-center w-full max-w-5xl"
//       >
//         <div className="flex justify-center mb-4">
//           <CheckCircle className="h-16 w-16 text-yellow-500 animate-pulse" />
//         </div>
//         <h1 className="text-3xl sm:text-5xl font-extrabold text-yellow-600 mb-2">
//           Thank You <span className="text-gray-800">For Purchasing</span>
//         </h1>

//         <Card className="mt-6 w-full bg-white relative shadow-lg border border-transparent bg-clip-padding before:absolute before:inset-0 before:rounded-xl before:border-[2px] before:border-yellow-200">
//           <CardContent className="relative z-10 p-4 sm:p-6">
//             <p className="text-lg font-medium text-gray-800 mb-4">
//               Thank you. Your order has been received.
//             </p>

//             <div className="grid grid-cols-2 sm:grid-cols-4 text-sm text-gray-700 gap-4 mb-6">
//               <div>
//                 <div  className='font-medium text-black'>Order Number:</div>
//                 {loading ? <Skeleton className="h-5 w-20 mt-1" /> : <div>{order.orderNumber}</div>}
//               </div>
//               <div>
//                 <div className="font-medium text-black">Date Placed</div>
//                 <div>{orderDate}</div>
//               </div>
//               <div>
//                 <div className="font-medium text-black">TOTAL:</div>
//                 <div><Price amount={order.totalAmount} /></div>
//               </div>
//               <div>
//                 <div className="font-medium text-black">PAYMENT METHOD:</div>
//                 <div>{order.paymentMethod}</div>
//               </div>
//             </div>

//             <div className="text-sm text-gray-600 mb-4">{order.paymentMethod}</div>

//             {/* Responsive Table for desktop, stacked cards for mobile */}
//             <div className="hidden sm:block border border-gray-200 rounded-lg overflow-hidden">
//               <table className="w-full text-sm text-left text-gray-600">
//                 <thead className="bg-yellow-100 text-yellow-800 uppercase text-xs">
//                   <tr>
//                     <th className="px-4 py-3">Product</th>
//                     <th className="px-4 py-3 text-right">Total</th>
//                     <th className="px-4 py-3 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading
//                     ? Array(3)
//                         .fill(0)
//                         .map((_, idx) => (
//                           <tr key={idx} className="border-t">
//                             <td className="px-4 py-3">
//                               <Skeleton className="h-5 w-24" />
//                             </td>
//                             <td className="px-4 py-3 text-right">
//                               <Skeleton className="h-5 w-12 mx-auto" />
//                             </td>
//                             <td className="px-4 py-3 text-right">
//                               <Skeleton className="h-6 w-20 mx-auto" />
//                             </td>
//                           </tr>
//                         ))
//                     : order.items.map((item) => (
                        
//                             <div key={${order._id}-${item.id}}>
//                                 <tr  className="border-t">
//                           <td className="px-4 py-3 font-medium text-black">{item.name}</td>
//                           <td className="px-4 py-3 font-medium text-black text-right"><Price amount={item.price} /> &times; {item.quantity}</td>
//                           <td className="px-4 py-3 font-medium text-black text-right">
//                             <Button
//                               variant="outline"
//                               size="sm"
                              
//                               className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
//                             >
//                                 <Link href={/product/${item.id}}>View & Rate</Link>
//                               View & Rate Product
//                             </Button>
//                           </td>
//                         </tr>
//                             </div>
                        
//                       ))}
//                   {!loading && (
//                     <tr className="border-t font-bold text-gray-900">
//                       <td className="px-4 py-3">Total</td>
//                       <td className="px-4 py-3 text-right" colSpan={2}>
//                         90000
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Cards */}
//             <div className="sm:hidden flex flex-col gap-4">
//               {loading
//                 ? Array(3)
//                     .fill(0)
//                     .map((_, idx) => (
//                       <div
//                         key={idx}
//                         className="border border-gray-200 rounded-lg p-4 animate-pulse bg-gray-50"
//                       >
//                         <div className="h-5 w-24 bg-gray-300 mb-2 rounded"></div>
//                         <div className="h-5 w-12 bg-gray-300 mb-2 rounded ml-auto"></div>
//                         <div className="h-8 w-full bg-gray-300 rounded"></div>
//                       </div>
//                     ))
//                 : order.items.map((item) => (
//                     <div
//                     key={${order._id}-${item.id}}
//                       className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2"
//                     >
//                       <div className="flex justify-between text-gray-700 font-medium">
//                         <span>{item.name} × 1</span>
//                         <span><Price amount={item.price} /> &times; {item.quantity}</span>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                        
//                       >
//                         View & Rate Product
//                       </Button>
//                     </div>
//                   ))}
//               {!loading && (
//                 <div className="mt-2 font-bold text-gray-900 text-right">
//                   Total: <Price amount={order.totalAmount} />
//                 </div>
//               )}
//             </div>

//             <div className="mt-6 flex justify-center sm:justify-end">
//               <Link href="/orders">
//                 <Button className="flex gap-2 items-center bg-yellow-500 hover:bg-yellow-600 text-white w-full sm:w-auto justify-center">
//                   <ShoppingBag className="w-4 h-4" />
//                   View All Orders
//                 </Button>
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

      
      
//     </div>
//   )
// }
// ChatGPT said:
// Here’s how to fix and polish your PreviousOrderCard component:

// ✅ Fix loading state logic:
// Currently, your loading state is always true, which means it never shows the actual order data. If you’re using PreviousOrderCard after the order is fetched and passed in as props, you should set loading to false immediately (since it’s already loaded).

// ✅ Fix <tr> wrapping:
// Inside <tbody>, you’re wrapping <tr> elements with <div> elements (which isn’t valid HTML). Remove these <div>s and directly return the <tr>.

// ✅ Fix duplicate “View & Rate” button text:
// You have both a Link and a “View & Rate Product” label inside the same button. This can be cleaned up.

// ✅ Fix total calculation:
// Instead of hardcoding 90000, calculate the total dynamically from the order’s items.

// Here’s the cleaned-up PreviousOrderCard:

// 'use client'

// import { useState, useEffect } from 'react'
// import { Card, CardContent } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
// import { Button } from '@/components/ui/button'
// import Price from '@/lib/utils/format'

// import { typeOrder } from '@/lib/types/order'
// import { format } from 'date-fns'
// import { ShoppingBag, CheckCircle } from 'lucide-react'
// import { motion } from 'framer-motion'
// import Link from 'next/link'

// interface OrderCardProps {
//   order: typeOrder
// }

// export default function PreviousOrderCard({ order }: OrderCardProps) {
//   const orderDate = format(new Date(order.createdAt), 'MMM d, yyyy')
//   const [loading, setLoading] = useState(true)

//   // Fake loading delay
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000)
//     return () => clearTimeout(timer)
//   }, [])

//   // Calculate total
//   const totalAmount = order.items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   )

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-white p-4 sm:p-6">
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="text-center w-full max-w-5xl"
//       >
//         <div className="flex justify-center mb-4">
//           <CheckCircle className="h-16 w-16 text-yellow-500 animate-pulse" />
//         </div>
//         <h1 className="text-3xl sm:text-5xl font-extrabold text-yellow-600 mb-2">
//           Thank You <span className="text-gray-800">For Purchasing</span>
//         </h1>

//         <Card className="mt-6 w-full bg-white relative shadow-lg border border-transparent bg-clip-padding before:absolute before:inset-0 before:rounded-xl before:border-[2px] before:border-yellow-200">
//           <CardContent className="relative z-10 p-4 sm:p-6">
//             <p className="text-lg font-medium text-gray-800 mb-4">
//               Thank you. Your order has been received.
//             </p>

//             <div className="grid grid-cols-2 sm:grid-cols-4 text-sm text-gray-700 gap-4 mb-6">
//               <div>
//                 <div className="font-medium text-black">Order Number:</div>
//                 {loading ? (
//                   <Skeleton className="h-5 w-20 mt-1" />
//                 ) : (
//                   <div>{order.orderNumber}</div>
//                 )}
//               </div>
//               <div>
//                 <div className="font-medium text-black">Date Placed</div>
//                 <div>{orderDate}</div>
//               </div>
//               <div>
//                 <div className="font-medium text-black">TOTAL:</div>
//                 <div>
//                   <Price amount={order.totalAmount} />
//                 </div>
//               </div>
//               <div>
//                 <div className="font-medium text-black">PAYMENT METHOD:</div>
//                 <div>{order.paymentMethod}</div>
//               </div>
//             </div>

//             {/* Responsive Table for desktop */}
//             <div className="hidden sm:block border border-gray-200 rounded-lg overflow-hidden">
//               <table className="w-full text-sm text-left text-gray-600">
//                 <thead className="bg-yellow-100 text-yellow-800 uppercase text-xs">
//                   <tr>
//                     <th className="px-4 py-3">Product</th>
//                     <th className="px-4 py-3 text-right">Total</th>
//                     <th className="px-4 py-3 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading
//                     ? Array(3)
//                         .fill(0)
//                         .map((_, idx) => (
//                           <tr key={idx} className="border-t">
//                             <td className="px-4 py-3">
//                               <Skeleton className="h-5 w-24" />
//                             </td>
//                             <td className="px-4 py-3 text-right">
//                               <Skeleton className="h-5 w-12 mx-auto" />
//                             </td>
//                             <td className="px-4 py-3 text-right">
//                               <Skeleton className="h-6 w-20 mx-auto" />
//                             </td>
//                           </tr>
//                         ))
//                     : order.items.map((item) => (
//                         <tr key={`${order._id}-${item.id}`} className="border-t">
//                           <td className="px-4 py-3 font-medium text-black">
//                             {item.name}
//                           </td>
//                           <td className="px-4 py-3 font-medium text-black text-right">
//                             <Price amount={item.price} /> &times; {item.quantity}
//                           </td>
//                           <td className="px-4 py-3 font-medium text-black text-right">
//                             <Link href={`/product/${item.id}`}>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
//                               >
//                                 View & Rate
//                               </Button>
//                             </Link>
//                           </td>
//                         </tr>
//                       ))}
//                   {!loading && (
//                     <tr className="border-t font-bold text-gray-900">
//                       <td className="px-4 py-3">Total</td>
//                       <td className="px-4 py-3 text-right" colSpan={2}>
//                         <Price amount={totalAmount} />
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Cards */}
//             <div className="sm:hidden flex flex-col gap-4">
//               {loading
//                 ? Array(3)
//                     .fill(0)
//                     .map((_, idx) => (
//                       <div
//                         key={idx}
//                         className="border border-gray-200 rounded-lg p-4 animate-pulse bg-gray-50"
//                       >
//                         <div className="h-5 w-24 bg-gray-300 mb-2 rounded"></div>
//                         <div className="h-5 w-12 bg-gray-300 mb-2 rounded ml-auto"></div>
//                         <div className="h-8 w-full bg-gray-300 rounded"></div>
//                       </div>
//                     ))
//                 : order.items.map((item) => (
//                     <div
//                       key={`${order._id}-${item.id}`}
//                       className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2"
//                     >
//                       <div className="flex justify-between text-gray-700 font-medium">
//                         <span>
//                           {item.name} × {item.quantity}
//                         </span>
//                         <span>
//                           <Price amount={item.price} />
//                         </span>
//                       </div>
//                       <Link href={`/product/${item.id}`}>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
//                         >
//                           View & Rate Product
//                         </Button>
//                       </Link>
//                     </div>
//                   ))}
//               {!loading && (
//                 <div className="mt-2 font-bold text-gray-900 text-right">
//                   Total: <Price amount={totalAmount} />
//                 </div>
//               )}
//             </div>

//             <div className="mt-6 flex justify-center sm:justify-end">
//               <Link href="/orders">
//                 <Button className="flex gap-2 items-center bg-yellow-500 hover:bg-yellow-600 text-white w-full sm:w-auto justify-center">
//                   <ShoppingBag className="w-4 h-4" />
//                   View All Orders
//                 </Button>
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   )
// }
// Would you like me to integrate this with your actual order data fetching and display logic (/orders page, etc.)? Let me know!

// You said:
// modify the ui of this page using yellow color pellet: 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
// import { useFavoriteStore } from '@/stores/favorite'
// import Price from '@/lib/utils/format'
// import { Separator } from '@/components/ui/separator'

// interface Product {
//   id: string
//   name: string
//   originalPrice: number
//   imageUrls: string[]
//   description: string
// }

// export default function ProductDetail({ product }: { product: Product }) {
//   const [currentImage, setCurrentImage] = useState(0)

//   const addFavorite = useFavoriteStore((state) => state.addFavorite)
//   const removeFavorite = useFavoriteStore((state) => state.removeFavorite)
//   const isFav = useFavoriteStore((state) =>
//     state.favorites.includes(product.id)
//   )

//   const toggleFavorite = () => {
//     if (isFav) removeFavorite(product.id)
//     else addFavorite(product.id)
//   }

//   return (
//     <>
//       <div>
//         <h2 className='text-2xl md:text-3xl font-bold mb-1.5'>
//           View Product Details
//         </h2>
//         <Separator />
//       </div>
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-10'>
//         {/* Image Section */}
//         <div className='space-y-4 w-full'>
//           <div className=' block md:flex '>
//             {/* Thumbnails */}
//             <div className='flex-col gap-2  pb-2  w-1/3'>
//               {product.imageUrls.map((src, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentImage(idx)}
//                   className={border-2  p-1.5 ${
//                     idx === currentImage
//                       ? 'border-blue-500'
//                       : 'border-transparent hover:border-gray-300'
//                   }}
//                 >
//                   <div
//                     className='relative w-[40px]
// h-[40px] md:w-[80px] md:h-[80px]'
//                   >
//                     <Image
//                       src={src}
//                       alt={Thumbnail ${idx}}
//                       fill
//                       className='object-contain'
//                     />
//                   </div>
//                 </button>
//               ))}
//             </div>
//             {/* Main Image */}
//             <Card className='relative flex-1 h-[300px] '>
//               <Image
//                 src={product.imageUrls[currentImage]}
//                 alt={product.name}
//                 fill
//                 priority
//                 //sizes='(max-width:768px) 100vw, 700px'
//                 className='object-contain p-2'
//               />
//             </Card>
//           </div>
//         </div>
//         {/* product details */}
//         <Card className='border-2 h-fit p'>
//           <CardHeader className='py-3.5'>
//             <div className='items-center justify-between flex'>
//               <h2 className=' text-xl font-bold md:text-2xl text-yellow-600'>
//                 {product.name}
//               </h2>
//               <Button
//                 className='w-full sm:w-auto'
//                 variant={isFav ? 'destructive' : 'outline'}
//                 onClick={toggleFavorite}
//               >
//                 {isFav ? '★ In Favorites' : '☆ Add to Favorites'}
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className='px-6 '>
//             <h3 className=' text-xl font-medium mb-3 text-yellow-600'>
//               Product Features
//             </h3>
//             <p className='text-lg font-semibold'>{product.description}</p>
//             <div className='text-xl font-medium pt-10'>
//               <Button variant={'destructive'} className='mr-5 '>
//                 price :
//               </Button>

//               <Price amount={product.originalPrice} />
//             </div>
//           </CardContent>

//           <CardFooter className=' flex items-center justify-between py-5 '>
//             <Button variant={'default'} className='w-full sm:w-auto '>
//               Add to Cart
//             </Button>
//             <Button
//               variant={'link'}
//               className='w-full sm:w-auto text-blue-800  font-medium'
//             >
//               Shop Now
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   )
// }
// ChatGPT said:
// Got it! Let’s refine your ProductDetail component’s UI with a yellow color palette for a more cohesive and lively look. Here’s the modified version of your code:

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
// import { useFavoriteStore } from '@/stores/favorite'
// import Price from '@/lib/utils/format'
// import { Separator } from '@/components/ui/separator'

// interface Product {
//   id: string
//   name: string
//   originalPrice: number
//   imageUrls: string[]
//   description: string
// }

// export default function ProductDetail({ product }: { product: Product }) {
//   const [currentImage, setCurrentImage] = useState(0)

//   const addFavorite = useFavoriteStore((state) => state.addFavorite)
//   const removeFavorite = useFavoriteStore((state) => state.removeFavorite)
//   const isFav = useFavoriteStore((state) =>
//     state.favorites.includes(product.id)
//   )

//   const toggleFavorite = () => {
//     if (isFav) removeFavorite(product.id)
//     else addFavorite(product.id)
//   }

//   return (
//     <>
//       <div>
//         <h2 className="text-2xl md:text-3xl font-bold mb-1.5 text-yellow-700">
//           View Product Details
//         </h2>
//         <Separator className="bg-yellow-400" />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-10">
//         {/* Image Section */}
//         <div className="space-y-4 w-full">
//           <div className="block md:flex">
//             {/* Thumbnails */}
//             <div className="flex-col gap-2 pb-2 w-1/3">
//               {product.imageUrls.map((src, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentImage(idx)}
//                   className={`border-2 p-1.5 rounded ${
//                     idx === currentImage
//                       ? 'border-yellow-500 ring-2 ring-yellow-300'
//                       : 'border-transparent hover:border-yellow-300'
//                   }`}
//                 >
//                   <div className="relative w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded">
//                     <Image
//                       src={src}
//                       alt={`Thumbnail ${idx}`}
//                       fill
//                       className="object-contain rounded"
//                     />
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {/* Main Image */}
//             <Card className="relative flex-1 h-[300px] border-yellow-200 shadow-yellow-200/40 shadow">
//               <Image
//                 src={product.imageUrls[currentImage]}
//                 alt={product.name}
//                 fill
//                 priority
//                 className="object-contain p-2 rounded"
//               />
//             </Card>
//           </div>
//         </div>

//         {/* Product Details */}
//         <Card className="border-2 border-yellow-200 shadow shadow-yellow-200/40">
//           <CardHeader className="py-3.5 bg-yellow-50 rounded-t">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold md:text-2xl text-yellow-700">
//                 {product.name}
//               </h2>
//               <Button
//                 className={`w-full sm:w-auto border-yellow-400 text-yellow-600 hover:bg-yellow-100 ${
//                   isFav ? 'bg-yellow-500 text-white' : 'bg-white'
//                 }`}
//                 variant="outline"
//                 onClick={toggleFavorite}
//               >
//                 {isFav ? '★ In Favorites' : '☆ Add to Favorites'}
//               </Button>
//             </div>
//           </CardHeader>

//           <CardContent className="px-6 py-4">
//             <h3 className="text-xl font-semibold mb-3 text-yellow-700">
//               Product Features
//             </h3>
//             <p className="text-lg text-gray-800">{product.description}</p>
//             <div className="flex items-center gap-3 text-xl font-medium pt-6">
//               <span className="text-yellow-700 font-bold">Price:</span>
//               <Price amount={product.originalPrice} />
//             </div>
//           </CardContent>

//           <CardFooter className="flex flex-col sm:flex-row gap-3 items-center justify-between py-4 px-6 bg-yellow-50 rounded-b">
//             <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
//               Add to Cart
//             </Button>
//             <Button
//               variant="link"
//               className="w-full sm:w-auto text-yellow-700 font-medium hover:underline"
//             >
//               Shop Now
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   )
// }
// ✅ Key UI Changes:
// Added yellow accents to headings, buttons, separators, borders, and shadows.

// Highlighted active thumbnails with yellow border and subtle ring glow.

// Updated buttons to reflect a yellow theme (like hover states & active favorites).

// Adjusted Separator to yellow for section separation.

// This should make your product detail page feel lively and on-brand with a yellow theme! Let me know if you want to add more animations or hover effects! 🌟

// You said:
// generate this page using shadcn and next js
// ChatGPT said:
// Got it! Let’s rebuild this UI using ShadCN UI and Next.js. I’ll create a modular structure that mirrors the layout and visual style of the uploaded images.

// Here’s a full implementation of this Order Details page:

// 'use client'

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardFooter,
// } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Separator } from '@/components/ui/separator'
// import { Badge } from '@/components/ui/badge'
// import { Avatar, AvatarFallback } from '@/components/ui/avatar'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Checkbox } from '@/components/ui/checkbox'
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Label } from '@/components/ui/label'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// export default function OrderDetailsPage() {
//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">
//       {/* Left Panel */}
//       <div className="flex-1 space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold">Order #94</h2>
//           <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
//         </div>
//         <Separator />

//         {/* Customer Info */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Avatar className="bg-purple-100 text-purple-600">
//                 <AvatarFallback>BF</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h4 className="font-semibold">Bagus Fikri</h4>
//                 <p className="text-sm text-muted-foreground">Individual</p>
//               </div>
//             </div>
//             <Button variant="ghost" size="sm">
//               Change Customer
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground mb-2">Rent Progress</p>
//             <div className="bg-yellow-100 h-2 rounded-full mb-2">
//               <div className="bg-yellow-500 h-2 rounded-full w-2/3"></div>
//             </div>
//             <p className="text-xs text-muted-foreground">Picked up: 30 Oct, 9:00am</p>
//             <Separator className="my-4" />
//             <p className="text-sm">
//               <span className="font-medium">Rent Location:</span> 4539 Conowingo Rd, Darlington, MD, 21034
//             </p>
//           </CardContent>
//         </Card>

//         {/* Product Rent */}
//         <Card>
//           <CardHeader>
//             <h4 className="font-semibold text-lg">Product Rent (2)</h4>
//           </CardHeader>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Item Details</TableHead>
//                   <TableHead className="text-right">Quantity</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow>
//                   <TableCell>
//                     <p>DJI Mavic 3</p>
//                     <p className="text-xs text-muted-foreground">SKU: NKN-SLVR-01</p>
//                     <Badge variant="secondary">Hasn't picked up</Badge>
//                   </TableCell>
//                   <TableCell className="text-right">1x</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <p>Go Pro Hero 5</p>
//                     <p className="text-xs text-muted-foreground">SKU: KSW-9IOA-A2</p>
//                     <Badge variant="secondary">Hasn't picked up</Badge>
//                   </TableCell>
//                   <TableCell className="text-right">1x</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </CardContent>
//           <CardFooter className="flex flex-col items-end gap-1">
//             <div className="flex items-center gap-2">
//               <p>Subtotal:</p>
//               <p>$750.00</p>
//             </div>
//             <div className="flex items-center gap-2 text-green-600 font-semibold">
//               <p>Discount:</p>
//               <p>-$150.00 (20%)</p>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>

//       {/* Right Panel */}
//       <div className="w-full md:w-1/3 space-y-4">
//         <Card>
//           <CardHeader>
//             <h4 className="font-semibold text-lg">Payments</h4>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between mb-2">
//               <p>Status:</p>
//               <Badge variant="outline" className="text-yellow-700 border-yellow-500 bg-yellow-100">Partially paid</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <p>Invoice:</p>
//               <p className="font-medium">INV-084</p>
//             </div>
//             <Separator className="my-2" />
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between">
//                 <p>Paid:</p>
//                 <p>$200.00</p>
//               </div>
//               <div className="flex justify-between font-semibold">
//                 <p>Outstanding:</p>
//                 <p>$400.00</p>
//               </div>
//             </div>
//             <Separator className="my-2" />
//             <Button variant="default" className="w-full bg-green-500 hover:bg-green-600 text-white">
//               Record Payment
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Actions */}
//         <div className="flex flex-col gap-2">
//           <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
//             Export
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">
//                 Confirm Return
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem>Complete Return</DropdownMenuItem>
//               <DropdownMenuItem>Partial Return</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </div>
//   )
// }
// 🟡 Key Features:
// ✅ Customer Info with progress bar and address
// ✅ Product Rent table (item details, quantities, discount)
// ✅ Payments panel (status, invoice, amounts)
// ✅ Action buttons (export, confirm return with dropdown)
// ✅ ShadCN UI components for clean styling and reusability

// Would you like me to also:

// Add dynamic data (via API)?

// Add mobile responsiveness tweaks?

// Customize color themes (like yellow accents in ShadCN config)?

// Let me know!

// You said:
// generate this page using shadcn and next js
// ChatGPT said:
// Let’s recreate this Orders Dashboard UI in Next.js using ShadCN UI components.

// Here’s a full implementation of the Orders Page:
// 'use client'

// import {
//   Button,
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   Badge,
//   Avatar,
//   AvatarFallback,
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   Separator,
//   Input,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui'

// export default function OrdersPage() {
//   const orders = [
//     { id: '#1002', date: '11 Feb, 2024', customer: 'Wade Warren', payment: 'Pending', total: '$20.00', delivery: 'N/A', items: 2, fulfillment: 'Unfulfilled' },
//     { id: '#1004', date: '13 Feb, 2024', customer: 'Esther Howard', payment: 'Success', total: '$22.00', delivery: 'N/A', items: 3, fulfillment: 'Fulfilled' },
//     { id: '#1007', date: '15 Feb, 2024', customer: 'Jenny Wilson', payment: 'Pending', total: '$25.00', delivery: 'N/A', items: 1, fulfillment: 'Unfulfilled' },
//     { id: '#1009', date: '17 Feb, 2024', customer: 'Guy Hawkins', payment: 'Success', total: '$27.00', delivery: 'N/A', items: 5, fulfillment: 'Fulfilled' },
//     { id: '#1011', date: '19 Feb, 2024', customer: 'Jacob Jones', payment: 'Pending', total: '$32.00', delivery: 'N/A', items: 4, fulfillment: 'Unfulfilled' },
//   ]

//   return (
//     <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Orders</h1>
//         <div className="flex items-center gap-2">
//           <Button variant="outline">Export</Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">More actions</Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem>Import orders</DropdownMenuItem>
//               <DropdownMenuItem>Archive</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">
//             Create order
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Orders</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col">
//             <span className="text-2xl font-bold">21</span>
//             <span className="text-xs text-muted-foreground">+25.2% last week</span>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Items Over Time</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col">
//             <span className="text-2xl font-bold">15</span>
//             <span className="text-xs text-muted-foreground">+18.2% last week</span>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Return Orders</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col">
//             <span className="text-2xl font-bold">0</span>
//             <span className="text-xs text-muted-foreground">-1.2% last week</span>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Fulfilled Orders</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col">
//             <span className="text-2xl font-bold">12</span>
//             <span className="text-xs text-muted-foreground">+12.2% last week</span>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search and Filters */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//         <Input placeholder="Search or type command..." className="w-full md:w-1/3" />
//         <div className="flex gap-2">
//           <Button variant="ghost" size="sm">All</Button>
//           <Button variant="ghost" size="sm">Unfulfilled</Button>
//           <Button variant="ghost" size="sm">Unpaid</Button>
//           <Button variant="ghost" size="sm">Open</Button>
//           <Button variant="ghost" size="sm">Closed</Button>
//         </div>
//       </div>

//       <Separator />

//       {/* Orders Table */}
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Customer</TableHead>
//               <TableHead>Payment</TableHead>
//               <TableHead>Total</TableHead>
//               <TableHead>Delivery</TableHead>
//               <TableHead>Items</TableHead>
//               <TableHead>Fulfillment</TableHead>
//               <TableHead>Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders.map(order => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.customer}</TableCell>
//                 <TableCell>
//                   <Badge variant={order.payment === 'Success' ? 'success' : 'destructive'}>
//                     {order.payment}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>{order.total}</TableCell>
//                 <TableCell>{order.delivery}</TableCell>
//                 <TableCell>{order.items} items</TableCell>
//                 <TableCell>
//                   <Badge variant={order.fulfillment === 'Fulfilled' ? 'success' : 'destructive'}>
//                     {order.fulfillment}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="flex gap-2">
//                   <Button variant="outline" size="icon">✏️</Button>
//                   <Button variant="outline" size="icon">🗑️</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }
// 🔥 Key Features:
// ✅ Responsive header with buttons
// ✅ Stats cards for quick insights
// ✅ Search input and filter buttons
// ✅ Orders table with dynamic data mapping
// ✅ ShadCN UI styling

// 🚀 Next Steps?
// Would you like me to add API fetching for dynamic data?

// Or integrate pagination for the orders table?

// Let me know how you’d like to proceed!

// You said:
// hello
// ChatGPT said:
// Hey there! 👋 How can I help you today?

// You said:
// 'use server'

// import connectToDatabase from '@/lib/db/dbConnection'
// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { z } from 'zod'
// import Product from '../db/models/product.model'
// import Category from '../db/models/category.model'

// // Zod schema
// const FormSchema = z.object({
//   name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
//   description: z.string().min(10, { message: 'Must be 10 or more characters long' }),
//   imageUrls: z.array(z.string().url()).min(1, { message: 'At least one image is required' }),
//   brand: z.string(),
//   category: z.enum([
//     'laptops',
//     'printers',
//     'monitors',
//     'accessories',
//     'pc',
//     'softwares',
//     'phones',
    
//   ]),
//   originalPrice: z.number(),
//   stock: z.number(),
//   serial: z.string(),
// })

// export async function productCreate(formData: FormData) {
//   const parsed = FormSchema.parse({
//     name: formData.get('name'),
//     imageUrls: formData.getAll('imageUrls[]').filter(Boolean) as string[],
//     description: formData.get('description'),
//     brand: formData.get('brand'),
//     category: formData.get('category'),
//     originalPrice: Number(formData.get('originalPrice')), // ✅ match schema
//     stock: Number(formData.get('stock')),
//     serial: formData.get('serial'),
//   })

//   const {
//     name,
//     imageUrls,
//     description,
//     brand,
//     category,
//     originalPrice,
//     stock,
//     serial,
//   } = parsed

//   try {
//     await connectToDatabase // ✅ fixed call

//     // Ensure category exists
//     let categoryDoc = await Category.findOne({ name: category })

//     if (!categoryDoc) {
//       categoryDoc = new Category({
//         name: category,
//         imageUrl: imageUrls[0],
//         slug: category.toLowerCase().replace(/\s+/g, '-'),
//       })
//       await categoryDoc.save()
//     } else if (!categoryDoc.imageUrl) {
//       categoryDoc.imageUrl = imageUrls[0]
//       await categoryDoc.save()
//     }
    

//     if (!categoryDoc || !categoryDoc._id) {
//       throw new Error(Category creation failed)
//     }

//     // Create and save product
//     const newProduct = new Product({
//       name,
//       imageUrls,
//       description,
//       brand,
//       category: categoryDoc._id,
//       originalPrice,
//       stock,
//       serial,
//     })

//     await newProduct.save()
//   } catch (error) {
//     console.error('❌ Error creating product:', error)
//     throw error
//   }

//   // Cache revalidation & redirect
//   revalidatePath('/admin/dashboard/products')
//   redirect('/admin/dashboard/products')
// }


// // import connectToDatabase from '@/lib/db/dbConnection'
// // import { revalidatePath } from 'next/cache'
// // import { redirect } from 'next/navigation'
// // import { z } from 'zod'
// // import Product from '../db/models/product.model'
// // import Category from '../db/models/category.model'

// // const FormSchema = z.object({
// //   name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
// //   description: z
// //     .string()
// //     .min(10, { message: 'Must be 10 or more characters long' }),
// //   imageUrl: z
// //     .array(z.string().url())
// //     .min(1, { message: 'At least one image is required' }),
// //   // imageUrl: z.array(z.string()).min(1, 'Product must have at least one image'),
// //   // tags: z.enum([
// //   //   'Best Selling',
// //   //   'Recently added',
// //   //   'Flashsale',
// //   //   'High discounts',
// //   // ]),
// //   brand: z.string(),
// //   category: z.enum([
// //     'laptops',
// //     'printers',
// //     'monitors',
// //     'accessories',
// //     'pc',
// //     'softwares',
// //   ]),
// //   // category: z.string(),
// //   price: z.number(),
// //   stock: z.number(),
// // })

// // const CreateProduct = FormSchema
// // const UpdateProduct = FormSchema

// // //*****************create**********************

// // export async function productCreate(formData: FormData) {
// //   console.log('imageUrl:', formData.get('imageUrl'))
// //   const { name, imageUrl, description, brand, category, price, stock } =
// //     CreateProduct.parse({
// //       name: formData.get('name'),
// //       imageUrl: formData.getAll('imageUrls[]').filter(Boolean) as string[],
// //       description: formData.get('description'),
// //       brand: formData.get('brand'),
// //       category: formData.get('category'),
// //       price: Number(formData.get('price')), // ✅ convert to number
// //       stock: Number(formData.get('stock')), // ✅ convert to number
// //     })

// //   if (
// //     !name ||
// //     !imageUrl ||
// //     !brand ||
// //     !description ||
// //     !category ||
// //     !price ||
// //     !stock
// //   ) {
// //     throw new Error('Missing fields')
// //   }

// //   try {
// //     await connectToDatabase // ✅ CALL it properly

// //     // 🔥 Find or create the category safely
// //     let categoryDoc = await Category.findOne({ name: category })

// //     if (!categoryDoc) {
// //       categoryDoc = new Category({
// //         name: category,
// //         description: ${category} category,
// //         slug: category.toLowerCase().replace(/\s+/g, '-'),
// //       })

// //       await categoryDoc.save() // ✅ Save it properly
// //     }

// //     if (!categoryDoc || !categoryDoc._id) {
// //       throw new Error(Category document creation failed.)
// //     }

// //     // Create the new product
// //     const newProduct = new Product({
// //       name,
// //       imageUrl,
// //       description,
// //       brand,
// //       category: categoryDoc._id, // ✅ Use ObjectId
// //       price,
// //       stock,
// //     })

// //     await newProduct.save()
// //   } catch (error) {
// //     console.error('Error creating product:', error)
// //     throw error // rethrow so Next.js shows an error
// //   }

// //   revalidatePath('/admin/dashboard/products')
// //   redirect('/admin/dashboard/products')
// // }

// //*****************update**********************


// export async function UpdateProductData(id: string, formData: FormData) {
//   const { name, imageUrl, description, brand, category, originalPrice, stock } =
//     UpdateProduct.parse({
//       name: formData.get('name'),
//       imageUrl: formData.get('imageUrl'),
//       description: formData.get('description'),
//       brand: formData.get('brand'),
//       category: formData.get('category'),
//       originalPrice: Number(formData.get('originalPrice')), // ✅ convert to number
//       stock: Number(formData.get('stock')), // ✅ convert to number
//     })
//   try {
//     await connectToDatabase

//     // Update product
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         imageUrl,
//         description,
//         brand,
//         category,
//         originalPrice,
//         stock,
//       },
//       {
//         new: true,
//       }
//     )

//     await updatedProduct.save()
//   } catch (error) {
//     console.error('Error updating product:', error)
//   }

//   revalidatePath('/products')
//   redirect('/products')
// }

// //*****************delete**********************
// export async function deleteProduct(id: string) {
//   try {
//     await connectToDatabase

//     await Product.findByIdAndDelete(id)
//   } catch (error) {
//     console.error('Error removing product:', error)
//   }

//   revalidatePath('/products')
//   // Since this action is being called in the '/customers' path, you don't need to call redirect.
//   // Calling revalidatePath will trigger a new server request and re-render the table.
//   // redirect('/customers')
// }
// ChatGPT said:
// You said:
// hello
// ChatGPT said:
// Hello! 👋
// How can I help you today? Are you working on something specific in your Next.js app?




// No file chosenNo file chosen
// ChatGPT can make mistakes. Check important info.
