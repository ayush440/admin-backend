import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find()
    res.json(notifications)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a specific notification
router.get("/:id", getNotification, (req, res) => {
  res.json(res.notification)
})

// Create a new notification
router.post("/", async (req, res) => {
  const notification = new Notification({
    notification_id: req.body.notification_id,
    type: req.body.type,
    message: req.body.message,
    recipient_id: req.body.recipient_id,
    status: req.body.status,
  })

  try {
    const newNotification = await notification.save()
    res.status(201).json(newNotification)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a notification
router.patch("/:id", getNotification, async (req, res) => {
  if (req.body.type != null) {
    res.notification.type = req.body.type
  }
  if (req.body.message != null) {
    res.notification.message = req.body.message
  }
  if (req.body.recipient_id != null) {
    res.notification.recipient_id = req.body.recipient_id
  }
  if (req.body.status != null) {
    res.notification.status = req.body.status
  }

  try {
    const updatedNotification = await res.notification.save()
    res.json(updatedNotification)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a notification
router.delete("/:id", getNotification, async (req, res) => {
  try {
    await res.notification.remove()
    res.json({ message: "Notification deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getNotification(req, res, next) {
  let notification
  try {
    notification = await Notification.findOne({ notification_id: req.params.id })
    if (notification == null) {
      return res.status(404).json({ message: "Cannot find notification" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.notification = notification
  next()
}

export default router;

