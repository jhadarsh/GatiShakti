const express = require("express");
const router = express.Router();

const TrafficSignal = require(
  "../models/TrafficSignal"
);

/*
=================================================
CREATE SIGNAL
=================================================
*/
router.post("/create", async (req, res) => {
  try {
    const signal = await TrafficSignal.create(req.body);

    res.status(201).json({
      success: true,
      data: signal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
=================================================
UPDATE LIVE TRAFFIC DATA
=================================================
*/
router.put("/update/:signalNumber", async (req, res) => {
  try {
    const {
      currentVehicleCount,
      currentRedLightTime,
      currentGreenLightTime,
      vehicleDensity,
      congestionLevel,
    } = req.body;

    const signal =
      await TrafficSignal.findOne({
        signalNumber: req.params.signalNumber,
      });

    if (!signal) {
      return res.status(404).json({
        success: false,
        message: "Signal not found",
      });
    }

    // Move Current -> Previous
    signal.lastVehicleCount =
      signal.currentVehicleCount;

    signal.lastRedLightTime =
      signal.currentRedLightTime;

    signal.lastGreenLightTime =
      signal.currentGreenLightTime;

    // Update Current Values
    signal.currentVehicleCount =
      currentVehicleCount;

    signal.currentRedLightTime =
      currentRedLightTime;

    signal.currentGreenLightTime =
      currentGreenLightTime;

    signal.vehicleDensity =
      vehicleDensity;

    signal.congestionLevel =
      congestionLevel;

    await signal.save();

    res.json({
      success: true,
      data: signal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
=================================================
GET ALL SIGNALS BY ROAD NAME
=================================================
*/
router.get("/road/:roadName", async (req, res) => {
  try {
    const signals =
      await TrafficSignal.find({
        roadName: req.params.roadName,
      });

    res.json({
      success: true,
      count: signals.length,
      data: signals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;