import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a specific order
router.get("/:id", getOrder, (req, res) => {
  res.json(res.order)
})

// Create a new order
router.post("/", async (req, res) => {
  const order = new Order({
    order_id: req.body.order_id,
    table_id: req.body.table_id,
    staff_id: req.body.staff_id,
    order_status: req.body.order_status,
  })

  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update an order
router.patch("/:id", getOrder, async (req, res) => {
  if (req.body.table_id != null) {
    res.order.table_id = req.body.table_id
  }
  if (req.body.staff_id != null) {
    res.order.staff_id = req.body.staff_id
  }
  if (req.body.order_status != null) {
    res.order.order_status = req.body.order_status
  }
  res.order.updated_at = Date.now()

  try {
    const updatedOrder = await res.order.save()
    res.json(updatedOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete an order
router.delete("/:id", getOrder, async (req, res) => {
  try {
    await res.order.remove()
    res.json({ message: "Order deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getOrder(req, res, next) {
  let order
  try {
    order = await Order.findOne({ order_id: req.params.id })
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.order = order
  next()
}

export default router

