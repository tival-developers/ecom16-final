
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string


 // eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = await mongoose.connect(MONGODB_URI, {
      dbName: "ecom16",
      bufferCommands: false,
    }).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectToDatabase