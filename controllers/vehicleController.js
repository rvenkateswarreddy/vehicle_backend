const Vehicle = require("../models/Vehicle");

// Get all vehicles with optional filters
exports.getAvailableVehicles = async (req, res) => {
  try {
    const { location, pickup_date, pickup_time, package_type } = req.query;

    // Construct filter criteria based on query parameters
    let filter = {};
    if (location) filter.location = location; // You might need to adjust depending on your implementation
    if (pickup_date) filter.pickup_date = new Date(pickup_date);
    if (pickup_time) filter.pickup_time = pickup_time;
    if (package_type) filter.package_type = package_type;

    // Fetch vehicles from the database
    const vehicles = await Vehicle.find(filter);

    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get vehicle details by ID
exports.getVehicleDetails = async (req, res) => {
  try {
    const { vehicle_id } = req.params;
    const vehicle = await Vehicle.findById(vehicle_id);
    console.log(vehicle);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new vehicle
exports.addVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    console.log(vehicle);
    await vehicle.save();
    res.status(201).json({ vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.allvehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update an existing vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search vehicles based on various criteria
exports.searchVehicles = async (req, res) => {
  try {
    const { location, pickup_date, pickup_time, package_type } = req.query;

    // Construct filter criteria
    let filter = {};
    if (location) filter.location = location;
    if (pickup_date) filter.pickup_date = new Date(pickup_date);
    if (pickup_time) filter.pickup_time = pickup_time;
    if (package_type) filter.package_type = package_type;

    // Fetch vehicles based on filter criteria
    const vehicles = await Vehicle.find(filter);

    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getvehicles = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, availability, search } = req.query;

    // Build the query object based on the provided filters
    let query = {};

    if (type) {
      query.type = type;
    }

    if (minPrice || maxPrice) {
      query.price_per_hour = {};
      if (minPrice) {
        query.price_per_hour.$gte = minPrice;
      }
      if (maxPrice) {
        query.price_per_hour.$lte = maxPrice;
      }
    }

    if (availability) {
      query.availability = availability === "available" ? true : false;
    }

    if (search) {
      query.$or = [
        { make: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch vehicles based on the query
    const vehicles = await Vehicle.find(query);

    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching vehicles" });
  }
};
// controllers/vehicleController.js

/// controllers/vehicleController.js
exports.getNearbyVehicles = async (req, res) => {
  const { lat, lng, maxDistance } = req.query;
  const distanceInRadians = parseFloat(maxDistance) / 3963.2;

  console.log("Latitude:", lat);
  console.log("Longitude:", lng);
  console.log("Distance in Radians:", distanceInRadians);

  try {
    const vehicles = await Vehicle.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            distanceInRadians,
          ],
        },
      },
    });

    console.log("Vehicles Found:", vehicles);
    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching nearby vehicles:", error);
    res.status(500).json({ message: "Server error" });
  }
};
