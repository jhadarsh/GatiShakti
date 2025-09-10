import React, { useEffect, useState } from "react";

const PreviousBookings = ({ stationName }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!stationName) return;

    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`http://localhost:8080/api/slots/stations/${encodeURIComponent(stationName)}/bookings`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        console.log(data);
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Could not load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [stationName]);

  return (
    <div className="p-6 mt-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">
        Previous Bookings – {stationName}
      </h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-center text-gray-500">No previous bookings found.</p>
      )}

      {bookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3 border">Driver</th>
                <th className="p-3 border">Vehicle No</th>
                <th className="p-3 border">Row</th>
                <th className="p-3 border">Position</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="text-sm hover:bg-gray-50">
                  <td className="p-3 border">{b.driverId?.name || "Unknown"}</td>
                  <td className="p-3 border">{b.driverId?.vehicleNo || "-"}</td>
                  <td className="p-3 border">{b.slotId?.rowNumber}</td>
                  <td className="p-3 border">{b.slotId?.position}</td>
                  <td className="p-3 border capitalize">{b.status}</td>
                  <td className="p-3 border">
                    {new Date(b.bookedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PreviousBookings;
