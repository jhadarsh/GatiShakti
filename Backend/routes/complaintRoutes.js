const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");
const User = require("../models/User");

const upload = require("../middleware/cloudinaryUpload");
const authMiddleware = require("../middleware/authMiddleware");


// ============================
// Add Complaint
// ============================
router.post(
  "/add",
  authMiddleware,
  upload.array("images", 5),
  async (req, res) => {
    try {

      console.log("BODY =>", req.body);
      console.log("USER =>", req.user);
      const imageUrls = req.files
        ? req.files.map((file) => file.path)
        : [];

      const complaint = await Complaint.create({
        userId: req.user.userId,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        images: imageUrls,
      });

      res.status(201).json({
        success: true,
        message: "Complaint added successfully",
        complaint,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// ============================
// Get All Complaints
// ============================
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email phoneNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ============================
// Get Logged In User Complaints
// ============================
router.get("/user/my-complaints", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.userId,
    })
      .populate("userId", "name email phoneNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


 


 

// ============================
// Upvote Complaint
// ============================
router.post("/upvote/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    const alreadyUpvoted = complaint.upvotedBy.some(
      (user) => user.toString() === req.user.userId
    );

    if (alreadyUpvoted) {
      return res.status(400).json({
        success: false,
        message: "Already upvoted",
      });
    }

    complaint.upvotedBy.push(req.user.userId);
    complaint.upvotes = complaint.upvotedBy.length;

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Upvote added",
      upvotes: complaint.upvotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ============================
// Remove Upvote
// ============================
router.post("/remove-upvote/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.upvotedBy = complaint.upvotedBy.filter(
      (user) => user.toString() !== req.user.userId
    );

    complaint.upvotes = complaint.upvotedBy.length;

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Upvote removed",
      upvotes: complaint.upvotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ============================
// Mark Complaint Resolved
// ============================
router.put("/resolve/:id", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findById(req.user.userId);

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin can resolve complaints",
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.status = "Resolved";
    complaint.resolutionComment = req.body.comment;
    complaint.resolvedBy = admin.name;
    complaint.resolvedAt = new Date();

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint resolved successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ============================
// Mark In Progress
// ============================
router.put("/in-progress/:id", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findById(req.user.userId);

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin can update complaints",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status: "In Progress",
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Complaint marked as In Progress",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ============================
// Delete Complaint
// ============================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (
      complaint.userId.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================
// Get Single Complaint
// ============================
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("userId", "name email phoneNumber");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;