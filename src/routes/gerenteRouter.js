const express = require("express");
const gerenteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");
const gerenteController = require("../controllers/gerenteController");

const httpProxy = require("express-http-proxy");

gerenteRouter.get("/autocadastro", auth, access.managerAccess, gerenteController.listarAutocadastro);
gerenteRouter.put("/autocadastro/aprova/:id", auth, access.managerAccess, gerenteController.aprovarAutocadastro);
gerenteRouter.put("/autocadastro/reprova/:id", auth, access.managerAccess, gerenteController.reprovarAutocadastro);
gerenteRouter.get("/clientes", auth, access.managerAccess, gerenteController.consultarClientes);
gerenteRouter.get("/clientes/:cpf", auth, access.managerAccess, gerenteController.consultaCliente);
gerenteRouter.get("/top", auth, access.managerAccess, gerenteController.consultaTopClientes);

module.exports = gerenteRouter;

