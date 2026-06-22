const express = require("express");
const router = express.Router();

const ParkingSpace = require("../models/ParkingSpace");
const User = require("../models/User");

const upload = require("../middleware/cloudinaryUpload");
const authMiddleware = require("../middleware/authMiddleware");


// ============================
// Create Parking
// ============================
router.post(
  "/add",
  authMiddleware,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const admin = await User.findById(
        req.user.userId
      );

      if (!admin || !admin.isAdmin) {
        return res.status(403).json({
          success: false,
          message:
            "Only admins can create parking",
        });
      }

      const imageUrls = req.files
        ? req.files.map(
            (file) => file.path
          )
        : [];

      const parking =
        await ParkingSpace.create({
          adminId: admin._id,

          name: req.body.name,
          description:
            req.body.description,
          location:
            req.body.location,
          landmark:
            req.body.landmark,

          totalSlots:
            req.body.totalSlots,

          availableSlots:
            req.body.availableSlots,

          slotPrice:
            req.body.slotPrice,

          images: imageUrls,

          adminName:
            admin.name,

          adminContact:
            admin.phoneNumber,
        });

      res.status(201).json({
        success: true,
        message:
          "Parking created successfully",
        parking,
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


// ============================
// Get All Parking
// ============================
router.get("/all", async (req, res) => {
  try {
    const parkings =
      await ParkingSpace.find()
        .populate(
          "adminId",
          "name email phoneNumber"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: parkings.length,
      parkings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
});


// ============================
// Get My Parking
// ============================
router.get(
  "/my-parking",
  authMiddleware,
  async (req, res) => {
    try {
      const parkings =
        await ParkingSpace.find({
          adminId:
            req.user.userId,
        })
          .populate(
            "adminId",
            "name email phoneNumber"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        parkings,
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


 


// Update Parking Details
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const parking = await ParkingSpace.findById(req.params.id); // ← removed adminId filter
    if (!parking) {
      return res.status(404).json({ success: false, message: "Parking not found" });
    }
    Object.assign(parking, req.body);
    await parking.save();
    res.status(200).json({ success: true, message: "Parking updated successfully", parking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Available Slots
router.put("/update-slots/:id", authMiddleware, async (req, res) => {
  try {
    const parking = await ParkingSpace.findById(req.params.id); // ← removed adminId filter
    if (!parking) {
      return res.status(404).json({ success: false, message: "Parking not found" });
    }
    parking.availableSlots = req.body.availableSlots;
    await parking.save();
    res.status(200).json({ success: true, message: "Available slots updated", parking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Parking
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const parking = await ParkingSpace.findById(req.params.id); // ← removed adminId filter
    if (!parking) {
      return res.status(404).json({ success: false, message: "Parking not found" });
    }
    await parking.deleteOne();
    res.status(200).json({ success: true, message: "Parking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================
// Update Parking Images
// ============================
router.put(
  "/update-images/:id",
  authMiddleware,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const parking =
        await ParkingSpace.findOne({
          _id: req.params.id,
          adminId:
            req.user.userId,
        });

      if (!parking) {
        return res.status(404).json({
          success: false,
          message:
            "Parking not found",
        });
      }

      const imageUrls =
        req.files.map(
          (file) => file.path
        );

      parking.images =
        imageUrls;

      await parking.save();

      res.status(200).json({
        success: true,
        message:
          "Images updated successfully",
        parking,
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


// ============================
// Delete Parking
// ============================
// router.delete(
//   "/:id",
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const parking =
//         await ParkingSpace.findOne({
//           _id: req.params.id,
//           adminId:
//             req.user.userId,
//         });

//       if (!parking) {
//         return res.status(404).json({
//           success: false,
//           message:
//             "Parking not found",
//         });
//       }

//       await parking.deleteOne();

//       res.status(200).json({
//         success: true,
//         message:
//           "Parking deleted successfully",
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message:
//           error.message,
//       });
//     }
//   }
// );

// ============================
// Get Single Parking
// ============================
router.get("/:id", async (req, res) => {
  try {
    const parking =
      await ParkingSpace.findById(
        req.params.id
      ).populate(
        "adminId",
        "name email phoneNumber"
      );

    if (!parking) {
      return res.status(404).json({
        success: false,
        message:
          "Parking not found",
      });
    }

    res.status(200).json({
      success: true,
      parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
});

module.exports = router;