const app = require("express").Router();
const postsController = require("../controllers/post.controller");

app.post("/", postsController.createPost);

app.get("/", postsController.getAllPosts);

app.get("/:post_id", postsController.getPostById);

app.put("/:post_id", postsController.updatePost);

app.delete("/:post_id", postsController.deletePost);

module.exports = app;
