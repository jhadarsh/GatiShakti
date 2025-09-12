import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gradient-to-r from-[#736278] via-[#3730a3] to-[#10b981] text-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-2">📍 New Delhi, India</p>
            <p className="mb-2">📧 info@gatishakti.com</p>
            <p className="mb-2">📞 +91 98765 43210</p>
            <p>
              Feel free to reach out for queries, collaborations, or support. Our
              team will get back to you at the earliest.
            </p>
          </div>

          {/* Contact Form */}
          <form className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
