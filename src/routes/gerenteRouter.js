const express = require("express");
const gerenteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

const httpProxy = require("express-http-proxy");
const gerenteServiceProxy = httpProxy('http://localhost:5002');

gerenteRouter.post("/consultar-cliente", access.managerAccess, auth, gerenteServiceProxy);
gerenteRouter.post("/consultar-cinco", access.managerAccess, auth, gerenteServiceProxy);

module.exports = gerenteRouter;