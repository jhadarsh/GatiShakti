import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LogIn, UserPlus, Calendar , Shield } from "lucide-react";
import { useAuth } from "../../../context/AuthContext"; // adjust path to match your structure
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const navigate = useNavigate();
  // Mock auth state - replace with real auth later
const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close drawers on route change
  useEffect(() => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: "/plan", label: "Plan Journeys" },
    { to: "/reporting", label: "Complain" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50

        transition-all
        duration-500

        ${
          scrolled
            ? "bg-surface/90 backdrop-blur-xl border-b border-primary/10 shadow-lg"
            : "bg-bg"
        }
      `}
    >
      {/* Soft Warm Glow */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2

          w-[500px]
          h-[180px]

          bg-primary/10
          blur-3xl

          pointer-events-none
        "
      />

      <div
        className="
          relative
          z-10

          max-w-7xl
          mx-auto

          flex
          items-center
          justify-between

          px-6
          md:px-10

          py-4
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            flex
            items-end
            gap-2
            transition-transform
            duration-300
            hover:scale-105
          "
        >
          <h3 className="font-script text-4xl md:text-6xl text-text-primary leading-none">
            Gati
          </h3>

          <h4 className="font-sans uppercase tracking-[0.15em] text-sm md:text-lg text-text-primary pb-1 md:pb-2">
            Shakti
          </h4>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center -ml-32 gap-10">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;

            return (
              <li key={to} className="group">
                <Link
                  to={to}
                  className={`
                    relative

                    font-sans
                    uppercase
                    tracking-wider
                    text-sm

                    transition-colors
                    duration-300

                    ${
                      isActive
                        ? "text-primary"
                        : "text-text-secondary group-hover:text-primary"
                    }
                  `}
                >
                  {label}

                  <span
                    className={`
                      absolute
                      left-0
                      -bottom-1

                      h-[2px]
                      bg-primary

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: Profile dropdown (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Profile Dropdown - visible on all screens */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="
                flex
                items-center
                justify-center

                w-11
                h-11

                rounded-full

                bg-surface
                border
                border-primary/10

                transition-all
                duration-300

                
                hover:text-white
                hover:scale-105
                hover:shadow-[0_10px_25px_rgba(217,93,3,0.2)]
              "
            >
              <User size={20} className="text-primary group-hover:text-white" />
            </button>

            {/* Backdrop to close dropdown on outside click */}
            {isProfileOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />
            )}

            {/* Dropdown Drawer */}
            <div
              className={`
                absolute
                right-0
                top-full
                mt-3

                w-56

                origin-top-right

                rounded-2xl
                bg-surface
                border
                border-primary/10

                shadow-[0_15px_35px_rgba(217,93,3,0.15)]

                z-50

                transition-all
                duration-300
                ease-out

                ${
                  isProfileOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }
              `}
            >
              <div className="p-3 flex flex-col gap-2">
                {isAdmin && (
  <Link
    to="/admin"
    onClick={() => setIsProfileOpen(false)}
    className="flex items-center gap-3 font-sans text-sm font-medium text-primary px-4 py-3 rounded-xl hover:bg-primary/10"
  >
    <Shield size={18} />
    Admin Dashboard
  </Link>
)}
                {isAuthenticated  ? (
                  <>
                    <div className="px-4 py-2 border-b border-primary/10 mb-1">
    <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
    <p className="text-xs text-text-secondary">{user?.phoneNumber}</p>
  </div>
                  <Link
                    to="/slots"
                    onClick={() => setIsProfileOpen(false)}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2

                      font-sans
                      font-medium

                      bg-primary
                      hover:bg-primary-hover

                      text-white

                      px-6
                      py-3

                      rounded-full

                      transition-all
                      duration-300

                      hover:scale-105
                      hover:shadow-[0_10px_30px_rgba(217,93,3,0.25)]
                    "
                  >
                    <Calendar size={18} />
                    Book Slot
                  </Link>
                      <button
      onClick={() => {
        logout();
        setIsProfileOpen(false);
        navigate("/");
      }}
      className="
        flex items-center justify-center gap-2
        font-sans text-sm font-medium
        text-red-500
        px-4 py-3 rounded-xl
        transition-all duration-300
        hover:bg-red-50
      "
    >
      <LogIn size={18} className="rotate-180" />
      Logout
    </button>
  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsProfileOpen(false)}
                      className="
                        flex
                        items-center
                        gap-3

                        font-sans
                        text-sm
                        font-medium

                        text-text-primary

                        px-4
                        py-3

                        rounded-xl

                        transition-all
                        duration-300

                        hover:bg-primary/10
                        hover:text-primary
                      "
                    >
                      <LogIn size={18} />
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() => setIsProfileOpen(false)}
                      className="
                        flex
                        items-center
                        gap-3

                        font-sans
                        text-sm
                        font-medium

                        text-text-primary

                        px-4
                        py-3

                        rounded-xl

                        transition-all
                        duration-300

                        hover:bg-primary/10
                        hover:text-primary
                      "
                    >
                      <UserPlus size={18} />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="
              md:hidden

              flex
              items-center
              justify-center

              w-11
              h-11

              rounded-full

              bg-surface
              border
              border-primary/10

              transition-all
              duration-300

              hover:bg-primary
              hover:text-white
              hover:scale-105
            "
          >
            <Menu size={20} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      {/* Overlay */}
      <div
        className={`
          fixed
          inset-0
          z-[60]

          bg-black/40
          backdrop-blur-sm

          transition-opacity
          duration-300

          md:hidden

          ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`
          fixed
          top-0
          right-0
          h-full

          w-[80%]
          max-w-sm

          z-[70]

          bg-surface

          shadow-[-15px_0_35px_rgba(0,0,0,0.1)]

          transition-transform
          duration-300
          ease-out

          md:hidden

          flex
          flex-col
        `}
        style={{
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
          <div className="flex items-end gap-2">
            <h3 className="font-script text-4xl text-text-primary leading-none">
              Gati
            </h3>
            <h4 className="font-sans uppercase tracking-[0.15em] text-sm text-text-primary pb-1">
              Shakti
            </h4>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="
              flex
              items-center
              justify-center

              w-10
              h-10

              rounded-full

              bg-bg
              border
              border-primary/10

              transition-all
              duration-300

              hover:bg-primary
              hover:text-white
            "
          >
            <X size={20} className="text-primary" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-2">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;

            return (
              <Link
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  font-sans
                  uppercase
                  tracking-wider
                  text-sm
                  font-medium

                  px-4
                  py-4

                  rounded-xl

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer - Auth / CTA */}
        <div className="px-6 py-6 border-t border-primary/10 flex flex-col gap-3">
          {isAuthenticated  ? (
            <>
              <div className="px-4 py-2 border-b border-primary/10 mb-1">
    <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
    <p className="text-xs text-text-secondary">{user?.phoneNumber}</p>
  </div>
                        <Link
              to="/slots"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                flex
                items-center
                justify-center
                gap-2

                font-sans
                font-medium

                bg-primary
                hover:bg-primary-hover

                text-white

                px-6
                py-3

                rounded-full

                transition-all
                duration-300

                hover:scale-105
                hover:shadow-[0_10px_30px_rgba(217,93,3,0.25)]
              "
            >
              <Calendar size={18} />
              Book Slot
            </Link>

                <button
      onClick={() => {
        logout();
        setIsProfileOpen(false);
        navigate("/");
      }}
      className="
        flex items-center justify-center gap-2
        font-sans text-sm font-medium
        text-red-500
        px-4 py-3 rounded-xl
        transition-all duration-300
        hover:bg-red-50
      "
    >
      <LogIn size={18} className="rotate-180" />
      Logout
    </button>
            </>
 
            
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  font-sans
                  font-medium
                  text-sm

                  border
                  border-primary

                  text-primary

                  px-6
                  py-3

                  rounded-full

                  transition-all
                  duration-300

                  hover:bg-primary
                  hover:text-white
                "
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  font-sans
                  font-medium
                  text-sm

                  bg-primary
                  hover:bg-primary-hover

                  text-white

                  px-6
                  py-3

                  rounded-full

                  transition-all
                  duration-300

                  hover:scale-105
                  hover:shadow-[0_10px_30px_rgba(217,93,3,0.25)]
                "
              >
                <UserPlus size={18} />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;