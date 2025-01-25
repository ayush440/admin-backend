import Menu from "../models/Menu.js"

// Get all menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
    res.status(200).json(menuItems)
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items", error: error.message })
  }
}

// Get a single menu item by ID
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findOne({ menu_id: req.params.id })
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" })
    }
    res.status(200).json(menuItem)
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu item", error: error.message })
  }
}

// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const newMenuItem = new Menu(req.body)
    const savedMenuItem = await newMenuItem.save()
    res.status(201).json(savedMenuItem)
  } catch (error) {
    res.status(400).json({ message: "Error creating menu item", error: error.message })
  }
}

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await Menu.findOneAndUpdate({ menu_id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" })
    }
    res.status(200).json(updatedMenuItem)
  } catch (error) {
    res.status(400).json({ message: "Error updating menu item", error: error.message })
  }
}

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const deletedMenuItem = await Menu.findOneAndDelete({ menu_id: req.params.id })
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" })
    }
    res.status(200).json({ message: "Menu item deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error: error.message })
  }
}

