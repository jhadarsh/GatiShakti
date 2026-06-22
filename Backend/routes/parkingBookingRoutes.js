const express = require("express");
const router = express.Router();

const ParkingBooking = require("../models/ParkingBooking");
const ParkingSpace = require("../models/ParkingSpace");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");

const {
  sendParkingBookingEmail,
} = require("../services/emailService");

router.post(
  "/book",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        parkingId,
        vehicleNumber,
        bookingDate,
        startTime,
        endTime,
      } = req.body;

      const user =
        await User.findById(
          req.user.userId
        );

      const parking =
        await ParkingSpace.findById(
          parkingId
        );

      if (!parking) {
        return res.status(404).json({
          success: false,
          message:
            "Parking not found",
        });
      }

      if (
        parking.availableSlots <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "No slots available",
        });
      }

      parking.availableSlots -= 1;

      await parking.save();

      const booking =
        await ParkingBooking.create({
          userId: user._id,
          parkingId: parking._id,

          userName: user.name,
          email: user.email,
          contactNumber:
            user.phoneNumber,

          vehicleNumber,

          bookingDate,
          startTime,
          endTime,

          bookingAmount:
            parking.slotPrice,
        });

      await sendParkingBookingEmail(
        user.email,
        user.name,
        parking.name,
        vehicleNumber,
        bookingDate,
        startTime,
        endTime
      );
      console.log("email send for parking confirmation for " , user._id ,user.email , user.name );
      res.status(201).json({
        success: true,
        message:
          "Parking booked successfully",
        booking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);


router.get(
  "/my-bookings",
  authMiddleware,
  async (req, res) => {
    try {
      const bookings =
        await ParkingBooking.find({
          userId:
            req.user.userId,
        })
          .populate(
            "parkingId"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);


router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const booking =
        await ParkingBooking.findById(
          req.params.id
        ).populate(
          "parkingId"
        );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      res.status(200).json({
        success: true,
        booking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);



router.put(
  "/update-time/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const booking =
        await ParkingBooking.findOne({
          _id: req.params.id,
          userId:
            req.user.userId,
        });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      booking.startTime =
        req.body.startTime;

      booking.endTime =
        req.body.endTime;

      await booking.save();

      res.status(200).json({
        success: true,
        message:
          "Booking updated",
        booking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);


router.put(
  "/cancel/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const booking =
        await ParkingBooking.findOne({
          _id: req.params.id,
          userId:
            req.user.userId,
        });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      if (
        booking.bookingStatus ===
        "Cancelled"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Already cancelled",
        });
      }

      booking.bookingStatus =
        "Cancelled";

      await booking.save();

      const parking =
        await ParkingSpace.findById(
          booking.parkingId
        );

      parking.availableSlots += 1;

      await parking.save();

      res.status(200).json({
        success: true,
        message:
          "Booking cancelled successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);


router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const booking =
        await ParkingBooking.findOne({
          _id: req.params.id,
          userId:
            req.user.userId,
        });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      await booking.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Booking deleted",
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

module.exports = router;