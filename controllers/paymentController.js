const Razorpay = require("razorpay");
const Booking = require("../models/Booking");
const { getPaymentDetails } = require("../razorpayservices");
const dotenv = require("dotenv");
dotenv.config();
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllPayments = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id", "name email")
      .populate("vehicle_id", "make model");

    // Fetch Razorpay payment details for each booking
    const bookingsWithPaymentDetails = await Promise.all(
      bookings.map(async (booking) => {
        if (booking.payment_id) {
          try {
            const paymentDetails = await getPaymentDetails(booking.payment_id);
            return { ...booking._doc, paymentDetails };
          } catch (error) {
            return { ...booking._doc, paymentDetails: null };
          }
        } else {
          return { ...booking._doc, paymentDetails: null };
        }
      })
    );

    res.json(bookingsWithPaymentDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve payment details", error });
  }
};
