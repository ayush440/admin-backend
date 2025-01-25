import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  feedback_id: { type: String, required: true, unique: true },
  order_id: { type: String, required: true },
  table_id: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
