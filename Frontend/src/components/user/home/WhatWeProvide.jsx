import { motion } from "framer-motion";
import { Map, ParkingCircle, AlertTriangle } from "lucide-react";

const features = [
  {
    icon: <Map size={28} />,
    title: "Plan Your Journey",
    desc: "Get optimized routes with real-time traffic insights for faster travel.",
  },
  {
    icon: <ParkingCircle size={28} />,
    title: "Book Parking",
    desc: "Find and reserve nearby parking spots بسهولة before reaching your destination.",
  },
  {
    icon: <AlertTriangle size={28} />,
    title: "Raise Complaint",
    desc: "Report traffic issues instantly and help improve city infrastructure.",
  },
];

export default function WhatWeProvide() {
  return (
    <section className="relative w-full py-24 bg-[#08101e] overflow-hidden">

      {/* 🔥 Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* 🔥 Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(34,211,238,0.12), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(245,158,11,0.1), transparent 40%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-16"
        >
          What <span className="text-cyan-400">We Provide</span>
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="group rounded-2xl p-6 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Icon */}
              <div
                className="mb-4 w-12 h-12 flex items-center justify-center rounded-full"
                style={{
                  background: "rgba(34,211,238,0.1)",
                  color: "#22d3ee",
                }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Glow Hover Effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
                style={{
                  boxShadow: "0 0 40px rgba(34,211,238,0.15)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}