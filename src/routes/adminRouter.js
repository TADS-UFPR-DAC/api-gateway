const express = require("express");
const adminRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");
const adminController = require("../controllers/adminController");

const httpProxy = require("express-http-proxy");

adminRouter.get("/gerentes", auth, access.adminAccess, adminController.listarGerentes);
adminRouter.get("/gerentes/:id", auth, access.adminAccess, adminController.listarGerente);
adminRouter.post("/gerentes", auth, access.adminAccess, adminController.inserirGerente);
adminRouter.put("/gerentes/:id", auth, access.adminAccess, adminController.editarGerente);
adminRouter.delete("/gerentes/:id", auth, access.adminAccess, adminController.deletarGerente);

module.exports = adminRouter;