const express = require("express");
const genericRouter = express.Router();
const genericController = require("../controllers/genericController");

const auth = require("../middlewares/auth");

genericRouter.post("/login", genericController.login);
genericRouter.post("/logout", genericController.logout);
genericRouter.post("/autocadastro", );

module.exports = genericRouter;