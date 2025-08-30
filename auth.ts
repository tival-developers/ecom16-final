
import connectToDatabase from '@/lib/db/dbConnection'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Tiktok from 'next-auth/providers/tiktok'
import Instagram from 'next-auth/providers/instagram'
import type { Provider } from 'next-auth/providers'
import NextAuth from 'next-auth'
import User from './lib/db/models/user.model'
import bcrypt from 'bcryptjs'
import { signInSchema } from './lib/db/essentials/zod'
import { ZodError } from 'zod'

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

        await connectToDatabase

        let user = await User.findOne({ email })

        // If user does not exist → create them
        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10)
          user = await User.create({
            name: email.split('@')[0], // default name from email
            email,
            password: hashedPassword,
            provider: 'credentials',
          })
          // ✅ Immediately log in after signup
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image || null,
          }
        } else {
          // If they exist, check password
          if (!user.password) {
            throw new Error(
              'Account exists but no password is set. Try OAuth login.'
            )
          }

          const isPasswordValid = await bcrypt.compare(password, user.password)
          if (!isPasswordValid) {
            throw new Error('Invalid credentials.')
          }
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        }
      } catch (error) {
        if (error instanceof ZodError) {
          return null
        }
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
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.image as string
      }
      return session
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
// import connectToDatabase from '@/lib/db/dbConnection'
// import Credentials from 'next-auth/providers/credentials'
// import Google from 'next-auth/providers/google'
// import Tiktok from 'next-auth/providers/tiktok'
// import Instagram from 'next-auth/providers/instagram'
// import type { Provider } from 'next-auth/providers'
// import NextAuth from 'next-auth'
// import User from './lib/db/models/user.model'
// import bcrypt from 'bcryptjs'
// import { signInSchema } from './lib/db/essentials/zod'
// import { ZodError } from 'zod'

// // 3) Define your providers
// const providers: Provider[] = [
//   Credentials({
//     credentials: {
//       email: { label: 'Email', type: 'email', name: 'email' },
//       password: { label: 'Password', type: 'password', name: 'password' },
//     },
//     authorize: async (credentials) => {
//       try {
//         const { email, password } = await signInSchema.parseAsync(credentials)

//         await connectToDatabase

//         const user = await User.findOne({ email })
//         if (!user) {
//           throw new Error('Invalid credentials.')
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password)
//         if (!isPasswordValid) {
//           throw new Error('Invalid credentials.')
//         }

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//         }
//       } catch (error) {
//         if (error instanceof ZodError) {
//           return null
//         }
//         console.error('Authorize Error:', error)
//         return null
//       }
//     }

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
//     if (typeof provider === 'function') {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== 'credentials')

// // 5) Instantiate NextAuth with callbacks
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: '/login',
//     signOut: '/sign-out',
//   },
//   callbacks: {
//     // When a user signs in, copy user.id into token.id
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.name = user.name
//         token.email = user.email
//       }
//       return token
//     },
//     // Whenever a session is checked, copy token.id into session.user.id
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//         session.user.name = token.name as string
//         session.user.email = token.email as string
//       }
//       console.log(session)
//       return session
//     },
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   // events: {
//   //   async signIn({ user, account }) {
//   //     await connectToDatabase

//   //     await User.findOneAndUpdate(
//   //       { email: user.email },
//   //       {
//   //         $set: {
//   //           name: user.name,
//   //           email: user.email,
//   //           image: user.image,
//   //           provider: account?.provider,
//   //         },
//   //       },
//   //       { upsert: true, new: true, setDefaultsOnInsert: true }
//   //     )
//   //   },
//   // },
//   events: {
//     async signIn({ user, account }) {
//       await connectToDatabase

//       await User.findOneAndUpdate(
//         { email: user.email },
//         {
//           $set: {
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             provider: account?.provider,
//             providerAccountId: account?.providerAccountId,
//           },
//         },
//         { upsert: true, new: true, setDefaultsOnInsert: true }
//       )
//     },
//   },

// })
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import TikTokProvider from "next-auth/providers/tiktok";
// import InstagramProvider from "next-auth/providers/instagram";
// import connectToDatabase from "@/lib/db/dbConnection";
// import User from "@/lib/db/models/user.model";
// import bcrypt from "bcryptjs";
// import { signInSchema } from "@/lib/db/essentials/zod";
// import { ZodError } from "zod";

// // ----- PROVIDERS -----
// const providers = [
//   CredentialsProvider({
//     name: "Credentials",
//     credentials: {
//       email: { label: "Email", type: "email", name: "email" },
//       password: { label: "Password", type: "password", name: "password" },
//     },
//     authorize: async (credentials) => {
//       try {
//         const { email, password } = await signInSchema.parseAsync(credentials);

//         await connectToDatabase;

//         const user = await User.findOne({ email });

//         if (!user) {
//           // Optional: create new credentials user
//           const hashedPassword = await bcrypt.hash(password, 10);
//           const user = await User.create({
//             name: email.split("@")[0],
//             email,
//             password: hashedPassword,
//             provider: "credentials",
//           });
//           // ✅ Immediately log in after signup
//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             image: user.image || null,
//           }
//           // return {
//           //   id: newUser._id.toString(),
//           //   name: newUser.name,
//           //   email: newUser.email,
//           // };
//         }

//         // OAuth account without password
//         if (!user.password) {
//           throw new Error("OAUTH_NO_PASSWORD");
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) throw new Error("Invalid credentials.");

//         return { id: user._id.toString(), name: user.name, email: user.email };
//       } catch (error) {
//         if (error instanceof ZodError) return null;
//         throw error;
//       }
//     },
//   }),
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),
//   TikTokProvider({
//     clientId: process.env.TIKTOK_CLIENT_ID!,
//     clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
//   }),
//   InstagramProvider({
//     clientId: process.env.INSTAGRAM_CLIENT_ID!,
//     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
//   }),
// ];
// // 4) Export provider map for your UI, if needed
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

// // ----- NEXTAUTH CONFIG -----
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: '/login',
//     signOut: '/sign-out',
//   },
//   session: { strategy: "jwt" },
//   callbacks: {
//     async signIn({ user, account, credentials }) {
//       // Only run for credentials login
//       if (account?.provider === "credentials") {
//         // Type guard to ensure 'password' exists
//         if ("password" in user && !user.password) {
//           // redirect to set-password page
//           return `/auth/set-password?email=${encodeURIComponent(
//             credentials?.email as string
//           )}`;
//         }
//       }
//       return true;
//     },
//   },
  

//   events: {
//     async signIn({ user, account }) {
//       await connectToDatabase;
//       let existingUser = await User.findOne({ email: user.email });

//       if (!existingUser) {
//         existingUser = await User.create({
//           name: user.name,
//           email: user.email,
//           image: user.image,
//           provider: account?.provider,
//           providerAccountId: account?.providerAccountId,
//         });
//       } else {
//         await User.updateOne(
//           { email: user.email },
//           {
//             $set: {
//               name: user.name,
//               image: user.image,
//               provider: account?.provider,
//               providerAccountId: account?.providerAccountId,
//             },
//           }
//         );
//       }
//       user.id = existingUser._id.toString();
//     },
//   },
// });

