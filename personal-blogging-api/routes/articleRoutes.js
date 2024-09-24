// routes/articleRoutes.js
const express = require("express");
const articleController = require("../controllers/articleController");
const auth = require("../middleware/auth");

const router = express.Router();

// Create article
router.post("/", auth, articleController.createArticle);

// Get all articles
router.get("/", articleController.getAllArticles);

// Get articles by user
router.get("/user", auth, articleController.getUserArticles);

// Get article by ID
router.get("/:id", articleController.getArticleById);

// Like an article
router.post("/like/:id/", auth, articleController.likeArticle);

// Comment on an article
router.post("/comment/:id/", auth, articleController.commentOnArticle);

// Search articles by title
router.get("/search/title", articleController.searchByTitle);

// Search articles by tag
router.get("/search/tag", articleController.searchByTag);

// Edit an article
router.put("/:id", auth, articleController.editArticle);

// Delete an article
router.delete("/:id", auth, articleController.deleteArticle);

module.exports = router;
