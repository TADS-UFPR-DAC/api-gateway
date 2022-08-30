const express = require("express");
const clienteRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

const httpProxy = require("express-http-proxy");
const clienteServiceProxy = httpProxy('http://localhost:5001');

clienteRouter.post("/consultar-extrato", access.clientAccess, auth, clienteServiceProxy);
clienteRouter.post("/depositar", access.clientAccess, auth, clienteServiceProxy);
clienteRouter.post("/sacar", access.clientAccess, auth, clienteServiceProxy);
clienteRouter.post("/transferir", access.clientAccess, auth, clienteServiceProxy);

module.exports = clienteRouter;