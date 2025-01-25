import OrderItem from "../models/OrderItem.js"

// Get all order items
export const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find()
    res.status(200).json(orderItems)
  } catch (error) {
    res.status(500).json({ message: "Error fetching order items", error: error.message })
  }
}

// Get a single order item by ID
export const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findOne({ order_item_id: req.params.id })
    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" })
    }
    res.status(200).json(orderItem)
  } catch (error) {
    res.status(500).json({ message: "Error fetching order item", error: error.message })
  }
}

// Create a new order item
export const createOrderItem = async (req, res) => {
  try {
    const newOrderItem = new OrderItem(req.body)
    const savedOrderItem = await newOrderItem.save()
    res.status(201).json(savedOrderItem)
  } catch (error) {
    res.status(400).json({ message: "Error creating order item", error: error.message })
  }
}

// Update an order item
export const updateOrderItem = async (req, res) => {
  try {
    const updatedOrderItem = await OrderItem.findOneAndUpdate({ order_item_id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedOrderItem) {
      return res.status(404).json({ message: "Order item not found" })
    }
    res.status(200).json(updatedOrderItem)
  } catch (error) {
    res.status(400).json({ message: "Error updating order item", error: error.message })
  }
}

// Delete an order item
export const deleteOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await OrderItem.findOneAndDelete({ order_item_id: req.params.id })
    if (!deletedOrderItem) {
      return res.status(404).json({ message: "Order item not found" })
    }
    res.status(200).json({ message: "Order item deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting order item", error: error.message })
  }
}

