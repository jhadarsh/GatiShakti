const mongoose = require("mongoose");
const {Schema} = mongoose;

const slotSchema = new mongoose.Schema({
  stationName: { type: String, required: true },
  rowNumber: { type: Number, required: true },
  position: { type: Number, required: true }, // 1st, 2nd, 3rd...
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" }, // FK to Driver
  bookedAt: { type: Date }
});

module.exports = mongoose.model("Slot", slotSchema);
