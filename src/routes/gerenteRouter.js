const express = require("express");
const gerenteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

const httpProxy = require("express-http-proxy");
const gerenteServiceProxy = httpProxy('http://localhost:5002');

gerenteRouter.get("/autocadastro", auth, access.managerAccess, gerenteServiceProxy);
gerenteRouter.put("/autocadastro/aprova/:id", auth, access.managerAccess, gerenteServiceProxy);
gerenteRouter.put("/autocadastro/reprova/:id", auth, access.managerAccess, gerenteServiceProxy);
gerenteRouter.get("/clientes", auth, access.managerAccess, gerenteServiceProxy);
gerenteRouter.get("/clientes/:id", auth, access.managerAccess, gerenteServiceProxy);
gerenteRouter.get("/clientes/top5", auth, access.managerAccess, gerenteServiceProxy);

module.exports = gerenteRouter;