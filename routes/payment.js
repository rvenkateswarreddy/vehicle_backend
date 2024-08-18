const express = require("express");
const {
  createOrder,
  getAllPayments,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/", getAllPayments);

module.exports = router;
