const mongoose = require("mongoose");

const parkingSpaceSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    landmark: {
      type: String,
      required: true,
    },

    totalSlots: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSlots: {
      type: Number,
      required: true,
      min: 0,
    },

    slotPrice: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    adminName: {
      type: String,
      required: true,
    },

    adminContact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ParkingSpace",
  parkingSpaceSchema
);