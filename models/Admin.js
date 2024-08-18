const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  secretkey: { type: String, required: true }, // Optional field
  role: { type: String, default: "admin" }, // Added a role field specific to admins
});

module.exports = mongoose.model("Admin", adminSchema);
