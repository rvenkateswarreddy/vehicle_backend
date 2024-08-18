const mongoose = require("mongoose");
const Vehicle = require("./models/Vehicle"); // Adjust the path as needed

async function listIndexes() {
  try {
    await mongoose.connect(
      "mongodb+srv://rvenkateswarreddy12345:vehicle@cluster0.zsz8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const indexes = await Vehicle.collection.indexes();
    console.log("Indexes:", indexes);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error listing indexes:", error);
  }
}

listIndexes();
