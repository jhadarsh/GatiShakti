const QRCode = require("qrcode");

/**
 * Generate QR Code for Parking Booking
 * FIX: Returns a raw Buffer (PNG bytes) instead of a base64 data URL.
 * Gmail strips data: URLs from <img> tags — a Buffer sent as a CID
 * attachment is the only way to embed a generated image in Gmail.
 *
 * @param {Object} booking
 * @returns {Promise<Buffer>}
 */
const generateBookingQR = async (booking) => {
  try {
    const qrData = {
      name:          booking.name,
      vehicleNumber: booking.vehicleNumber,
      parkingName:   booking.parkingName,
      bookingDate:   booking.bookingDate,
      startTime:     booking.startTime,
      endTime:       booking.endTime,
    };

    // toBuffer() returns raw PNG bytes — no data: prefix, no base64 string
    const qrBuffer = await QRCode.toBuffer(
      JSON.stringify(qrData),
      {
        errorCorrectionLevel: "H",
        type:                 "png",
        width:                300,
        margin:               2,
        color: {
          dark:  "#000000",
          light: "#FFFFFF",
        },
      }
    );

    return qrBuffer; // Buffer, not string

  } catch (error) {
    console.error("QR Generation Error:", error);
    throw error;
  }
};

module.exports = { generateBookingQR };