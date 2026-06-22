const nodemailer = require("nodemailer");
const path       = require("path");
const fs         = require("fs");

const otpTemplate     = require("./otpTemplate");
const welcomeTemplate = require("./welcomeTemplate");
const parkingTemplate = require("./parkingTemplate");
const { generateBookingQR } = require("./qrGenerator");

// ── preload assets as base64 once at startup ──────────────────────
const assetsDir = path.join(__dirname, "assets");

const logoBase64          = fs.readFileSync(path.join(assetsDir, "logo.png")).toString("base64");
const otpBannerBase64     = fs.readFileSync(path.join(assetsDir, "otp-banner.png")).toString("base64");
const welcomeBannerBase64 = fs.readFileSync(path.join(assetsDir, "welcome-banner.png")).toString("base64");
const parkingBannerBase64 = fs.readFileSync(path.join(assetsDir, "parking-banner.png")).toString("base64");

console.log("=== EMAIL SERVICE LOADED ===");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "NOT SET");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? `Loaded (length: ${process.env.EMAIL_PASS.length})` : "NOT SET");
console.log("Assets loaded — logo, otp-banner, welcome-banner, parking-banner ✓");

// ── transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   "smtp.gmail.com",
  port:   587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

transporter.verify((err) => {
  if (err) {
    console.error("=== TRANSPORT VERIFY FAILED ===");
    console.error("Code:", err.code, "| Message:", err.message);
  } else {
    console.log("=== MAIL SERVER READY ✓ ===");
  }
});

// ── OTP email ─────────────────────────────────────────────────────
const sendOTPEmail = async (email, name, otp) => {
  console.log("=== sendOTPEmail CALLED ===", { email, name, otp });
  try {
    const info = await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: "Verify Email | GatiShakti",
      html:    otpTemplate(name, otp, logoBase64, otpBannerBase64),
    });
    console.log("=== OTP EMAIL SENT ✓ ===", info.messageId);
    return info;
  } catch (error) {
    console.error("=== OTP EMAIL FAILED ===", error.code, error.message);
  }
};

// ── welcome email ─────────────────────────────────────────────────
const sendWelcomeEmail = async (email, name) => {
  console.log("=== sendWelcomeEmail CALLED ===", { email, name });
  try {
    const info = await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: "Welcome To GatiShakti 🎉",
      html:    welcomeTemplate(name, logoBase64, welcomeBannerBase64),
    });
    console.log("=== WELCOME EMAIL SENT ✓ ===", info.messageId);
    return info;
  } catch (error) {
    console.error("=== WELCOME EMAIL FAILED ===", error.code, error.message);
  }
};

// ── parking booking email ─────────────────────────────────────────
const sendParkingBookingEmail = async (
  email, name, parkingName, vehicleNumber, bookingDate, startTime, endTime
) => {
  console.log("=== sendParkingBookingEmail CALLED ===", { email, name, parkingName });
  try {
    const qrBuffer  = await generateBookingQR({ name, parkingName, vehicleNumber, bookingDate, startTime, endTime });
    const qrBase64  = qrBuffer.toString("base64");
    console.log("QR generated, size:", qrBuffer.length, "bytes ✓");

    const info = await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: "Parking Booking Confirmed | GatiShakti",
      html:    parkingTemplate(name, parkingName, vehicleNumber, bookingDate, startTime, endTime, logoBase64, parkingBannerBase64, qrBase64),
    });
    console.log("=== PARKING EMAIL SENT ✓ ===", info.messageId);
    return info;
  } catch (error) {
    console.error("=== PARKING EMAIL FAILED ===", error.code, error.message);
  }
};

module.exports = { sendOTPEmail, sendWelcomeEmail, sendParkingBookingEmail };