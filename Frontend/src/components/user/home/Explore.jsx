import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaBus, FaCar, FaTrain, FaBicycle } from "react-icons/fa";

const expenseData = [
  { mode: "Bus", cost: 20 },
  { mode: "Car", cost: 80 },
  { mode: "Train", cost: 40 },
  { mode: "Bike", cost: 10 },
];

const timeData = [
  { mode: "Bus", time: 60 },
  { mode: "Car", time: 30 },
  { mode: "Train", time: 45 },
  { mode: "Bike", time: 25 },
];

const pollutionData = [
  { mode: "Bus", pollution: 30 },
  { mode: "Car", pollution: 90 },
  { mode: "Train", pollution: 40 },
  { mode: "Bike", pollution: 5 },
];

const transportModes = [
  { name: "Bus", icon: <FaBus />, color: "from-indigo-600 to-purple-600" },
  { name: "Car", icon: <FaCar />, color: "from-green-600 to-emerald-600" },
  { name: "Train", icon: <FaTrain />, color: "from-yellow-500 to-orange-500" },
  { name: "Bike", icon: <FaBicycle />, color: "from-pink-500 to-rose-500" },
];

const ExploreResults = ({ onClose }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 w-full h-[90vh] bg-gradient-to-br from-slate-900 via-indigo-800 to-emerald-500 shadow-2xl rounded-t-3xl z-50 flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-white/20">
        <h2 className="text-3xl font-bold text-white">Journey Insights</h2>
        <button
          onClick={onClose}
          className="text-white text-xl hover:text-red-400 transition"
        >
          ✕
        </button>
      </div>

      {/* Transport Mode Cards */}
      <div className="flex justify-center gap-6 px-6 py-6 flex-wrap">
        {transportModes.map((mode, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`flex flex-col items-center justify-center gap-2 p-6 w-40 rounded-2xl bg-gradient-to-br ${mode.color} shadow-xl text-white cursor-pointer`}
          >
            <div className="text-4xl">{mode.icon}</div>
            <p className="text-lg font-semibold">{mode.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Graph Section */}
      <div className="grid md:grid-cols-3 gap-6 p-6 flex-1">
        {/* Expense Comparison */}
        <div className="bg-white/10 rounded-2xl p-4 shadow-lg backdrop-blur-lg">
          <h3 className="text-xl text-white font-semibold mb-4 text-center">
            💰 Expense Comparison
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={expenseData}>
              <XAxis dataKey="mode" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#34d399" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Time Comparison */}
        <div className="bg-white/10 rounded-2xl p-4 shadow-lg backdrop-blur-lg">
          <h3 className="text-xl text-white font-semibold mb-4 text-center">
            ⏱ Time Comparison
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timeData}>
              <XAxis dataKey="mode" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="time" stroke="#818cf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pollution Comparison */}
        <div className="bg-white/10 rounded-2xl p-4 shadow-lg backdrop-blur-lg">
          <h3 className="text-xl text-white font-semibold mb-4 text-center">
            🌍 Pollution Comparison
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={pollutionData}>
              <XAxis dataKey="mode" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pollution" stroke="#f87171" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ExploreResults;
