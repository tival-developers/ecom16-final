import mongoose from 'mongoose'

const ShippingAddressSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    // customerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
  },
  { timestamps: true }
)

export const ShippingAddress =
  mongoose.models.ShippingAddress ||
  mongoose.model('ShippingAddress', ShippingAddressSchema)
