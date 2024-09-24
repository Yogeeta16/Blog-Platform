// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// const router = express.Router();
// const express = require("express");
// const authController = require("../controllers/authController");
const authService = require("../services/authService"); // Import the service

const router = express.Router();
router.post("/register", authController.register);
router.get("/verify/:token", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/request-reset-password", async (req, res) => {
    const { email } = req.body;
    try {
      await authService.requestPasswordReset(email);
      return res.status(200).json({ message: "Reset password email sent" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  
  // Route to reset password
  router.put("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      await authService.resetPassword(token, password);
      return res.status(200).json({ message: "Password has been reset" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
module.exports = router;
