const express = require("express");
const multer = require("multer");
const router = express.Router();
const Complaint = require("../models/Complaint");

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//ALL complaint 
router.get("/all", async (req, res) => {
  try {
    // You can filter only active ones if you want
    // Example: { status: { $ne: "Resolved" } } to hide resolved ones
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Complaint (User Side)
router.post("/report", upload.array("images"), async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    console.log("Incoming files:", req.files);

    const { name, contact, category, description, location } = req.body;

    const images = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

    const complaint = new Complaint({
      name,
      contact,
      category,
      description,
      location,
      images,
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (err) {
    console.error("Error saving complaint:", err.message);
    res.status(400).json({ error: err.message });
  }
});




module.exports = router;
