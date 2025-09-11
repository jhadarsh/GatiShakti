require("dotenv").config();

const express = require("express");
const mongoose =require("mongoose");
const slotRoutes = require("./routes/Slots");
const adminRoutes = require("./routes/admin");
const ReportRoute = require("./routes/Reporting");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT;
const url = process.env.MONGO_URL;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("connection established"))
.catch((err) => console.log(err));

// Routes
app.use("/api/slots", slotRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/reporting",ReportRoute);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
