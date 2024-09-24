// services/articleService.js
const Article = require("../models/Article");

exports.createArticle = async (articleData) => {
  const article = new Article(articleData);
  await article.save();
  return article;
};

exports.getAllArticles = async () => {
  return await Article.find().populate("author", "username");
};

exports.getUserArticles = async (userId) => {
  return await Article.find({ author: userId }).populate("author", "username");
};

exports.likeArticle = async (articleId, userId) => {
  const article = await Article.findById(articleId);
  if (!article) {
    throw { status: 404, message: "Article not found." };
  }

  if (article.likes.includes(userId)) {
    throw { status: 400, message: "You have already liked this article." };
  }

  article.likes.push(userId);
  await article.save();
  return "Article liked successfully.";
};

exports.commentOnArticle = async (articleId, comment, userId) => {
  const article = await Article.findById(articleId);
  if (!article) {
    throw { status: 404, message: "Article not found." };
  }

  article.comments.push({ user: userId, text: comment });
  await article.save();
  return "Comment added successfully.";
};

exports.getArticleById = async (articleId) => {
  const article = await Article.findById(articleId).populate(
    "author",
    "username"
  );
  if (!article) {
    throw { status: 404, message: "Article not found." };
  }
  return article;
};

exports.searchArticlesByTitle = async (title) => {
  return await Article.find({ title: new RegExp(title, "i") }).populate(
    "author",
    "username"
  );
};

exports.searchArticlesByTag = async (tag) => {
  return await Article.find({ tags: tag }).populate("author", "username");
};

exports.editArticle = async (articleId, articleData, userId) => {
  const article = await Article.findById(articleId);
  if (!article) {
    throw { status: 404, message: "Article not found." };
  }

  if (article.author.toString() !== userId) {
    throw {
      status: 403,
      message: "You are not authorized to edit this article.",
    };
  }

  Object.assign(article, articleData);
  await article.save();
  return "Article updated successfully.";
};

exports.deleteArticle = async (articleId, userId) => {
  const article = await Article.findById(articleId);
  if (!article) {
    throw { status: 404, message: "Article not found." };
  }

  if (article.author.toString() !== userId) {
    throw {
      status: 403,
      message: "You are not authorized to delete this article.",
    };
  }

  await article.remove();
  return "Article deleted successfully.";
};
