// app/products/[id]/ProductFormWrapper.tsx (client component)
"use client"

import { toast } from "sonner"
import { UpdateProductData } from "@/lib/actions/products.actions"
import ProductsForm from "@/components/forms/products"
import { ProductType } from "@/lib/types/product"

export default function ProductFormWrapper({
  id,
  product,
}: {
  id: string
  product: ProductType
}) {
  async function handleSubmit(formData: FormData) {
    try {
      await UpdateProductData(id, formData) // throws on error
      toast.success("Product updated successfully!")
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Failed to update product")
      }
    }
  }

  return (
    <form action={handleSubmit}>
      <ProductsForm product={product} />
    </form>
  )
}
