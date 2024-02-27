const app = require("express").Router();
const usersRoutes = require("./user.routes");
const postRoutes = require("./posts.routes");
const likesRoutes = require("./likes.routes");
const commentsRoutes = require("./comments.routes");

app.use("/users", usersRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);

module.exports = app;
