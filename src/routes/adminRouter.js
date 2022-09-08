const express = require("express");
const adminRouter = express.Router();
const auth = require("../middlewares/auth");
const access = require("../middlewares/accessLevel");

const httpProxy = require("express-http-proxy");
const gerenteServiceProxy = httpProxy('http://localhost:5002');

adminRouter.get("/gerentes", auth, access.adminAccess, gerenteServiceProxy);
adminRouter.get("/gerentes/:id", auth, access.adminAccess, gerenteServiceProxy);
adminRouter.post("/gerentes", auth, access.adminAccess, gerenteServiceProxy);
adminRouter.put("/gerentes/:id", auth, access.adminAccess, gerenteServiceProxy);
adminRouter.delete("/gerentes/:id", auth, access.adminAccess, gerenteServiceProxy);

module.exports = adminRouter;