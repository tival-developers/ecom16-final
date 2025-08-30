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

export const FormSchemaCategory = z.object({
  name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  slug: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  variationsRaw: z
    .array(z.string().min(1, "Variation name cannot be empty"))
    .default([]), // Default to an empty array
  //variationsRaw: z.string().min(1, 'minimum of 1 variation required'),
  image: z.string(),
})

export const optionSchema = z.object({
  value: z.string().min(1),
  priceDelta: z.number().finite(), // can be 0 or negative or positive
  sku: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  isDefault: z.boolean().optional(),
})

export const variationSchema = z.object({
  name: z.string().min(1),
  required: z.boolean().default(true),
  options: z.array(optionSchema).min(1, 'Provide at least one option'),
})

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  // images: z.array(z.string().url("Image must be a valid URL")).min(1, "At least one image is required"),
  categoryId: z.string().optional(),
  variations: z.array(variationSchema).optional().default([]),
})
