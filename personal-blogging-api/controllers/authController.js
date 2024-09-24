// controllers/authController.js
const authService = require("../services/authService");
// In authController.js
const sendVerificationEmail = require("../utils/sendVerificationEmail"); // Adjust path as necessary
const User = require("../models/User"); // Adjust according to your user model

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const message = await authService.register(username, email, password);
    res.status(201).json({ message });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const token = req.params.token;
  try {
    const message = await authService.verifyEmail(token);
    res.status(200).json({ message });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

// Request Password Reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    await authService.requestPasswordReset(email);
    return res.status(200).json({ message: "Reset password email sent" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  console.log("Request Body:", req.body); // Log the request body for debugging
  const { password } = req.body;

  try {
    if (!password) {
      throw new Error("New password is required");
    }
    await authService.resetPassword(token, password);
    return res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
