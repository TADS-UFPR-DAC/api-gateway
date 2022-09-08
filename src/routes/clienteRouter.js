const express = require("express");
const clienteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");
const clienteController = require("../controllers/clienteController");

const httpProxy = require("express-http-proxy");
const clienteServiceProxy = httpProxy('http://localhost:5001');

clienteRouter.post("/autocadastro", clienteServiceProxy);
//clienteRouter.put("/depositar/:id", auth, access.clientAccess, clienteController.depositar);
clienteRouter.put("/depositar/:id", clienteController.depositar);
clienteRouter.put("/sacar/:id", auth, access.clientAccess, clienteServiceProxy);
clienteRouter.post("/transferir/:id", auth, access.clientAccess, clienteServiceProxy);
clienteRouter.get("/saldo/:id", auth, access.clientAccess, clienteServiceProxy);
clienteRouter.get("/extrato/:id", auth, access.clientAccess, clienteServiceProxy);

module.exports = clienteRouter;