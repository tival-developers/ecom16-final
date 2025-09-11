// app/products/categories/[id]/CategoryFormWrapper.tsx (client component)
"use client"

import { toast } from "sonner"
import { updateCategory } from "@/lib/actions/category"
import CategoryForm from "@/components/forms/categories"
import { CategoryType } from "@/lib/types/categories"

export default function CategoryFormWrapper({
  id,
  category,
}: {
  id: string
  category: CategoryType
}) {
  async function handleSubmit(formData: FormData) {
    try {
      await updateCategory(id, formData) // throws on error
      toast.success("Category updated successfully!")
    } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message)
        } else {
          toast.error("Failed to update category")
        }
      }
  }

  return (
    <form action={handleSubmit}>
      <CategoryForm category={category} />
    </form>
  )
}
