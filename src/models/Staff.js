import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const staffSchema = new mongoose.Schema({
  staff_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["Wait Staff", "Manager", "Kitchen Staff"], required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  password: { type: String, required: true },
  permissions: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

staffSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

export default mongoose.model("Staff", staffSchema)

