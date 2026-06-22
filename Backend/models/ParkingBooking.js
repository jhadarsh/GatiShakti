const mongoose = require("mongoose");

const parkingBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    parkingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingSpace",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    bookingAmount: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paymentId: {
      type: String,
      default: null,
    },

    bookingStatus: {
      type: String,
      enum: [
        "Active",
        "Cancelled",
        "Completed",
      ],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ParkingBooking",
  parkingBookingSchema
);