const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateOTP = require(
  "../utils/generateOTP"
);

const {
  sendOTPEmail,
  sendWelcomeEmail,
} = require("../services/emailService");

const router = express.Router();

router.post(
  "/signup",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        phoneNumber,
      } = req.body;

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const phoneRegex =
        /^[6-9]\d{9}$/;

      if (
        !name ||
        !email ||
        !password ||
        !phoneNumber
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
        });
      }

      if (
        !emailRegex.test(email)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid email format",
        });
      }

      if (
        !phoneRegex.test(
          phoneNumber
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid phone number",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 6 characters",
        });
      }

      const existingUser =
        await User.findOne({
          $or: [
            { email },
            { phoneNumber },
          ],
        });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message:
            "User already exists",
        });
      }

      const otp =
        generateOTP();

      const user =
        await User.create({
          name,
          email,
          password,
          phoneNumber,
          otp,
          otpExpiry:
            Date.now() +
            10 * 60 * 1000,
        });

      await sendOTPEmail(
        email,
        name,
        otp
      );

      res.status(201).json({
        success: true,
        message:
          "OTP sent successfully",
        email: user.email,
      });
    } catch (error) {
      console.log(
        "Signup Error:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Internal server error",
      });
    }
  }
);

router.post(
  "/verify-otp",
  async (req, res) => {
    try {
      const { email, otp } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      if (
        user.otp !== otp
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid OTP",
        });
      }

      if (
        user.otpExpiry <
        Date.now()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "OTP expired",
        });
      }

      user.verified = true;
      user.otp = null;
      user.otpExpiry = null;

      await user.save();

      await sendWelcomeEmail(
        user.email,
        user.name
      );

      res.json({
        success: true,
        message:
          "Account verified successfully",
      });
    } catch (error) {
      console.log(
        "Verify OTP Error:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Internal server error",
      });
    }
  }
);

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        phoneNumber,
        password,
        adminPassKey,
      } = req.body;

      const user =
        await User.findOne({
          phoneNumber,
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      if (!user.verified) {
        return res.status(400).json({
          success: false,
          message:
            "Please verify your account first",
        });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid password",
        });
      }

      if (
        adminPassKey &&
        adminPassKey ===
          process.env.ADMIN_PASS_KEY
      ) {
        user.isAdmin = true;

        await user.save();
      }

      const token =
        jwt.sign(
          {
            userId: user._id,
            isAdmin:
              user.isAdmin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      res.json({
        success: true,
        message:
          "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email:
            user.email,
          phoneNumber:
            user.phoneNumber,
          verified:
            user.verified,
          isAdmin:
            user.isAdmin,
        },
      });
    } catch (error) {
      console.log(
        "Login Error:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Internal server error",
      });
    }
  }
);

module.exports = router;