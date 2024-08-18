const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const users = require("./routes/users");
const vehicles = require("./routes/vehicles");
const bookings = require("./routes/bookings");
const payment = require("./routes/payment");
const adminRoutes = require("./routes/adminRoutes");
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/users", users); // User routes
app.use("/api/vehicles", vehicles); // Vehicle routes
app.use("/api/bookings", bookings); // Booking routes
app.use("/api/payment", payment); // Booking routes
app.use("/api/admin", adminRoutes); // Booking routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Vehicle Rental API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
