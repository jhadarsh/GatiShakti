const mongoose = require("mongoose");

const potholeSchema = new mongoose.Schema(
  {
    potholeId: {
      type: String,
      required: true,
      unique: true,
    },

    signalNumber: {
      type: String,
      required: true,
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

    potholeType: {
      type: String,
      enum: ["CRITICAL", "MID", "MINOR"],
      default: "MINOR",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    resolved: {
      type: Boolean,
      default: false,
    },

    dispatched: {
      type: Boolean,
      default: false,
    },

    dispatchNote: {
      type: String,
      default: "",
    },

    dispatchedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    detectionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Pothole",
  potholeSchema
);