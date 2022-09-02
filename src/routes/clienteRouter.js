const express = require("express");
const clienteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

const httpProxy = require("express-http-proxy");
const clienteServiceProxy = httpProxy('http://localhost:5001');

clienteRouter.post("/autocadastro", clienteServiceProxy);
clienteRouter.put("/depositar/:id", access.clientAccess, auth, clienteServiceProxy);
clienteRouter.put("/sacar/:id", access.clientAccess, auth, clienteServiceProxy);
clienteRouter.post("/transferir/:id", access.clientAccess, auth, clienteServiceProxy);
clienteRouter.get("/saldo/:id", access.clientAccess, auth, clienteServiceProxy);
clienteRouter.get("/extrato/:id", access.clientAccess, auth, clienteServiceProxy);

module.exports = clienteRouter;