const express = require("express");
const adminRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

const httpProxy = require("express-http-proxy");
const gerenteServiceProxy = httpProxy('http://localhost:5002');

adminRouter.post("/listar-gerente", access.adminAccess, auth, gerenteServiceProxy);
adminRouter.post("/gerente/novo", access.adminAccess, auth, gerenteServiceProxy);
adminRouter.post("/gerente/editar/:id", access.adminAccess, auth, gerenteServiceProxy);

module.exports = adminRouter;