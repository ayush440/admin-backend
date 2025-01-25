import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true, unique: true },
  order_id: { type: String, required: true },
  table_id: { type: String, required: true },
  total_amount: { type: Number, required: true },
  payment_method: { type: String, enum: ["Cash", "Card", "Digital"], required: true },
  billing_status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
  payment_date: { type: Date, default: Date.now },
})

export default mongoose.model("Payment", paymentSchema)

