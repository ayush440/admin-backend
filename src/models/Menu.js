import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  menu_id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  allergens: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("Menu", menuSchema);
