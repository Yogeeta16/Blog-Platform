// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Destination folder for profile pictures

const router = express.Router();

// Get user profile
router.get("/:userId", userController.getUserProfile);

// Update user profile
router.put("/update", auth, userController.updateUserProfile);

// Upload profile picture
router.post("/profile/upload", auth, upload.single("profilePicture"), userController.uploadProfilePicture);

module.exports = router;
 