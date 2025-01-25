import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  table_id: { type: String, required: true },
  staff_id: { type: String, required: true },
  order_status: { type: String, enum: ["Pending", "In Preparation", "Served", "Completed"], default: "Pending" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

export default mongoose.model("Order", orderSchema)

