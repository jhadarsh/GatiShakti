// Hero.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CarImage from "../../../assets/user/Car.png";

const Hero = () => {
  const redTime = 45;
  const yellowTime = 5;
  const greenTime = 30;
  const densityTarget = 120;

  const [density, setDensity] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = Math.ceil(densityTarget / (duration / 30));
    const interval = setInterval(() => {
      start += increment;
      if (start >= densityTarget) {
        setDensity(densityTarget);
        clearInterval(interval);
      } else {
        setDensity(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [densityTarget]);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col -mt-32 pt-24"
      style={{ minHeight: "650px", background: "#08101e" }}
    >
      {/* Top fade for navbar blend */}
 
      {/* ── Grid Background ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* ── Corner vignette fades so grid fades at edges ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 55% at 0% 0%,   rgba(8,16,30,0.96) 0%, transparent 65%),
            radial-gradient(ellipse 55% 55% at 100% 0%,  rgba(8,16,30,0.96) 0%, transparent 65%),
            radial-gradient(ellipse 55% 55% at 0% 100%,  rgba(8,16,30,0.96) 0%, transparent 65%),
            radial-gradient(ellipse 55% 55% at 100% 100%,rgba(8,16,30,0.96) 0%, transparent 65%)
          `,
        }}
      />

      {/* ══════════════════════════════
           UPPER SECTION — hero content
         ══════════════════════════════ */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-10 pb-6 flex-1">

        {/* Badge */}
        <motion.div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
          style={{
            borderColor: "rgba(6,182,212,0.5)",
            background: "rgba(6,182,212,0.07)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#22d3ee", boxShadow: "0 0 8px #22d3ee" }}
          />
          <span
            className="text-xs font-mono uppercase"
            style={{ color: "#22d3ee", letterSpacing: "0.18em" }}
          >
            System Online · V2.4.1
          </span>
        </motion.div>

        {/* Line 1: "Accelerate" — white */}
        <motion.h1
          style={{
            fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 800,
            color: "#f1f5f9",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
        >
          Accelerate
        </motion.h1>

        {/* Line 2: "Smarter" cyan + "Cities" amber */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: "easeOut" }}
        >
          <span
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#22d3ee",
            }}
          >
            Smarter
          </span>
          <span
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#f59e0b",
            }}
          >
            Cities
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          style={{
            marginTop: "1.5rem",
            maxWidth: "600px",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontStyle: "italic",
            color: "#94a3b8",
            lineHeight: 1.75,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: "easeOut" }}
        >
          GatiShakti empowers municipalities with real-time intelligence —
          reducing congestion, cutting emissions, and giving every commuter
          their time back.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex items-center gap-3 flex-wrap justify-center"
          style={{ marginTop: "2rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.48, ease: "easeOut" }}
        >
          <button
            className="flex items-center gap-2 font-semibold transition-all hover:scale-105"
            style={{
              background: "#f1f5f9",
              color: "#08101e",
              padding: "0.65rem 1.8rem",
              borderRadius: "9999px",
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 24px rgba(241,245,249,0.12)",
            }}
          >
            Get Started <span>→</span>
          </button>

          <button
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "9999px",
              border: "1.5px solid rgba(148,163,184,0.35)",
              background: "rgba(148,163,184,0.1)",
              color: "#94a3b8",
              fontSize: "1.1rem",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}
          >
            ↓
          </button>

          <button
            className="font-semibold transition-all hover:scale-105"
            style={{
              background: "rgba(241,245,249,0.07)",
              color: "#f1f5f9",
              padding: "0.65rem 1.8rem",
              borderRadius: "9999px",
              fontSize: "0.95rem",
              border: "1.5px solid rgba(241,245,249,0.18)",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}
          >
            Watch Demo
          </button>
        </motion.div>
      </div>

    

        {/* ── Animated Car — loops left → right across bottom strip ── */}
     
      
    </section>
  );
};

export default Hero;