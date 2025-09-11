import mongoose, { Schema, Document } from "mongoose"

export interface IAdmin extends Document {
  name: string
  email: string
  role: "manager" | "developer" | "sales"
  password: string
  createdAt: Date
}

const AdminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["manager", "developer", "sales"], required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema)
