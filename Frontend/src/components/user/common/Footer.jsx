import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#736278] via-[#3730a3] to-[#10b981] text-white ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">GatiShakti</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            Accelerating smarter journeys with intelligent traffic management and 
            seamless transport solutions for a faster, greener future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-emerald-300 transition">Home</a></li>
            <li><a href="#" className="hover:text-emerald-300 transition">Plan Your Trip</a></li>
            <li><a href="#" className="hover:text-emerald-300 transition">About Us</a></li>
            <li><a href="#" className="hover:text-emerald-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <p className="text-sm opacity-80">📍 New Delhi, India</p>
          <p className="text-sm opacity-80">📧 info@gatishakti.com</p>
          <p className="text-sm opacity-80">📞 +91 98765 43210</p>

          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-6 py-4 text-center text-sm opacity-80">
        © {new Date().getFullYear()} GatiShakti. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
