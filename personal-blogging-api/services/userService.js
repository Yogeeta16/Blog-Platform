// services/userService.js
const User = require("../models/User");

exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId).populate("articles");
  if (!user) {
    throw { status: 404, message: "User not found." };
  }

  return {
    userId: user._id,
    username: user.username,
    bio: user.bio,
    profilePicture: user.profilePicture,
    articles: user.articles,
  };
};

exports.updateUserProfile = async (userId, { bio, profilePicture }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { status: 404, message: "User not found." };
  }

  user.bio = bio || user.bio;
  user.profilePicture = profilePicture || user.profilePicture;
  await user.save();

  return { message: "Profile updated successfully" };
};

exports.uploadProfilePicture = async (userId, profilePicturePath) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { status: 404, message: "User not found." };
  }

  user.profilePicture = profilePicturePath;
  await user.save();

  return { message: "Profile picture uploaded successfully" };
};
