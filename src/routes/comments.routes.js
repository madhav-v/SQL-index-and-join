const app = require("express").Router();

const commentsController = require("../controllers/comments.controller");

app.post("/", commentsController.createComment);

app.get("/post/:post_id", commentsController.getCommentsForPost);

app.put("/:comment_id", commentsController.updateComment);

app.delete("/:comment_id", commentsController.deleteComment);

module.exports = app;
