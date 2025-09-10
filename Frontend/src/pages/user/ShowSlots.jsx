import React, { useEffect, useState } from "react";
import { FaShuttleVan } from "react-icons/fa";
import BookingModal from "./Booking";
import PreviousBookings from "../../components/user/Slots/PreviousBookings";

const StationDashboard = () => {
  const [stationName, setStationName] = useState("");
  const [currentStation, setCurrentStation] = useState("Rajiv Chowk");
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Fetch slots when station changes
  useEffect(() => {
    if (!currentStation) return;
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const encodedStation = encodeURIComponent(currentStation);
        const res = await fetch(
          `http://localhost:8080/api/slots/${encodedStation}`
        );
        if (!res.ok) throw new Error("Failed to fetch slots");
        const data = await res.json();
        setStationData(data);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setStationData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [currentStation]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Enter station name..."
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <button
          onClick={() => setCurrentStation(stationName.trim())}
          disabled={!stationName.trim()}
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
        >
          Search Station
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Slots grid */}
        {!loading && stationData && (
          <div className="p-6 bg-white rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
            <h1 className="text-2xl font-bold mb-8 text-center text-blue-700">
              {stationData.station} – Rickshaw Queue
            </h1>

            <div className="space-y-8">
              {Object.keys(stationData.rows).map((row) => (
                <div key={row}>
                  <div className="mb-3 text-sm font-semibold text-gray-600">
                    Row {row}
                  </div>
                  <div className="flex gap-6 flex-wrap">
                    {stationData.rows[row].map((slot) => (
                      <div key={slot.id} className="flex flex-col items-center">
                        <button
                          onClick={() => !slot.isBooked && setSelectedSlot(slot)}
                          disabled={slot.isBooked}
                          className="focus:outline-none"
                        >
                          <FaShuttleVan
                            className={`text-4xl ${
                              slot.isBooked
                                ? "text-blue-600"
                                : "text-gray-300 hover:text-green-500"
                            }`}
                            title={`Pos ${slot.position}`}
                          />
                        </button>
                        <div className="text-xs mt-1 text-gray-500 text-center">
                          {slot.isBooked
                            ? `${slot.bookedBy?.name} (${slot.bookedBy?.vehicleNo})`
                            : "Available"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previous bookings */}
        {currentStation && (
          <div className="p-6 bg-white rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-8 text-center text-indigo-700">
              Previous Bookings
            </h2>
            <PreviousBookings stationName={currentStation} />
          </div>
        )}
      </div>

      {/* Booking modal */}
      {selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onBooked={() => setCurrentStation(currentStation)} // refresh
        />
      )}

      {/* Not found */}
      {!loading && currentStation && !stationData && (
        <p className="text-center text-red-500 mt-10">
          No data found for "{currentStation}".
        </p>
      )}
    </div>
  );
};

export default StationDashboard;
