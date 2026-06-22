import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Phone, Shield } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassKey, setAdminPassKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const location = useLocation();
const [infoMsg, setInfoMsg] = useState(location.state?.message || "");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const payload = { phoneNumber, password };
      if (isAdminLogin) {
        if (!adminPassKey) {
          setError("Please enter the admin pass key.");
          setLoading(false);
          return;
        }
        payload.adminPassKey = adminPassKey;
      }

      const data = await login(payload);

      if (data.user?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-section flex items-center justify-center px-4 sm:px-6 pt-32 pb-12 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center items-end gap-2 mb-8">
          <h3 className="font-script text-5xl text-text-primary leading-none">
            Gati
          </h3>
          <h4 className="font-sans uppercase tracking-[0.15em] text-base text-text-primary pb-1">
            Shakti
          </h4>
        </div>

        {/* Card */}
        <div className="bg-surface border border-primary/10 rounded-2xl shadow-[0_15px_35px_rgba(217,93,3,0.1)] p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary text-sm">
              Login to continue to your account
            </p>
          </div>
          {infoMsg && (
  <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-center">
    {infoMsg}
  </div>
)}

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="9876543210"
                  maxLength={10}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-bg border border-primary/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-bg border border-primary/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Admin Login Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setIsAdminLogin((prev) => !prev)}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <Shield size={16} className="text-primary" />
                {isAdminLogin
                  ? "Hide admin pass key"
                  : "Logging in as admin?"}
              </button>

              {isAdminLogin && (
                <div className="relative mt-3">
                  <Shield
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                  />
                  <input
                    type="password"
                    value={adminPassKey}
                    onChange={(e) => setAdminPassKey(e.target.value)}
                    placeholder="Enter admin pass key"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-bg border border-primary/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 font-sans font-medium bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(217,93,3,0.25)] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;