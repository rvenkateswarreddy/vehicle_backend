const dotenv = require("dotenv");
dotenv.config();

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Fetch payment details from Razorpay
const getPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error("Error fetching payment details from Razorpay:", error);
    throw error;
  }
};

module.exports = {
  getPaymentDetails,
};
