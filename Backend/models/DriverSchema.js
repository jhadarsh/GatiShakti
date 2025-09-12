const mongoose = require("mongoose");
const {Schema} = mongoose;

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  licenseNo: { type: String,  unique: true },
  vehicleNo: { type: String, required: true, unique: true },
  status: { type: String, enum: ["active", "blocked"], default: "active" }
});

module.exports = mongoose.model("Driver", driverSchema);
