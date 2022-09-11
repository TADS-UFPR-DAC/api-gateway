const express = require("express");
const clienteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");
const clienteController = require("../controllers/clienteController");

clienteRouter.post("/autocadastro", clienteController.autocadastro);
clienteRouter.put("/depositar/:id", auth, access.clientAccess, clienteController.depositar);
clienteRouter.put("/sacar/:id", auth, access.clientAccess, clienteController.sacar);
clienteRouter.put("/transferir/:id1/:id2", auth, access.clientAccess, clienteController.transferir);
clienteRouter.get("/extrato/:id", auth, access.clientAccess, clienteController.extrato);
clienteRouter.get("/saldo/:id", auth, access.clientAccess, clienteController.saldo);

module.exports = clienteRouter;