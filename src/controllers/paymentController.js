import Payment from "../models/Payment.js"

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
    res.status(200).json(payments)
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message })
  }
}

// Get a single payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({ payment_id: req.params.id })
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" })
    }
    res.status(200).json(payment)
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error: error.message })
  }
}

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body)
    const savedPayment = await newPayment.save()
    res.status(201).json(savedPayment)
  } catch (error) {
    res.status(400).json({ message: "Error creating payment", error: error.message })
  }
}

// Update a payment
export const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findOneAndUpdate({ payment_id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" })
    }
    res.status(200).json(updatedPayment)
  } catch (error) {
    res.status(400).json({ message: "Error updating payment", error: error.message })
  }
}

// Delete a payment
export const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findOneAndDelete({ payment_id: req.params.id })
    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" })
    }
    res.status(200).json({ message: "Payment deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error: error.message })
  }
}

