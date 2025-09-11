"use server"

import { z } from "zod"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})
export type FormState = {
    success: boolean | null
    error?: string
  }
export async function createAdmin(prevState: FormState, formData: FormData) {
  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
  }

  const parsed = schema.safeParse(values)

  if (!parsed.success) {
    // return errors in a serializable shape
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  // ✅ do your DB save here
  return { success: true, errors: {} }
}
