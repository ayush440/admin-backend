import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// Get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find()
    res.json(payments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a specific payment
router.get("/:id", getPayment, (req, res) => {
  res.json(res.payment)
})

// Create a new payment
router.post("/", async (req, res) => {
  const payment = new Payment({
    payment_id: req.body.payment_id,
    order_id: req.body.order_id,
    table_id: req.body.table_id,
    total_amount: req.body.total_amount,
    payment_method: req.body.payment_method,
    billing_status: req.body.billing_status,
  })

  try {
    const newPayment = await payment.save()
    res.status(201).json(newPayment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a payment
router.patch("/:id", getPayment, async (req, res) => {
  if (req.body.total_amount != null) {
    res.payment.total_amount = req.body.total_amount
  }
  if (req.body.payment_method != null) {
    res.payment.payment_method = req.body.payment_method
  }
  if (req.body.billing_status != null) {
    res.payment.billing_status = req.body.billing_status
  }

  try {
    const updatedPayment = await res.payment.save()
    res.json(updatedPayment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a payment
router.delete("/:id", getPayment, async (req, res) => {
  try {
    await res.payment.remove()
    res.json({ message: "Payment deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getPayment(req, res, next) {
  let payment
  try {
    payment = await Payment.findOne({ payment_id: req.params.id })
    if (payment == null) {
      return res.status(404).json({ message: "Cannot find payment" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.payment = payment
  next()
}

export default router

