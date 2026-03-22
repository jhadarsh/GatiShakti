import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // ⚡ ULTRA SMOOTH cursor tracking (no lag)
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navLinks = [
     { to: "/plan", label: "Plan Journeys" },
    { to: "/reporting", label: "Complain" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        transition: "all 0.4s ease",

        // 🔥 Premium glass + gradient blend
        background: "linear-gradient(to bottom, rgba(8,16,30,0.95), rgba(8,16,30,0.4), transparent)",

        backdropFilter: "blur(16px)",

        borderBottom: scrolled
          ? "1px solid rgba(34,211,238,0.2)"
          : "1px solid transparent",

        boxShadow: scrolled
          ? "0 10px 40px rgba(0,0,0,0.35)"
          : "none",
      }}
    >
      {/* ✨ Cursor Glow Effect */}
      <div
        style={{
          position: "absolute",
          top: mouse.y - 100,
          left: mouse.x - 100,
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15), transparent 70%)",
          pointerEvents: "none",
          transition: "all 0.15s linear",
          zIndex: 0,
        }}
      />

      {/* Top fade (blend with hero) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "80px",
          background:
            "linear-gradient(to bottom, rgba(8,16,30,0.9), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Glow bottom line */}
      {scrolled && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #22d3ee, transparent)",
            opacity: 0.8,
          }}
        />
      )}

      <div
        className="relative z-10 flex justify-between items-center"
        style={{ padding: "0.8rem 2.5rem" }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/Logo.png"
            alt="Logo"
            style={{
              height: "44px",
              transition: "all 0.3s ease",
              filter: scrolled
                ? "drop-shadow(0 0 14px rgba(34,211,238,0.7))"
                : "drop-shadow(0 0 6px rgba(34,211,238,0.4))",
            }}
          />
        </Link>

        {/* Nav Links */}
        <ul
          className="hidden md:flex items-center"
          style={{ gap: "2.8rem", listStyle: "none", margin: 0 }}
        >
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: isActive ? "#22d3ee" : "#94a3b8",
                    position: "relative",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#22d3ee";
                    e.target.style.textShadow = "0 0 10px #22d3ee";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = isActive
                      ? "#22d3ee"
                      : "#94a3b8";
                    e.target.style.textShadow = "none";
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <Link to="/slots">
          <button
            style={{
              background:
                "linear-gradient(135deg, #f8fafc, #e2e8f0)",
              color: "#08101e",
              padding: "0.55rem 1.6rem",
              borderRadius: "9999px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: "0 8px 30px rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.06)";
              e.currentTarget.style.boxShadow =
                "0 0 40px rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(255,255,255,0.15)";
            }}
          >
            Book Slot →
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;