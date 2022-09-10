const express = require("express");
const gerenteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");
const gerenteController = require("../controllers/gerenteController");

const httpProxy = require("express-http-proxy");
const gerenteServiceProxy = httpProxy('http://localhost:5002');

gerenteRouter.get("/autocadastro", auth, access.managerAccess, gerenteController.listarAutocadastro);
gerenteRouter.put("/autocadastro/aprova/:id", auth, access.managerAccess, gerenteController.aprovarAutocadastro);
gerenteRouter.put("/autocadastro/reprova/:id", auth, access.managerAccess, gerenteController.reprovarAutocadastro);
gerenteRouter.get("/clientes", auth, access.managerAccess, gerenteController.consultarClientes);
gerenteRouter.get("/clientes/:id", auth, access.managerAccess, gerenteController.consultaCliente);
gerenteRouter.get("/clientes/top5", auth, access.managerAccess, gerenteController.consultaTopClientes);

module.exports = gerenteRouter;