const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String }, // email or phone
  category: { 
    type: String, 
    enum: ["Traffic Jam", "Potholes", "Water Logging", "Broken Signals", "Encroachment", "Others"],
    required: true 
  },
  description: { type: String, required: true },
  location: { type: String, required: true },
  images: [{ type: String }], // store uploaded image URLs
  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Resolved"], 
    default: "Pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", complaintSchema);
