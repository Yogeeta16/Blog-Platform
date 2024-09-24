// controllers/articleController.js
const articleService = require("../services/articleService");

exports.createArticle = async (req, res) => {
  const articleData = { ...req.body, author: req.user.id };
  try {
    const article = await articleService.createArticle(articleData);
    res.status(201).json(article);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.json(articles);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getUserArticles = async (req, res) => {
  try {
    const articles = await articleService.getUserArticles(req.user.id);
    res.json(articles);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.likeArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await articleService.likeArticle(id, req.user.id);
    res.json({ message });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.commentOnArticle = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const message = await articleService.commentOnArticle(id, comment, req.user.id);
    res.json({ message });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await articleService.getArticleById(id);
    res.json(article);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};

exports.searchByTitle = async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ message: "Title query parameter is required." });
  }

  try {
    const articles = await articleService.searchArticlesByTitle(title);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchByTag = async (req, res) => {
  const { tag } = req.query;
  if (!tag) {
    return res.status(400).json({ message: "Tag query parameter is required." });
  }

  try {
    const articles = await articleService.searchArticlesByTag(tag);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editArticle = async (req, res) => {
  const { id } = req.params;
  const articleData = req.body;
  try {
    const message = await articleService.editArticle(id, articleData, req.user.id);
    res.json({ message });
  } catch (err) {
    res.status(err.status || 403).json({ message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await articleService.deleteArticle(id, req.user.id);
    res.json({ message });
  } catch (err) {
    res.status(err.status || 403).json({ message: err.message });
  }
};
