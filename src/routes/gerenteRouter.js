const express = require("express");
const gerenteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

const httpProxy = require("express-http-proxy");
const gerenteServiceProxy = httpProxy('http://localhost:5002');

gerenteRouter.get("/autocadastro", access.managerAccess, auth, gerenteServiceProxy);
gerenteRouter.put("/autocadastro/aprova/:id", access.managerAccess, auth, gerenteServiceProxy);
gerenteRouter.put("/autocadastro/reprova/:id", access.managerAccess, auth, gerenteServiceProxy);
gerenteRouter.get("/clientes", access.managerAccess, auth, gerenteServiceProxy);
gerenteRouter.get("/clientes/:id", access.managerAccess, auth, gerenteServiceProxy);
gerenteRouter.get("/clientes/top5", access.managerAccess, auth, gerenteServiceProxy);

module.exports = gerenteRouter;