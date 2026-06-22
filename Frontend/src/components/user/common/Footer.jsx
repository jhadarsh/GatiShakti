import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-section text-text-primary">

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(60,12,4,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(60,12,4,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h3 className="font-script text-6xl text-text-primary leading-none">
              Gati
            </h3>

            <h4 className="font-sans uppercase tracking-[0.15em] text-lg text-text-primary">
              Shakti
            </h4>

            <p className="mt-4 text-text-secondary leading-relaxed">
              Empowering smarter cities through intelligent traffic
              monitoring, adaptive signal control, and seamless mobility
              solutions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-text-secondary">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Plan Journey
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Complaint Portal
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-5">
              Contact
            </h3>

            <div className="space-y-2 text-text-secondary">
              <p>📍 New Delhi, India</p>
              <p>📧 support@gatishakti.in</p>
              <p>📞 +91 98765 43210</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="
                      w-10 h-10
                      rounded-full
                      flex items-center justify-center
                      bg-surface
                      border border-border
                      text-text-secondary
                      hover:bg-primary
                      hover:text-white
                      hover:border-primary
                      transition-all duration-300
                    "
                  >
                    <Icon />
                  </button>
                )
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm text-text-muted">
          © {new Date().getFullYear()} GatiShakti. Building smarter roads for smarter cities.
        </div>
      </div>
    </footer>
  );
};

export default Footer;