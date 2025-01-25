import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Staff from "../models/Staff.js";

const router = express.Router();

// Get all staff members
router.get("/", async (req, res) => {
  try {
    const staffMembers = await Staff.find().select("-password")
    res.json(staffMembers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a specific staff member
router.get("/:id", getStaff, (req, res) => {
  res.json(res.staff)
})

// Create a new staff member
router.post("/", async (req, res) => {
  const staff = new Staff({
    staff_id: req.body.staff_id,
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: req.body.password,
    permissions: req.body.permissions,
  })

  try {
    const newStaff = await staff.save()
    res.status(201).json(newStaff)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a staff member
router.patch("/:id", getStaff, async (req, res) => {
  if (req.body.name != null) {
    res.staff.name = req.body.name
  }
  if (req.body.role != null) {
    res.staff.role = req.body.role
  }
  if (req.body.email != null) {
    res.staff.email = req.body.email
  }
  if (req.body.phone_number != null) {
    res.staff.phone_number = req.body.phone_number
  }
  if (req.body.password != null) {
    res.staff.password = req.body.password
  }
  if (req.body.permissions != null) {
    res.staff.permissions = req.body.permissions
  }
  res.staff.updated_at = Date.now()

  try {
    const updatedStaff = await res.staff.save()
    res.json(updatedStaff)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a staff member
router.delete("/:id", getStaff, async (req, res) => {
  try {
    await res.staff.remove()
    res.json({ message: "Staff member deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Staff login
router.post("/login", async (req, res) => {
  try {
    const staff = await Staff.findOne({ email: req.body.email })
    if (!staff) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const validPassword = await bcrypt.compare(req.body.password, staff.password)
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ staff_id: staff.staff_id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getStaff(req, res, next) {
  let staff
  try {
    staff = await Staff.findOne({ staff_id: req.params.id }).select("-password")
    if (staff == null) {
      return res.status(404).json({ message: "Cannot find staff member" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.staff = staff
  next()
}

export default router

