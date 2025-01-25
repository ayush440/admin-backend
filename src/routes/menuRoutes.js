import express from "express";
import Menu from "../models/Menu.js";

const router = express.Router();


// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await Menu.find()
    res.json(menuItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a specific menu item
router.get("/:id", getMenuItem, (req, res) => {
  res.json(res.menuItem)
})

// Create a new menu item
router.post("/", async (req, res) => {
  const menuItem = new Menu({
    menu_id: req.body.menu_id,
    category: req.body.category,
    subcategory: req.body.subcategory,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    availability: req.body.availability,
    allergens: req.body.allergens,
  })

  try {
    const newMenuItem = await menuItem.save()
    res.status(201).json(newMenuItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a menu item
router.patch("/:id", getMenuItem, async (req, res) => {
  if (req.body.category != null) {
    res.menuItem.category = req.body.category
  }
  if (req.body.subcategory != null) {
    res.menuItem.subcategory = req.body.subcategory
  }
  if (req.body.name != null) {
    res.menuItem.name = req.body.name
  }
  if (req.body.description != null) {
    res.menuItem.description = req.body.description
  }
  if (req.body.price != null) {
    res.menuItem.price = req.body.price
  }
  if (req.body.availability != null) {
    res.menuItem.availability = req.body.availability
  }
  if (req.body.allergens != null) {
    res.menuItem.allergens = req.body.allergens
  }
  res.menuItem.updated_at = Date.now()

  try {
    const updatedMenuItem = await res.menuItem.save()
    res.json(updatedMenuItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a menu item
router.delete("/:id", getMenuItem, async (req, res) => {
  try {
    await res.menuItem.remove()
    res.json({ message: "Menu item deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getMenuItem(req, res, next) {
  let menuItem
  try {
    menuItem = await Menu.findOne({ menu_id: req.params.id })
    if (menuItem == null) {
      return res.status(404).json({ message: "Cannot find menu item" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.menuItem = menuItem
  next()
}

export default router;


