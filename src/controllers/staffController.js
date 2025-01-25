import Staff from "../models/Staff.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Get all staff members
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select("-password")
    res.status(200).json(staff)
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff members", error: error.message })
  }
}

// Get a single staff member by ID
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findOne({ staff_id: req.params.id }).select("-password")
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" })
    }
    res.status(200).json(staff)
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff member", error: error.message })
  }
}

// Create a new staff member
export const createStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body)
    const savedStaff = await newStaff.save()
    res.status(201).json(savedStaff)
  } catch (error) {
    res.status(400).json({ message: "Error creating staff member", error: error.message })
  }
}

// Update a staff member
export const updateStaff = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    const updatedStaff = await Staff.findOneAndUpdate({ staff_id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    }).select("-password")
    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff member not found" })
    }
    res.status(200).json(updatedStaff)
  } catch (error) {
    res.status(400).json({ message: "Error updating staff member", error: error.message })
  }
}

// Delete a staff member
export const deleteStaff = async (req, res) => {
  try {
    const deletedStaff = await Staff.findOneAndDelete({ staff_id: req.params.id })
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff member not found" })
    }
    res.status(200).json({ message: "Staff member deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting staff member", error: error.message })
  }
}

// Staff login
export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body
    const staff = await Staff.findOne({ email })
    if (!staff) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    const isPasswordValid = await bcrypt.compare(password, staff.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    const token = jwt.sign({ staff_id: staff.staff_id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message })
  }
}

