// Navbar.jsx
import React from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
      {/* Logo / Project Name */}
      <div className="flex items-center gap-2">
       <Link to="/"> <span className="text-xl font-semibold">GatiShakti</span></Link>
      </div>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <Link to="/reporting">
        <li className="hover:text-purple-600 cursor-pointer">Complain</li>
        </Link>
        <Link to="/about"><li className="hover:text-purple-600 cursor-pointer">About</li></Link>
        <Link to="/contact"><li className="hover:text-purple-600 cursor-pointer">Contact Us</li></Link>
      </ul>

      {/* Contact button */}
      <Link to="/slots">
      <button className="bg-gradient-to-br from-slate-900 via-indigo-800 to-emerald-500 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition">
        Book Slot
      </button>
      </Link>
    </nav>
  );
};

export default Navbar;
