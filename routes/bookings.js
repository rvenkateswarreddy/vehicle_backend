const express = require("express");
const router = express.Router();
const {
  bookVehicle,
  getBookingDetails,
  getUserBookings,
  updateBooking,
  cancelBooking,
  searchBookings,
  getAllBookings,
} = require("../controllers/bookingController");
const { userAuth } = require("../middleware/auth");

router.post("/book", userAuth, bookVehicle);
router.get("/:booking_id", getBookingDetails);
router.get("/user/:user_id", getUserBookings);
router.put("/:booking_id", updateBooking);
router.delete("/:booking_id", cancelBooking);
router.get("/search", searchBookings);
router.get("/all/bookinglist", getAllBookings);

module.exports = router;
