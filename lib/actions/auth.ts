'use server'
import { redirect } from "next/navigation"
import { signIn, signOut,} from "@/auth"
import { AuthError } from "next-auth"

const SIGNIN_ERROR_URL = "/error"


export async function signOutAction() {
    await signOut({ redirectTo: '/' }) // ✅ Correct
}


export async function signInAction(provider: string, callbackUrl?: string) {
    try {
      await signIn(provider, {
        redirectTo: callbackUrl ?? '/', // ✅ Corrected property name
      })
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
      }
  
      console.error('Error signing in:', error) // ✅ Moved before throw
      throw error
    }
  }
  