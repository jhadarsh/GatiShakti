import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Phone, Mail, User } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, verifyOtp } = useAuth();

  const [step, setStep] = useState("signup"); // "signup" | "otp" | "success"

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validateSignup = () => {
    if (!name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email.";
    if (!/^\d{10}$/.test(phoneNumber))
      return "Please enter a valid 10-digit phone number.";
    if (password.length < 6)
      return "Password must be at least 6 characters.";
    return "";
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const data = await signup({ name, email, password, phoneNumber });
      setSuccessMsg(
        data.message || "OTP sent successfully. Please check your email."
      );
      setStep("otp");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      await verifyOtp({ email, otp });
      setStep("success");

      // Auto-redirect to login after showing success message
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Account verified successfully! Please login." },
        });
      }, 1800);
    } catch (err) {
      setError(err.message || "OTP verification failed. Please try again.");
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
          {/* STEP: SIGNUP FORM */}
          {step === "signup" && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Create Account
                </h1>
                <p className="text-text-secondary text-sm">
                  Sign up to get started with GatiShakti
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adarsh Kumar"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-bg border border-primary/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-bg border border-primary/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                    />
                  </div>
                </div>

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
                      placeholder="At least 6 characters"
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 font-sans font-medium bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(217,93,3,0.25)] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </form>

              <p className="text-center text-sm text-text-secondary mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </>
          )}

          {/* STEP: OTP VERIFICATION */}
          {step === "otp" && (
            <>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail size={28} className="text-primary" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Check Your Email
                </h1>
                <p className="text-text-secondary text-sm">
                  We've sent a 6-digit OTP to{" "}
                  <span className="text-primary font-medium">{email}</span>.
                  Please enter it below to verify your account.
                </p>
              </div>

              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-center">
                  {successMsg}
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="123456"
                    maxLength={6}
                    className="w-full text-center tracking-[0.5em] text-xl font-semibold px-4 py-3 rounded-xl bg-bg border border-primary/10 text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="font-sans font-medium bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(217,93,3,0.25)] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>

              <p className="text-center text-sm text-text-secondary mt-6">
                Didn't get the code? Check your spam folder, or{" "}
                <button
                  onClick={() => setStep("signup")}
                  className="text-primary font-medium hover:underline"
                >
                  go back
                </button>
              </p>
            </>
          )}

          {/* STEP: SUCCESS */}
          {step === "success" && (
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Account Verified!
              </h1>
              <p className="text-text-secondary text-sm">
                Redirecting you to login...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;