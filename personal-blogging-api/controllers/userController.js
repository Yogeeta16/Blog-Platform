// controllers/userController.js
const userService = require("../services/userService");

exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await userService.getUserProfile(req.params.userId);
    res.json(userProfile);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserProfile(
      req.user.id,
      req.body
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const updatedUser = await userService.uploadProfilePicture(
      req.user.id,
      req.file.path
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
