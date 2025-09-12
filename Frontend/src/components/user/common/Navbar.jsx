// Navbar.jsx
import React from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
      {/* Logo / Project Name */}
  <div className="flex items-center gap-2 h-12"> {/* Navbar height fixed */}
  <Link to="/">
    <img 
      src="/Logo.png" 
      alt="GatiShakti Logo" 
      className="h-10 w-auto transform scale-150 ml-12 mb-6" // increase size 1.25x
    />
  </Link>
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
