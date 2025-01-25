import express from "express";
import OrderItem from "../models/OrderItem.js";

const router = express.Router();


// Get all order items
router.get("/", async (req, res) => {
  try {
    const orderItems = await OrderItem.find()
    res.json(orderItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a specific order item
router.get("/:id", getOrderItem, (req, res) => {
  res.json(res.orderItem)
})

// Create a new order item
router.post("/", async (req, res) => {
  const orderItem = new OrderItem({
    order_item_id: req.body.order_item_id,
    order_id: req.body.order_id,
    menu_id: req.body.menu_id,
    quantity: req.body.quantity,
    special_instructions: req.body.special_instructions,
    price: req.body.price,
    subtotal: req.body.subtotal,
  })

  try {
    const newOrderItem = await orderItem.save()
    res.status(201).json(newOrderItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update an order item
router.patch("/:id", getOrderItem, async (req, res) => {
  if (req.body.quantity != null) {
    res.orderItem.quantity = req.body.quantity
  }
  if (req.body.special_instructions != null) {
    res.orderItem.special_instructions = req.body.special_instructions
  }
  if (req.body.price != null) {
    res.orderItem.price = req.body.price
  }
  if (req.body.subtotal != null) {
    res.orderItem.subtotal = req.body.subtotal
  }

  try {
    const updatedOrderItem = await res.orderItem.save()
    res.json(updatedOrderItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete an order item
router.delete("/:id", getOrderItem, async (req, res) => {
  try {
    await res.orderItem.remove()
    res.json({ message: "Order item deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getOrderItem(req, res, next) {
  let orderItem
  try {
    orderItem = await OrderItem.findOne({ order_item_id: req.params.id })
    if (orderItem == null) {
      return res.status(404).json({ message: "Cannot find order item" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.orderItem = orderItem
  next()
}

export default router;

