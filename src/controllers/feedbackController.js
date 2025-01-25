import Feedback from "../models/Feedback.js"

// Get all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
    res.status(200).json(feedback)
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message })
  }
}

// Get a single feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ feedback_id: req.params.id })
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" })
    }
    res.status(200).json(feedback)
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message })
  }
}

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body)
    const savedFeedback = await newFeedback.save()
    res.status(201).json(savedFeedback)
  } catch (error) {
    res.status(400).json({ message: "Error creating feedback", error: error.message })
  }
}

// Update a feedback
export const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findOneAndUpdate({ feedback_id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" })
    }
    res.status(200).json(updatedFeedback)
  } catch (error) {
    res.status(400).json({ message: "Error updating feedback", error: error.message })
  }
}

// Delete a feedback
export const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findOneAndDelete({ feedback_id: req.params.id })
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" })
    }
    res.status(200).json({ message: "Feedback deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error: error.message })
  }
}

