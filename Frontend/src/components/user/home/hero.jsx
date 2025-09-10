// Hero.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import CarImage from "../../../assets/user/Car.png"; // Your car image

const Hero = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    let start = 0;
    let end = 3240;
    let duration = 5000; // match car animation (5s)
    let frameRate = 1000 / 60; // 60fps
    let totalFrames = duration / frameRate;
    let counter = 0;

    const interval = setInterval(() => {
      counter++;
      const progress = counter / totalFrames;
      const current = Math.floor(progress * end);
      setNumber(current > end ? end : current);
      if (counter >= totalFrames) {
        counter = 0;
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[500px] bg-white overflow-hidden flex items-center justify-center">
      
      {/* Diagonal Purple Background */}
   <div
  className="absolute top-0 left-0 w-[50%] h-full z-0 bg-gradient-to-br from-slate-900 via-indigo-800 to-emerald-500"
  style={{
    clipPath: "polygon(0 0, 0 100%, 100% 100%)",
  }}
>

        
        {/* Blinking Red Light and Number */}
        <div className="absolute bottom-0 mb-10 left-14 z-10 flex items-center gap-4">
          {/* Blinking Red Light */}
          <div className="w-5 h-5 rounded-full bg-red-500 border border-4-black animate-ping"></div>

          {/* Dynamic Number */}
          <div className="text-white text-3xl font-semibold">
            {number.toLocaleString()}
             &nbsp;meters
          </div>
        </div>
      </div>

      {/* Road image along car path */}
      <div
        className="absolute z-5"
        style={{
          width: "810px", 
          height: "150px",
          top: "calc(60% - 305px )",
          left: "calc(50% - 635px)",
          transform: "rotate(38.5deg)",
          transformOrigin: "top left",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <img
          src="https://t4.ftcdn.net/jpg/06/03/50/63/360_F_603506362_EmGPA1cjaRZZAsxxwVMESOx4EtFc0xQK.jpg"
          alt="Road"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Animated Car Image moving diagonally */}
      <motion.img
        src={CarImage}
        alt="Car"
        className="absolute z-10 w-[450px] h-auto "
        initial={{ x: -100, y: -50 }}
        animate={{ x: 300, y: 300 }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          top: 2,
          left: 0,
        }}
      />

      {/* Main Content */}
      <div className="relative mb-40 z-20 w-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-gray-900 max-w-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Accelerate smarter journeys with{" "}
          <span className="text-indigo-800">Gati</span>
          <span className="text-green-600">Shakti</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-base md:text-lg text-gray-600 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Empowering cities with intelligent traffic management and seamless
          transport solutions for a faster, smarter future.
        </motion.p>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <button className="bg-gradient-to-br from-slate-900 via-indigo-800 to-emerald-500 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition">
            Get Started
          </button>
          <button className="border border-purple-700 text-purple-700 px-6 py-2 rounded-full hover:bg-purple-50 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
