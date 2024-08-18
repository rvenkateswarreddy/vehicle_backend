const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

// Book a vehicle
exports.bookVehicle = async (req, res) => {
  try {
    const {
      vehicle_id,
      user_id,
      pickup_date,
      pickup_time,
      package_type,
      location,
      total_amount,
      payment_status, // new field
      payment_id, // new field
      payment_amount, // new field
    } = req.body;

    // Validate required fields
    if (
      !vehicle_id ||
      !user_id ||
      !pickup_date ||
      !pickup_time ||
      !package_type ||
      !location ||
      !total_amount ||
      !payment_status || // validate new fields
      !payment_id || // validate new fields
      !payment_amount // validate new fields
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate vehicle existence
    const vehicle = await Vehicle.findById(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Validate user existence
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new booking
    const booking = new Booking({
      vehicle_id,
      user_id,
      pickup_date,
      pickup_time,
      package_type,
      location,
      total_amount,
      payment_status, // save new fields
      payment_id, // save new fields
      payment_amount, // save new fields
    });

    await booking.save();

    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get booking details by ID
exports.getBookingDetails = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const booking = await Booking.findById(booking_id)
      .populate("vehicle_id", "make model type image_url")
      .populate("user_id", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const { user_id } = req.params;
    const bookings = await Booking.find({ user_id })
      .populate("vehicle_id", "make model type image_url")
      .populate("user_id", "name email");

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(
      booking_id,
      req.body,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(booking_id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search bookings based on various criteria
exports.searchBookings = async (req, res) => {
  try {
    const { vehicle_id, user_id, pickup_date, pickup_time, location } =
      req.query;

    // Construct filter criteria
    let filter = {};
    if (vehicle_id) filter.vehicle_id = vehicle_id;
    if (user_id) filter.user_id = user_id;
    if (pickup_date) filter.pickup_date = new Date(pickup_date);
    if (pickup_time) filter.pickup_time = pickup_time;
    if (location) filter.location = location;

    // Fetch bookings based on filter criteria
    const bookings = await Booking.find(filter)
      .populate("vehicle_id", "make model type image_url")
      .populate("user_id", "name email");

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id", "name email") // Populate user_id with name and email fields
      .populate("vehicle_id", "make model image_url"); // Optionally, you can populate vehicle details as well

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bookings", error });
  }
};
