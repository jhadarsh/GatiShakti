    // routes/admin.js
    const express = require("express");
    const router = express.Router();
    const Slot = require("../models/SlotSchema");
    const Complaint = require("../models/Complaint");

    router.post("/slots", async (req, res) => {
    try {
        const { stationName, rowNumber, position } = req.body;

        if (!stationName || !rowNumber || !position) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const exists = await Slot.findOne({ stationName, rowNumber, position });
        if (exists) {
        return res.status(400).json({ message: "Slot already exists" });
        }

        const newSlot = new Slot({ stationName, rowNumber, position });
        await newSlot.save();

        res.status(201).json({
        message: "Slot created successfully",
        slot: newSlot,
        });
    } catch (error) {
        console.error("Error creating slot:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    });


    // ---------------------- ADMIN: Get all slots ----------------------
    router.get("/slots/:stationName", async (req, res) => {
    try {
        const { stationName } = req.params;

        const slots = await Slot.find({ stationName })
        .populate("bookedBy", "name phone vehicleNo status");

        if (!slots.length) {
        return res.status(404).json({ message: "No slots found for this station" });
        }

        res.status(200).json({
        message: "Slots fetched successfully",
        total: slots.length,
        slots,
        });
    } catch (error) {
        console.error("Error fetching slots by station:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    });

    // ---------------------- ADMIN: Create a new slot ----------------------
    router.post("/create", async (req, res) => {
    try {
        const { stationName, rowNumber, position } = req.body;

        if (!stationName || !rowNumber || !position) {
        return res.status(400).json({ message: "All fields are required" });
        }

        // Prevent duplicate slots in same station/row/position
        const exists = await Slot.findOne({ stationName, rowNumber, position });
        if (exists) {
        return res.status(400).json({ message: "Slot already exists" });
        }

        const newSlot = new Slot({ stationName, rowNumber, position });
        await newSlot.save();

        res.status(201).json({
        message: "Slot created successfully",
        slot: newSlot,
        });
    } catch (error) {
        console.error("Error creating slot:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    });

    // ---------------------- ADMIN: Delete a slot ----------------------
    router.delete("/delete/:slotId", async (req, res) => {
    try {
        const { slotId } = req.params;

        // Find slot first
        const slot = await Slot.findById(slotId);
        if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
        }

        const { stationName, rowNumber, position } = slot;

        // Delete the slot
        await Slot.findByIdAndDelete(slotId);

        // Shift positions of remaining slots in this station & row
        await Slot.updateMany(
        {
            stationName,
            rowNumber,
            position: { $gt: position }, // only slots after the deleted one
        },
        { $inc: { position: -1 } } // shift position up by 1
        );

        res.status(200).json({
        message: `Slot at position ${position} deleted and positions re-ordered`,
        });
    } catch (error) {
        console.error("Error deleting slot:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    });

    // ---------------------- ADMIN: Free up a booked slot ----------------------
    // ---------------------- ADMIN: Free up a booked slot (queue-style) ----------------------
    router.put("/free/:slotId", async (req, res) => {
    try {
        const { slotId } = req.params;

        const slot = await Slot.findById(slotId);
        if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
        }

        const { stationName, rowNumber, position } = slot;

        // Step 1: Delete the booked slot completely
        await Slot.findByIdAndDelete(slotId);

        // Step 2: Shift remaining slots forward
        await Slot.updateMany(
        {
            stationName,
            rowNumber,
            position: { $gt: position },
        },
        { $inc: { position: -1 } }
        );

        // Step 3: Find new max position after shift
        const lastSlot = await Slot.findOne({ stationName, rowNumber })
        .sort({ position: -1 })
        .exec();

        const newPosition = lastSlot ? lastSlot.position + 1 : 1;

        // Step 4: Add a new available slot at the end
        const newSlot = new Slot({
        stationName,
        rowNumber,
        position: newPosition,
        isBooked: false,
        });
        await newSlot.save();

        res.status(200).json({
        message: `Booked slot freed, queue re-ordered, new slot created at position ${newPosition}`,
        newSlot,
        });
    } catch (error) {
        console.error("Error freeing slot:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    });

    
    //Reporting Admin Routes
    // 1. Get all complaints (Admin view)
router.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Update complaint status
router.put("/complaints/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Delete a complaint
router.delete("/complaints/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

    module.exports = router;
