import Table from "../models/Table.js"

// Get all tables
export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find()
    res.status(200).json(tables)
  } catch (error) {
    res.status(500).json({ message: "Error fetching tables", error: error.message })
  }
}

// Get a single table by ID
export const getTableById = async (req, res) => {
  try {
    const table = await Table.findOne({ table_id: req.params.id })
    if (!table) {
      return res.status(404).json({ message: "Table not found" })
    }
    res.status(200).json(table)
  } catch (error) {
    res.status(500).json({ message: "Error fetching table", error: error.message })
  }
}

// Create a new table
export const createTable = async (req, res) => {
  try {
    const newTable = new Table(req.body)
    const savedTable = await newTable.save()
    res.status(201).json(savedTable)
  } catch (error) {
    res.status(400).json({ message: "Error creating table", error: error.message })
  }
}

// Update a table
export const updateTable = async (req, res) => {
  try {
    const updatedTable = await Table.findOneAndUpdate({ table_id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found" })
    }
    res.status(200).json(updatedTable)
  } catch (error) {
    res.status(400).json({ message: "Error updating table", error: error.message })
  }
}

// Delete a table
export const deleteTable = async (req, res) => {
  try {
    const deletedTable = await Table.findOneAndDelete({ table_id: req.params.id })
    if (!deletedTable) {
      return res.status(404).json({ message: "Table not found" })
    }
    res.status(200).json({ message: "Table deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting table", error: error.message })
  }
}

