import mongoose from "mongoose"

const tableSchema = new mongoose.Schema({
  table_id: { type: String, required: true, unique: true },
  table_number: { type: Number, required: true, unique: true },
  seating_capacity: { type: Number, required: true },
  occupancy_status: { type: String, enum: ["Available", "Occupied", "Reserved"], default: "Available" },
  reservation_time: { type: Date },
  current_order_id: { type: String },
})

export default mongoose.model("Table", tableSchema)

