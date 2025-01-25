import express from "express";
import Table from "../models/Table.js";

const router = express.Router();


// Get all tables
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find()
    res.json(tables)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a specific table
router.get("/:id", getTable, (req, res) => {
  res.json(res.table)
})

// Create a new table
router.post("/", async (req, res) => {
  const table = new Table({
    table_id: req.body.table_id,
    table_number: req.body.table_number,
    seating_capacity: req.body.seating_capacity,
    occupancy_status: req.body.occupancy_status,
    reservation_time: req.body.reservation_time,
    current_order_id: req.body.current_order_id,
  })

  try {
    const newTable = await table.save()
    res.status(201).json(newTable)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a table
router.patch("/:id", getTable, async (req, res) => {
  if (req.body.table_number != null) {
    res.table.table_number = req.body.table_number
  }
  if (req.body.seating_capacity != null) {
    res.table.seating_capacity = req.body.seating_capacity
  }
  if (req.body.occupancy_status != null) {
    res.table.occupancy_status = req.body.occupancy_status
  }
  if (req.body.reservation_time != null) {
    res.table.reservation_time = req.body.reservation_time
  }
  if (req.body.current_order_id != null) {
    res.table.current_order_id = req.body.current_order_id
  }

  try {
    const updatedTable = await res.table.save()
    res.json(updatedTable)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a table
router.delete("/:id", getTable, async (req, res) => {
  try {
    await res.table.remove()
    res.json({ message: "Table deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTable(req, res, next) {
  let table
  try {
    table = await Table.findOne({ table_id: req.params.id })
    if (table == null) {
      return res.status(404).json({ message: "Cannot find table" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.table = table
  next()
}

export default router

