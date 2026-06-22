const express = require("express");
const router = express.Router();

const Pothole = require("../models/Pothole");
const upload = require("../middleware/cloudinaryUpload");

/*
=================================
CREATE POTHOLE
=================================
*/
router.post(
  "/create",
  upload.single("image"),
  async (req, res) => {
    try {
      const pothole = await Pothole.create({
        potholeId: req.body.potholeId,
        signalNumber: req.body.signalNumber,
        roadName: req.body.roadName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        potholeType: req.body.potholeType,

        imageUrl: req.file
          ? req.file.path
          : "",
      });

      res.status(201).json({
        success: true,
        data: pothole,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

/*
=================================
GET ALL POTHOLES
=================================
*/
router.get("/", async (req, res) => {
  try {
    const potholes = await Pothole.find()
      .populate("dispatchedBy", "name email");

    res.json({
      success: true,
      count: potholes.length,
      data: potholes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
=================================
GET SINGLE POTHOLE
=================================
*/
router.get("/:potholeId", async (req, res) => {
  try {
    const pothole = await Pothole.findOne({
      potholeId: req.params.potholeId,
    }).populate("dispatchedBy", "name email");

    if (!pothole) {
      return res.status(404).json({
        success: false,
        message: "Pothole not found",
      });
    }

    res.json({
      success: true,
      data: pothole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
=================================
GET BY ROAD NAME
=================================
*/
router.get("/road/:roadName", async (req, res) => {
  try {
    const potholes = await Pothole.find({
      roadName: req.params.roadName,
    });

    res.json({
      success: true,
      count: potholes.length,
      data: potholes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
=================================
GET BY SIGNAL NUMBER
=================================
*/
router.get("/signal/:signalNumber", async (req, res) => {
  try {
    const potholes = await Pothole.find({
      signalNumber: req.params.signalNumber,
    });

    res.json({
      success: true,
      count: potholes.length,
      data: potholes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
=================================
DISPATCH POTHOLE
=================================
*/
router.put("/dispatch/:potholeId", async (req, res) => {
  try {
    const { dispatchNote, userId } = req.body;

    const pothole = await Pothole.findOne({
      potholeId: req.params.potholeId,
    });

    if (!pothole) {
      return res.status(404).json({
        success: false,
        message: "Pothole not found",
      });
    }

    pothole.dispatched = true;
    pothole.dispatchNote = dispatchNote;
    pothole.dispatchedBy = userId;

    await pothole.save();

    res.json({
      success: true,
      message: "Pothole dispatched",
      data: pothole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
=================================
RESOLVE POTHOLE
=================================
*/
router.put("/resolve/:potholeId", async (req, res) => {
  try {
    const pothole = await Pothole.findOne({
      potholeId: req.params.potholeId,
    });

    if (!pothole) {
      return res.status(404).json({
        success: false,
        message: "Pothole not found",
      });
    }

    pothole.resolved = true;

    await pothole.save();

    res.json({
      success: true,
      message: "Pothole resolved",
      data: pothole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;