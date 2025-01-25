import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  notification_id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  recipient_id: { type: String, required: true },
  status: { type: String, enum: ["Read", "Unread"], default: "Unread" },
  created_at: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
