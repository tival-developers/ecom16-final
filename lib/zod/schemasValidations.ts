import { z } from 'zod'

// Zod schema for product creation
export const FormSchemaProduct = z.object({
  name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  description: z
    .string()
    .min(10, { message: 'Must be 10 or more characters long' }),
  originalPrice: z.coerce.number(),
  stock: z.coerce.number(),
  brand: z.string(),
  serialNumber: z.string(),
  categoryId: z.string(),
  variations: z.string(),
  imageUrls: z
    .array(z.string().url())
    .min(1, { message: 'At least one image is required' }),
})
// Zod schema for category creation
export const FormSchemaCategory = z.object({
  name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  slug: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  variationsRaw: z
    .array(z.string().min(1, 'Variation name cannot be empty'))
    .default([]), // Default to an empty array
  //variationsRaw: z.string().min(1, 'minimum of 1 variation required'),
  image: z.string(),
})

///////////blog///////////
// ----------------tags:z.array(z.string()).min(1, "At least one tag is required"),
// Zod Validation
// ----------------
export const BlogSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters long' }),
  content: z
    .string({ required_error: 'Content is required' })
    .min(10, { message: 'Content must be at least 10 characters long' }),
  imageurl: z.string().url('Invalid image URL').optional(),

  author: z.string().min(1, 'Author is required'),
})

export const BlogUpdateSchema = BlogSchema.partial().extend({
  id: z.string().min(1, 'Blog ID is required'),
})
/////banners///
export const BannerSchemaZ = z.object({
  productId: z.string().min(1, 'Product is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subtitle: z.string().min(3, 'Subtitle must be at least 3 characters'),
  buttonText: z.string().min(1, 'Button text is required'),
  imageUrl: z.string().url('Must be a valid image URL'),
  price: z.preprocess(
    (v) => Number(v),
    z.number().min(0, 'Price must be >= 0')
  ),
  bannerType: z.enum(['hero', 'promoMini', 'promoLarge']),
})

export const BannerUpdateSchemaZ = BannerSchemaZ.partial().extend({
  id: z.string().min(1, 'Banner ID is required'),
})
