const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserDetails,
  updateUser,
  deleteUser,
  searchUsers,
  allusers,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:user_id", getUserDetails);
router.put("/:user_id", updateUser);
router.delete("/:user_id", deleteUser);
router.get("/search", searchUsers);
router.get("/all/users", allusers);

module.exports = router;
