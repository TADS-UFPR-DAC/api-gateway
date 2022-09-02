const express = require("express");
const adminRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

const httpProxy = require("express-http-proxy");
const gerenteServiceProxy = httpProxy('http://localhost:5002');

adminRouter.get("/admin/gerentes/:id", access.adminAccess, auth, gerenteServiceProxy);
adminRouter.post("/gerentes", access.adminAccess, auth, gerenteServiceProxy);
adminRouter.put("/gerentes/:id", access.adminAccess, auth, gerenteServiceProxy);
adminRouter.delete("/gerentes/:id", access.adminAccess, auth, gerenteServiceProxy);

module.exports = adminRouter;