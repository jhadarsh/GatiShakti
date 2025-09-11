import React, { useState } from "react";
import axios from "axios";

const AdminStationSlots = () => {
  const [stationName, setStationName] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states for creating a slot
  const [rowNumber, setRowNumber] = useState("");
  const [position, setPosition] = useState("");

  // Search slots by station
  const handleSearch = async () => {
    if (!stationName) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/admin/slots/${stationName}`
      );
      setSlots(res.data.slots);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  // Free slot
  const handleFree = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/free/${id}`);
      handleSearch(); // refresh
    } catch (error) {
      console.error("Error freeing slot:", error);
    }
  };

  // Delete slot
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/delete/${id}`);
      handleSearch(); // refresh
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  // Create slot
  const handleCreate = async () => {
    if (!stationName || !rowNumber || !position) {
      alert("Please enter all fields!");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/admin/slots`, {
        stationName,
        rowNumber,
        position,
      });
      setRowNumber("");
      setPosition("");
      handleSearch(); // refresh
    } catch (error) {
      console.error("Error creating slot:", error);
      alert("Error creating slot");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Slot Management</h1>

      {/* Search bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Station Name"
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Create Slot Form */}
      {stationName && (
        <div className="mb-6 flex gap-2 items-center">
          <input
            type="number"
            placeholder="Gate Number"
            value={rowNumber}
            onChange={(e) => setRowNumber(e.target.value)}
            className="p-2 border rounded w-32"
          />
          <input
            type="number"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="p-2 border rounded w-32"
          />
          <button
            onClick={handleCreate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Slot
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading slots...</p>}

      {/* Results */}
      {slots.length > 0 && (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Gate</th>
              <th className="p-2 border">Position</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Driver</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id}>
                <td className="p-2 border">{slot.rowNumber}</td>
                <td className="p-2 border">{slot.position}</td>
                <td className="p-2 border">
                  {slot.isBooked ? "Booked" : "Available"}
                </td>
                <td className="p-2 border">{slot.bookedBy?.name || "-"}</td>
                <td className="p-2 border flex gap-2">
                  {slot.isBooked && (
                    <button
                      onClick={() => handleFree(slot._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Free
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(slot._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && slots.length === 0 && stationName && (
        <p className="text-red-500">No slots found for this station.</p>
      )}
    </div>
  );
};

export default AdminStationSlots;
