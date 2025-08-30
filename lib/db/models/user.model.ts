import mongoose from 'mongoose'
import { models, model } from 'mongoose'

const ShippingInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  ward: String,
  postalCode: String,
  county: String,
  phone: String,
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: String,
  password: { type: String }, // <-- was required: true
  provider: String,
  providerAccountId: String,
  shippingInfo: ShippingInfoSchema,
})

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true })

const User = models?.User || model('User', userSchema)

export default User
