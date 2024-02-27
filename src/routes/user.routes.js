const app = require("express").Router();
const authCtrl = require("../controllers/user.controller");

app.post("/login", authCtrl.login);

app.post("/register", authCtrl.register);
module.exports = app;
