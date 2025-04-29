// src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      role,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error registering user", error });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the role matches
    if (user.role !== role) {
      return res
        .status(403)
        .json({ message: `Access denied. You are logged in as a ${user.role}.` });
    }

    // Generate tokens
    const accessToken = user.generateAuthToken(); // Generates access token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
    );

    // Return success response with tokens and role
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      role: user.role, // Include role in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


// Refresh the access token
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const accessToken = user.generateAuthToken();

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired refresh token", error });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;             // set by authMiddleware
    const user = await User.findById(userId)
      .select("username email role mentorId"); // only fields we need

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Error in getCurrentUser:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};