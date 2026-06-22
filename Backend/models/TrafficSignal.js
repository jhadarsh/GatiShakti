const mongoose = require("mongoose");

const trafficSignalSchema = new mongoose.Schema(
  {
    signalNumber: {
      type: String,
      required: true,
      unique: true,
    },

    roadName: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    cameraNumber: {
      type: String,
      required: true,
    },

    roadWidth: {
      type: Number,
      default: 0,
    },

    // Current Values
    currentVehicleCount: {
      type: Number,
      default: 0,
    },

    currentRedLightTime: {
      type: Number,
      default: 0,
    },

    currentGreenLightTime: {
      type: Number,
      default: 0,
    },

    vehicleDensity: {
      type: Number,
      default: 0,
    },

    congestionLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },

    // Previous Cycle Values
    lastVehicleCount: {
      type: Number,
      default: 0,
    },

    lastRedLightTime: {
      type: Number,
      default: 0,
    },

    lastGreenLightTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "TrafficSignal",
  trafficSignalSchema
);