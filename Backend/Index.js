const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const potholeRoutes = require("./routes/potholeRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const parkingBookingRoutes = require("./routes/parkingBookingRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const app = express();

app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        "http://localhost:5173"
    ],
    credentials: true
}));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/traffic",trafficRoutes);
app.use("/api/potholes",potholeRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/parking",parkingRoutes);
app.use("/api/parking-Booking",parkingBookingRoutes);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>{
    console.log("Mongodb conected to server you are good to go");
  })
  .catch((err)=>{
    console.log("Database Conection error");
    console.error("MongoDB connection error :" , err.message);
  });

app.get("/health" , (req , res) => {
  res.json({
    success : true,
    message :"server is running properly",
  });
});

// Ping server every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  try {
    const response = await axios.get(
      "https://gatishakti-backend.onrender.com/health"
    );

    console.log(
      `[CRON] Ping successful at ${new Date().toLocaleString()}`
    );
  } catch (err) {
    console.error(
      `[CRON] Ping failed: ${err.message}`
    );
  }
});

 

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
  console.log("Server is Running On PORT : " , PORT);
})
