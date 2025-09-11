import React, { useState } from "react";
import jsPDF from "jspdf";

const BookingModal = ({ slot, onClose, onBooked }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate PDF receipt
  const generateReceipt = ({
    stationName,
    rowNumber,
    position,
    name,
    phone,
    licenseNo,
    vehicleNo,
    bookedAt,
  }) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Metro Slot Booking Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Station: ${stationName}`, 20, 40);
    doc.text(`Row Number: ${rowNumber}`, 20, 50);
    doc.text(`Position: ${position}`, 20, 60);
    doc.text(`Driver Name: ${name}`, 20, 70);
    doc.text(`Vehicle No: ${vehicleNo}`, 20, 80);
    doc.text(`Phone: ${phone}`, 20, 90);
    doc.text(`License No: ${licenseNo}`, 20, 100);
    doc.text(`Booked At: ${bookedAt}`, 20, 110);

    doc.text("Thank you for booking!", 20, 130);

    doc.save(`Booking_Receipt_${vehicleNo}.pdf`);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/slots/${slot.id}/book`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, licenseNo, vehicleNo }),
        }
      );

      if (res.ok) {
        const data = await res.json(); // ✅ backend response

        // Generate receipt with API response
        generateReceipt({
          stationName: data.slot.stationName,
          rowNumber: data.slot.rowNumber,
          position: data.slot.position,
          name: data.driver.name,
          phone: data.driver.phone,
          licenseNo: data.driver.licenseNo,
          vehicleNo: data.driver.vehicleNo,
          bookedAt: new Date().toLocaleString(),
        });

        onClose();
        onBooked();
      } else {
        const err = await res.json();
        alert(err.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error booking slot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Book Slot</h2>
        <form onSubmit={handleBooking}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Driver Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">License No</label>
            <input
              type="text"
              value={licenseNo}
              onChange={(e) => setLicenseNo(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Vehicle No</label>
            <input
              type="text"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Booking..." : "Book Slot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
