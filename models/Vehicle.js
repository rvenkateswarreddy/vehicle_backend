const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "Electric Scooter",
      "Petrol Scooter",
      "Car",
      "Diesel Scooter",
      "Bicycle",
      "Bike",
    ],
    required: true,
  },
  rating: { type: String },
  num_ratings: { type: String },
  price_per_hour: { type: Number, required: true },
  price_per_km: { type: Number, required: true },
  extra_time_rate: { type: Number, required: true },
  fuel_type: { type: String, required: true },
  features: [String],
  cancellation_policy: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
  },
  availability: { type: Boolean, required: true },
  image_url: { type: String }, // Add image_url field
});

// Pre-save middleware to set the image_url based on vehicle type
vehicleSchema.pre("save", function (next) {
  const vehicle = this;

  // Normalize type to lowercase for comparison
  const type = vehicle.type.toLowerCase();

  switch (type) {
    case "car":
      vehicle.image_url =
        "https://mda.spinny.com/sp-file-system/public/2024-08-17/22fb271823b14a9cab2ad128de4f404c/file.JPG?q=85&w=360";
      break;
    case "electric scooter":
      vehicle.image_url =
        "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/hero-electric-select-model-matt-black-1620720735168.jpg?q=80";
      break;
    case "petrol scooter":
      vehicle.image_url =
        "https://imgd.aeplcdn.com/310x174/n/cw/ec/114525/dream-right-side-view-5.png?isig=0&q=80";
      break;
    case "diesel scooter":
      vehicle.image_url =
        "https://imgd.aeplcdn.com/310x174/n/cw/ec/171099/z650rs-right-side-view.png?isig=0&q=80";
      break;
    case "bicycle":
      vehicle.image_url =
        "https://rukminim2.flixcart.com/image/612/612/xif0q/cycle/g/c/o/beast-multispeed-bike-with-fs-dd-brake-26-18-leader-76-2-7-gear-original-imah2w5u2cas7wfg.jpeg?q=70";
      break;
    case "bike":
      vehicle.image_url =
        "https://imgd.aeplcdn.com/310x174/n/cw/ec/43482/sp-125-right-side-view-10.png?isig=0&q=80";
      break;
    default:
      vehicle.image_url =
        "https://media.istockphoto.com/id/536973845/photo/studio-shot-of-colorful-generic-cars.jpg?s=612x612&w=0&k=20&c=ocRc36JAWCd_15HMPeRIbTeFLQC31Jc-l2E9uJRi15I="; // Default image for other types
  }

  next();
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
