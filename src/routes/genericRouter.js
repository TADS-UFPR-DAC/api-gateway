const express = require("express");
const genericRouter = express.Router();
const genericController = require("../controllers/genericController");

const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

genericRouter.post("/login", genericController.login);
genericRouter.post("/logout", genericController.logout);

module.exports = genericRouter;