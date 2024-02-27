const LikesController = require("../controllers/likes.controller");

const app = require("express").Router();

app.post("/", LikesController.likePost);

// Unlike a post
app.delete("/:like_id", LikesController.unlikePost);

module.exports = app;
