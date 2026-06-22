const nodemailer = require("nodemailer");
const path       = require("path");

const otpTemplate     = require("./otpTemplate");
const welcomeTemplate = require("./welcomeTemplate");
const parkingTemplate = require("./parkingTemplate");
const { generateBookingQR } = require("./qrGenerator");

// ── debug ─────────────────────────────────────────────────────────
console.log("=== EMAIL SERVICE LOADED ===");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "NOT SET");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? `Loaded (length: ${process.env.EMAIL_PASS.length})` : "NOT SET");

// ── transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("=== TRANSPORT VERIFY FAILED ===");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
    console.error("Full Error:", err);
  } else {
    console.log("=== MAIL SERVER READY ✓ ===");
  }
});

// ── inline attachment helper ──────────────────────────────────────
const getAttachments = (banner) => {
  const logoPath   = path.join(__dirname, "assets", "logo.png");
  const bannerPath = path.join(__dirname, "assets", banner);

  console.log("Attachment paths:");
  console.log("  logo  →", logoPath);
  console.log("  banner →", bannerPath);

  // Check if files actually exist
  const fs = require("fs");
  console.log("  logo exists?  ", fs.existsSync(logoPath));
  console.log("  banner exists?", fs.existsSync(bannerPath));

  return [
    {
      filename:           "logo.png",
      path:               logoPath,
      cid:                "logo",
      contentType:        "image/png",
      contentDisposition: "inline",
    },
    {
      filename:           banner,
      path:               bannerPath,
      cid:                "banner",
      contentType:        "image/png",
      contentDisposition: "inline",
    },
  ];
};

// ── OTP email ─────────────────────────────────────────────────────
const sendOTPEmail = async (email, name, otp) => {
  console.log("=== sendOTPEmail CALLED ===");
  console.log("  To     :", email);
  console.log("  Name   :", name);
  console.log("  OTP    :", otp);

  try {
    console.log("  Building OTP template...");
    const html = otpTemplate(name, otp);
    console.log("  Template built, length:", html?.length);

    console.log("  Getting attachments...");
    const attachments = getAttachments("otp-banner.png");

    console.log("  Calling transporter.sendMail...");
    const info = await transporter.sendMail({
      from:        process.env.EMAIL_USER,
      to:          email,
      subject:     "Verify Email | GatiShakti",
      html,
      attachments,
    });

    console.log("=== OTP EMAIL SENT ✓ ===");
    console.log("  messageId:", info.messageId);
    console.log("  response :", info.response);
    return info;
  } catch (error) {
    console.error("=== OTP EMAIL FAILED ===");
    console.error("  Code   :", error.code);
    console.error("  Message:", error.message);
    console.error("  Full   :", error);
  }
};

// ── welcome email ─────────────────────────────────────────────────
const sendWelcomeEmail = async (email, name) => {
  console.log("=== sendWelcomeEmail CALLED ===");
  console.log("  To  :", email);
  console.log("  Name:", name);

  try {
    console.log("  Building welcome template...");
    const html = welcomeTemplate(name);
    console.log("  Template built, length:", html?.length);

    console.log("  Getting attachments...");
    const attachments = getAttachments("welcome-banner.png");

    console.log("  Calling transporter.sendMail...");
    const info = await transporter.sendMail({
      from:        process.env.EMAIL_USER,
      to:          email,
      subject:     "Welcome To GatiShakti 🎉",
      html,
      attachments,
    });

    console.log("=== WELCOME EMAIL SENT ✓ ===");
    console.log("  messageId:", info.messageId);
    console.log("  response :", info.response);
    return info;
  } catch (error) {
    console.error("=== WELCOME EMAIL FAILED ===");
    console.error("  Code   :", error.code);
    console.error("  Message:", error.message);
    console.error("  Full   :", error);
  }
};

// ── parking booking email ─────────────────────────────────────────
const sendParkingBookingEmail = async (
  email, name, parkingName, vehicleNumber, bookingDate, startTime, endTime
) => {
  console.log("=== sendParkingBookingEmail CALLED ===");
  console.log("  To            :", email);
  console.log("  Name          :", name);
  console.log("  Parking       :", parkingName);
  console.log("  Vehicle       :", vehicleNumber);
  console.log("  Date          :", bookingDate);
  console.log("  Start → End   :", startTime, "→", endTime);

  try {
    console.log("  Generating QR code...");
    const qrBuffer = await generateBookingQR({
      name, parkingName, vehicleNumber, bookingDate, startTime, endTime,
    });
    console.log("  QR generated, buffer size:", qrBuffer?.length, "bytes");

    console.log("  Building parking template...");
    const html = parkingTemplate(
      name, parkingName, vehicleNumber,
      bookingDate, startTime, endTime,
      "cid:qrcode"
    );
    console.log("  Template built, length:", html?.length);

    console.log("  Getting attachments...");
    const attachments = [
      ...getAttachments("parking-banner.png"),
      {
        filename:           "qrcode.png",
        content:            qrBuffer,
        contentType:        "image/png",
        cid:                "qrcode",
        contentDisposition: "inline",
      },
    ];
    console.log("  Total attachments:", attachments.length);

    console.log("  Calling transporter.sendMail...");
    const info = await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: "Parking Booking Confirmed | GatiShakti",
      html,
      attachments,
    });

    console.log("=== PARKING EMAIL SENT ✓ ===");
    console.log("  messageId:", info.messageId);
    console.log("  response :", info.response);
    return info;
  } catch (error) {
    console.error("=== PARKING EMAIL FAILED ===");
    console.error("  Code   :", error.code);
    console.error("  Message:", error.message);
    console.error("  Full   :", error);
  }
};

// ── exports ───────────────────────────────────────────────────────
module.exports = { sendOTPEmail, sendWelcomeEmail, sendParkingBookingEmail };