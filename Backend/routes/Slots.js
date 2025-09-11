const express = require("express");
const router = express.Router();
const Slot = require("../models/SlotSchema");
const Driver = require("../models/DriverSchema");
const Booking = require("../models/BookSchema"); // <-- import booking schema

// ---------------------- GET slots for a station ----------------------
router.get("/:stationName", async (req, res) => {
  try {
    const { stationName } = req.params;

    // Fetch slots from DB (case insensitive match)
    const slots = await Slot.find({
      stationName: { $regex: new RegExp(`^${stationName}$`, "i") },
    })
      .populate("bookedBy", "name vehicleNo")
      .sort({ rowNumber: 1, position: 1 });

    if (!slots || slots.length === 0) {
      return res.status(404).json({
        message: `No slots found for station: ${stationName}`,
      });
    }

    // Group by row
    const rows = slots.reduce((acc, slot) => {
      if (!acc[slot.rowNumber]) acc[slot.rowNumber] = [];
      acc[slot.rowNumber].push({
        id: slot._id,
        position: slot.position,
        isBooked: slot.isBooked,
        bookedBy: slot.bookedBy || null, // null if not booked
      });
      return acc;
    }, {});

    res.json({
      station: stationName,
      totalRows: Object.keys(rows).length,
      rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching slots",
      error: error.message,
    });
  }
});

// ---------------------- POST book a slot ----------------------
router.post("/:slotId/book", async (req, res) => {
  const { slotId } = req.params;
  const { name, phone, licenseNo, vehicleNo } = req.body;

  if (!name || !phone || !licenseNo || !vehicleNo) {
    return res.status(400).json({ message: "All driver fields are required." });
  }

  try {
    // 1. Find slot
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found." });
    if (slot.isBooked) return res.status(400).json({ message: "Slot already booked." });

    // 2. Find or create driver (by unique licenseNo)
    let driver = await Driver.findOne({ licenseNo });
    if (!driver) {
      driver = new Driver({ name, phone, licenseNo, vehicleNo });
      await driver.save();
    } else {
      driver.name = name;
      driver.phone = phone;
      driver.vehicleNo = vehicleNo;
      await driver.save();
    }

    // 3. Create booking entry
    const booking = new Booking({
      driverId: driver._id,
      slotId: slot._id,
      status: "booked",
      bookedAt: new Date(),
    });
    await booking.save();

    // 4. Update slot
    slot.bookedBy = driver._id;
    slot.isBooked = true;
    slot.bookedAt = new Date();
    await slot.save();

    // 5. Return proper slot + station info
    res.status(200).json({
      message: "Slot booked successfully",
      slot: {
        id: slot._id,
        stationName: slot.stationName,
        rowNumber: slot.rowNumber,
        position: slot.position,
      },
      driver: {
        id: driver._id,
        name: driver.name,
        phone: driver.phone,
        vehicleNo: driver.vehicleNo,
      },
      bookingId: booking._id,
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

router.get("/stations/:stationName/bookings", async (req, res) => {
  try {
    const { stationName } = req.params;

    const bookings = await Booking.find()
      .populate({
        path: "slotId",
        match: { stationName },
        select: "rowNumber position stationName"
      })
      .populate({
        path: "driverId",
        select: "name phone vehicleNo"
      })
      .sort({ bookedAt: -1 });

    const filtered = bookings.filter(b => b.slotId);

    res.json(filtered);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
