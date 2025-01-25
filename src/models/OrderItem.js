import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
  order_item_id: { type: String, required: true, unique: true },
  order_id: { type: String, required: true },
  menu_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  special_instructions: { type: String },
  price: { type: Number, required: true },
  subtotal: { type: Number, required: true },
})

export default mongoose.model("OrderItem", orderItemSchema)


