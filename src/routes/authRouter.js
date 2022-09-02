const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

const httpProxy = require("express-http-proxy");
const authServiceProxy = httpProxy('http://localhost:5003');

authRouter.post("/login", authController.login, authServiceProxy);
authRouter.post("/logout", authController.logout, authServiceProxy);

module.exports = authRouter;