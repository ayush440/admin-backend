
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./db/index.js";
import mongoose from "mongoose";

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err))

// Routes
import menuRoutes from "./routes/menuRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import connectDB from "./db/index.js";



app.use("/api/menu", menuRoutes)
app.use("/api/tables", tableRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/order-items", orderItemRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/staff", staffRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/feedback", feedbackRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
})

const PORT = process.env.PORT || 5000
const startServer = async () => {
  try {
      await connectDB();
      console.log("Connected to the database successfully");

      app.listen(process.env.PORT || 8000, () => {
          console.log(`Server is running on port ${process.env.PORT || 8000}`);
      });
  } catch (error) {
      console.error("Error connecting to the database: ", error);
      process.exit(1);
  }
};

startServer();

