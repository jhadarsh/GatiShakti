// Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
      {/* Logo / Project Name */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold">GatiShakti</span>
      </div>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li className="hover:text-purple-600 cursor-pointer">Transport</li>
        <li className="hover:text-purple-600 cursor-pointer">Logistique</li>
        <li className="hover:text-purple-600 cursor-pointer">Projets</li>
      </ul>

      {/* Contact button */}
      <button className="bg-gradient-to-br from-slate-900 via-indigo-800 to-emerald-500 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition">
        Contact
      </button>
    </nav>
  );
};

export default Navbar;
