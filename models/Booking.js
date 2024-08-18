const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  vehicle_id: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pickup_date: { type: Date, required: true },
  pickup_time: { type: String, required: true },
  package_type: { type: String, required: true },
  location: { type: String, required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, default: "Booked" }, // Status of the booking
  payment_status: { type: String, default: "Pending" }, // Payment status
  payment_id: { type: String }, // Payment gateway transaction ID
  payment_amount: { type: Number }, // Actual payment amount
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
