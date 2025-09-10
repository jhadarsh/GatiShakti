import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const TripPlanner = () => {
  return (
    <section className=" min-h-[500px] bg-gradient-to-br from-slate-900 via-indigo-800 to-emerald-500 rounded-4xl mt-5 flex items-center justify-center px-4 py-12 gap-12 mr-4 ml-4 mb-4">
      {/* Left Panel */}
      <div
        className="w-full max-w-md h-full rounded-tr-[60px] rounded-br-[60px] p-10 flex flex-col gap-6  text-white shadow-lg"
        style={{ minHeight: "500px" }}
      >
        <h2 className="text-4xl font-extrabold drop-shadow-lg">Plan Your Journey</h2>
        <p className="text-xl font-semibold drop-shadow-md">In Minutes</p>

        <form className="flex flex-col gap-5">
          {/* Start Location */}
          <input
            type="text"
            placeholder="Start Location"
            className="rounded-md px-4 py-3 font-semibold bg-transparent border border-white text-white placeholder-white"
          />
          {/* Destination */}
          <input
            type="text"
            placeholder="Destination"
            className="rounded-md px-4 py-3 font-semibold bg-transparent border border-white text-white placeholder-white"
          />

          {/* Departure Options */}
         

          {/* Date and Time */}
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

          {/* Accessible Trip */}
          <label className="flex items-center gap-2 text-white font-semibold text-sm">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-white checked:bg-[#bb86fc] checked:border-[#bb86fc]"
            />
            Accessible Trip
          </label>

          {/* Explore Button */}
          <button
            type="submit"
            className="mt-4 bg-white text-[#351462] font-bold py-3 rounded-full hover:bg-[#bb86fc] hover:text-white transition-colors shadow-lg"
          >
            Explore My Trip
          </button>
        </form>
      </div>

      {/* Right Panel with Leaflet Map */}
      <div
        className="flex-1 max-w-[700px] rounded-xl overflow-hidden shadow-xl border border-gray-700"
        style={{ height: "500px" }}
      >
        <MapContainer
          center={[37.0902, -95.7129]}
          zoom={4}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[37.0902, -95.7129]}>
            <Popup>Center of USA</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default TripPlanner;
