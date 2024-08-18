const express = require("express");
const {
  viewAdminProfile,
  editAdminProfile,
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/profile", viewAdminProfile);
router.post("/profile/edit", editAdminProfile);
router.post("/register", registerAdmin);

router.post("/login", loginAdmin);
module.exports = router;
