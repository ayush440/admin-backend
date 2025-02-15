import Order from "../models/Order.js"

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message })
  }
}

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.id })
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message })
  }
}

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body)
    const savedOrder = await newOrder.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error: error.message })
  }
}

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate({ order_id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(400).json({ message: "Error updating order", error: error.message })
  }
}

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ order_id: req.params.id })
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.status(200).json({ message: "Order deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message })
  }
}

