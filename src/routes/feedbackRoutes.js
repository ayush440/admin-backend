import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific feedback
router.get("/:id", getFeedback, (req, res) => {
  res.json(res.feedback);
});

// Create a new feedback
router.post("/", async (req, res) => {
  const feedback = new Feedback({
    feedback_id: req.body.feedback_id,
    order_id: req.body.order_id,
    table_id: req.body.table_id,
    rating: req.body.rating,
    comments: req.body.comments,
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a feedback
router.patch("/:id", getFeedback, async (req, res) => {
  if (req.body.rating != null) {
    res.feedback.rating = req.body.rating;
  }
  if (req.body.comments != null) {
    res.feedback.comments = req.body.comments;
  }

  try {
    const updatedFeedback = await res.feedback.save();
    res.json(updatedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a feedback
router.delete("/:id", getFeedback, async (req, res) => {
  try {
    await res.feedback.remove();
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getFeedback(req, res, next) {
  let feedback;
  try {
    feedback = await Feedback.findOne({ feedback_id: req.params.id });
    if (feedback == null) {
      return res.status(404).json({ message: "Cannot find feedback" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.feedback = feedback;
  next();
}

export default router;
