const nodemailer = require("nodemailer");
const path       = require("path");

const otpTemplate     = require("./otpTemplate");
const welcomeTemplate = require("./welcomeTemplate");
const parkingTemplate = require("./parkingTemplate");
const { generateBookingQR } = require("./qrGenerator");

 
// ── debug ─────────────────────────────────────────────────────────
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");
 
// ── transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
 
transporter.verify((err) => {
  if (err) console.log("Transport Verify Error:", err);
  else     console.log("Mail Server Ready");
});
 
// ── inline attachment helper ──────────────────────────────────────
// Uses 'path' instead of 'content' so nodemailer reads the file itself.
// contentType must be set explicitly — without it some clients treat
// the attachment as application/octet-stream and show it in the tray.
const getAttachments = (banner) => [
  {
    filename:           "logo.png",
    path:               path.join(__dirname, "assets", "logo.png"),
    cid:                "logo",
    contentType:        "image/png",
    contentDisposition: "inline",
  },
  {
    filename:           banner,
    path:               path.join(__dirname, "assets", banner),
    cid:                "banner",
    contentType:        "image/png",
    contentDisposition: "inline",
  },
];
 
// ── OTP email ─────────────────────────────────────────────────────
const sendOTPEmail = async (email, name, otp) => {
  console.log("Sending OTP To:", email);
  try {
    const info = await transporter.sendMail({
      from:        process.env.EMAIL_USER,
      to:          email,
      subject:     "Verify Email | GatiShakti",
      html:        otpTemplate(name, otp),
      attachments: getAttachments("otp-banner.png"),
    });
    console.log("OTP Sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("OTP Email Error:", error);
  }
};
 
// ── welcome email ─────────────────────────────────────────────────
const sendWelcomeEmail = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from:        process.env.EMAIL_USER,
      to:          email,
      subject:     "Welcome To GatiShakti 🎉",
      html:        welcomeTemplate(name),
      attachments: getAttachments("welcome-banner.png"),
    });
    console.log("Welcome Sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("Welcome Email Error:", error);
  }
};
 
// ── parking booking email ─────────────────────────────────────────
const sendParkingBookingEmail = async (
  email, name, parkingName, vehicleNumber, bookingDate, startTime, endTime
) => {
  try {
    // qrGenerator now returns a Buffer via QRCode.toBuffer()
    const qrBuffer = await generateBookingQR({
      name, parkingName, vehicleNumber, bookingDate, startTime, endTime,
    });
 
    const info = await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: "Parking Booking Confirmed | GatiShakti",
 
      // Template renders: <img src="cid:qrcode" />
      html: parkingTemplate(
        name, parkingName, vehicleNumber,
        bookingDate, startTime, endTime,
        "cid:qrcode"
      ),
 
      attachments: [
        // logo + parking banner — inline, render inside body
        ...getAttachments("parking-banner.png"),
 
        // QR code — Buffer, NO encoding field (nodemailer handles Buffer natively)
        // Setting encoding:"base64" on a Buffer double-encodes it — leave it out
        {
          filename:           "qrcode.png",
          content:            qrBuffer,   // Buffer — nodemailer sends as-is
          contentType:        "image/png",
          cid:                "qrcode",
          contentDisposition: "inline",
        },
      ],
    });
 
    console.log("Parking Mail Sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("Parking Email Error:", error);
  }
};
 
// ── exports ───────────────────────────────────────────────────────
module.exports = { sendOTPEmail, sendWelcomeEmail, sendParkingBookingEmail };
 