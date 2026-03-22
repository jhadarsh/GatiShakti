import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#08101e] text-white">

      {/* 🔥 Grid Background (same as hero) */}
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

      {/* 🔥 Glow Effects */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(34,211,238,0.12), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(245,158,11,0.10), transparent 40%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            GatiShakti
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Accelerating smarter journeys with intelligent traffic management
            and seamless transport solutions for a faster, greener future.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                Plan Your Trip
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Get in Touch
          </h3>
          <p className="text-sm text-slate-400">📍 New Delhi, India</p>
          <p className="text-sm text-slate-400">📧 info@gatishakti.com</p>
          <p className="text-sm text-slate-400">📞 +91 98765 43210</p>

          {/* Socials */}
          <div className="flex gap-4 mt-5">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="p-2 rounded-full cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(6px)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.15)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(34,211,238,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon className="text-slate-300" />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="relative z-10 text-center text-sm text-slate-500 py-6"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        © {new Date().getFullYear()} GatiShakti. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;