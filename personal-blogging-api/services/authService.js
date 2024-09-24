// services/authService.js

const User = require("../models/User"); // Ensure you have your User model imported
const jwt = require("jsonwebtoken"); // Import JWT for token generation and verification
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const sendResetEmailLink = require("../utils/sendResetEmailLink"); // Adjust path as necessary

const crypto = require("crypto");
const nodemailer = require("nodemailer");
exports.register = async (username, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: "Email already exists." };
  }

  const user = new User({ username, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  await sendVerificationEmail(email, token);

  return "Registration successful. Please check your email to verify your account.";
};

exports.verifyEmail = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  user.isVerified = true;
  await user.save();
  return "Email verified successfully!";
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 400, message: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 400, message: "Invalid credentials" };
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

// Request Password Reset
exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate a token with an expiration time
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Send the reset email with the token
  await sendResetEmailLink(email, token);
};

// Reset Password

// Reset Password
exports.resetPassword = async (token, newPassword) => {
  // Verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }

  // Ensure that the newPassword is provided
  if (!newPassword) {
    throw new Error("New password is required");
  }

  // Hash the new password before saving it
  const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the number of salt rounds
  user.password = hashedPassword; // Update the user's password with the hashed version
  await user.save();
};
