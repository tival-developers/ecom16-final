import connectToDatabase from '@/lib/db/dbConnection'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Tiktok from 'next-auth/providers/tiktok'
import Instagram from 'next-auth/providers/instagram'
import type { Provider } from 'next-auth/providers'
import NextAuth from 'next-auth'
import bcrypt from 'bcryptjs'
import { signInSchema } from './lib/db/essentials/zod'
import { ZodError } from 'zod'
import User from './lib/db/models/user.model'

// ✅ Hardcoded superadmin
const SUPERADMIN_EMAIL = process.env.ADMIN_EMAIL
const SUPERADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// ----- PROVIDERS -----
const providers: Provider[] = [
  // ----- CREDENTIALS -----
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'email', name: 'email' },
      password: { label: 'Password', type: 'password', name: 'password' },
    },

    authorize: async (credentials) => {
      try {
        const { email, password } = await signInSchema.parseAsync(credentials)

        // ✅ Check for superadmin
        if (email === SUPERADMIN_EMAIL && password === SUPERADMIN_PASSWORD) {
          await connectToDatabase

          // Check if superadmin already exists
          let superadmin = await User.findOne({ email: SUPERADMIN_EMAIL })

          if (!superadmin) {
            const hashedPassword = await bcrypt.hash(SUPERADMIN_PASSWORD, 10)
            superadmin = await User.create({
              name: 'Super Admin',
              email: SUPERADMIN_EMAIL,
              password: hashedPassword,
              provider: 'credentials',
              role: 'superadmin',
            })
            console.log('🆕 Superadmin created')
          }

          return {
            id: superadmin._id.toString(),
            name: superadmin.name,
            email: superadmin.email,
            role: superadmin.role,
            image: superadmin.image || null,
          }
        }

        // ✅ Normal login flow
        await connectToDatabase

        const user = await User.findOne({ email })
        if (!user) {
          throw new Error('No user found. Please register first.')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
          throw new Error('Invalid credentials.')
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image || null,
        }
      } catch (error) {
        if (error instanceof ZodError) return null
        console.error('Authorize Error:', error)
        return null
      }
    },
  }),

  // ----- OAUTH -----
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  Tiktok({
    clientId: process.env.TIKTOK_CLIENT_ID!,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
  }),
  Instagram({
    clientId: process.env.INSTAGRAM_CLIENT_ID!,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
  }),
]

// ----- PROVIDER MAP -----
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== 'credentials')

// ----- NEXTAUTH CONFIG -----
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: '/login',
    signOut: '/sign-out',
  },
  session: {
    strategy: 'jwt',

    maxAge: 60 * 60 * 24 * 1,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 1,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
        token.exp = Math.floor(Date.now() / 1000) + 60 * 3 // ⏳ example 3 min
      }

      //  If expired, clear token
      if (token.exp && Date.now() >= token.exp * 1000) {
        return {}
      }

      return token
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.role = token.role
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.image as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },

  events: {
    async signIn({ user, account }) {
      await connectToDatabase
      console.log('EVENT SIGNIN FIRED', { user, account })

      let existingUser = await User.findOne({ email: user.email })
      if (!existingUser) {
        existingUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account?.provider,
          providerAccountId: account?.providerAccountId,
          role: 'customer',
        })
        console.log('🆕 New user created:', existingUser)
      } else {
        await User.updateOne(
          { email: user.email },
          {
            $set: {
              name: user.name,
              image: user.image,
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
            },
          }
        )
        console.log('✏️ User updated')
      }

      user.id = existingUser._id.toString()
      // ✅ no return statement here
    },
  },
})
