import connectToDatabase from '@/lib/db/dbConnection'
import User from '@/lib/db/models/user.model'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    await connectToDatabase

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
    })

    return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
}
