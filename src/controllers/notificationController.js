import Notification from "../models/Notification.js"

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message })
  }
}

// Get a single notification by ID
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findOne({ notification_id: req.params.id })
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" })
    }
    res.status(200).json(notification)
  } catch (error) {
    res.status(500).json({ message: "Error fetching notification", error: error.message })
  }
}

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body)
    const savedNotification = await newNotification.save()
    res.status(201).json(savedNotification)
  } catch (error) {
    res.status(400).json({ message: "Error creating notification", error: error.message })
  }
}

// Update a notification
export const updateNotification = async (req, res) => {
  try {
    const updatedNotification = await Notification.findOneAndUpdate({ notification_id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" })
    }
    res.status(200).json(updatedNotification)
  } catch (error) {
    res.status(400).json({ message: "Error updating notification", error: error.message })
  }
}

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await Notification.findOneAndDelete({ notification_id: req.params.id })
    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" })
    }
    res.status(200).json({ message: "Notification deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error: error.message })
  }
}

