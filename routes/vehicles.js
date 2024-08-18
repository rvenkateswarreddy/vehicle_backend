const express = require("express");
const router = express.Router();
const {
  getAvailableVehicles,
  getVehicleDetails,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicles,
  getvehicles,
  getNearbyVehicles,
  allvehicles,
} = require("../controllers/vehicleController");

router.get("/available", getAvailableVehicles);
router.get("/:vehicle_id", getVehicleDetails);
router.post("/", addVehicle);
router.get("/", getvehicles);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.get("/search", searchVehicles);
router.get("/near/nearby", getNearbyVehicles);
router.get("/list/allvehicles", allvehicles);

module.exports = router;
