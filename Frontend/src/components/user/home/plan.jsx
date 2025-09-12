// TripPlanner.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ExploreResults from "./Explore"; // <-- Import modal

const TripPlanner = () => {
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true); // show the graphs modal
  };

  return (
    <section className="min-h-[500px] bg-gradient-to-r from-[#736278] via-[#3730a3] to-[#10b981]  flex items-center justify-center px-4 py-12 gap-12 ">
      {/* Left Panel */}
      <div
        className="w-full max-w-md h-full rounded-tr-[60px] rounded-br-[60px] p-10 flex flex-col gap-6  text-white shadow-lg"
        style={{ minHeight: "500px" }}
      >
        <h2 className="text-4xl font-extrabold drop-shadow-lg">Plan Your Journey</h2>
        <p className="text-xl font-semibold drop-shadow-md">In Minutes</p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Start Location"
            className="rounded-md px-4 py-3 font-semibold bg-transparent border border-white text-white placeholder-white"
          />
          <input
            type="text"
            placeholder="Destination"
            className="rounded-md px-4 py-3 font-semibold bg-transparent border border-white text-white placeholder-white"
          />
          <input
            type="date"
            className="rounded-md px-4 py-3 font-semibold bg-transparent border border-white text-white placeholder-white"
          />
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="12"
              placeholder="Hour"
              className="flex-1 rounded-md px-4 py-3 font-semibold bg-transparent border border-white text-white placeholder-white"
            />
            <input
              type="number"
              min="0"
              max="59"
              placeholder="Min"
              className="flex-1 rounded-md px-4 py-3 font-semibold bg-transparent border border-white text-white placeholder-white"
            />
            <select
              className="flex-1 rounded-md px-4 py-3 font-semibold bg-transparent border border-white text-white"
              defaultValue="PM"
            >
              <option className="bg-[#351462]">AM</option>
              <option className="bg-[#351462]">PM</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-white font-semibold text-sm">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-white checked:bg-[#bb86fc] checked:border-[#bb86fc]"
            />
            Accessible Trip
          </label>

          <button
            type="submit"
            className="mt-4 bg-white text-[#351462] font-bold py-3 rounded-full hover:bg-[#bb86fc] hover:text-white transition-colors shadow-lg"
          >
            Explore My Trip
          </button>
        </form>
      </div>

      {/* Right Panel Map */}
      <div
        className="flex-1 max-w-[700px] rounded-xl overflow-hidden shadow-xl border border-gray-700 z-10"
        style={{ height: "500px" }}
      >
        <MapContainer
          center={[28.5245, 77.2066]}
          zoom={4}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <Marker position={[28.5245, 77.2066]}>
  <Popup>Saket, New Delhi</Popup>
</Marker>

        </MapContainer>
      </div>

      {/* Results Modal */}
      {showResults && <ExploreResults onClose={() => setShowResults(false)} />}
    </section>
  );
};

export default TripPlanner;
