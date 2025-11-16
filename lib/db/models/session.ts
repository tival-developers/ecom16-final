import mongoose, { Schema, models } from "mongoose";

const sessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  sessionToken: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, expires: 60 * 60 * 24 }, // expires in 1 day
});

export default models.Session || mongoose.model("Session", sessionSchema);
