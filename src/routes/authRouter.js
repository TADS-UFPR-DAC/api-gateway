const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authRouter = express.Router();
const authController = require("../controllers/authController");

const httpProxy = require("express-http-proxy");


authRouter.post("/login", (req, res, next) => {
  authServiceProxy(req, res, next);
});

authRouter.post("/logout", authController.logout);

function generateToken(id, type) {
  process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
  const token = jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
}

function hashPassword (password){
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

const authServiceProxy = httpProxy("http://localhost:5003", {
  proxyReqBodyDecorator: function (bodyContent, srcReq) {
    try {
      retBody = {};
      const hash = hashPassword(bodyContent.password);
      retBody.login = bodyContent.user;
      retBody.senha = hash;
      bodyContent = retBody;
      console.log(bodyContent);
    } catch (e) {
      console.log("- ERRO: " + e);
    }
    return bodyContent;
  },
  proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
    proxyReqOpts.headers["Content-Type"] = "application/json";
    proxyReqOpts.method = "POST";
    return proxyReqOpts;
  },
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    if (proxyRes.statusCode == 200) {
      var str = Buffer.from(proxyResData).toString("utf-8");
      var objBody = JSON.parse(str);
      const id = objBody.id;
      const idPessoa = objBody.idPessoa;
      const perfil = objBody.perfil;
      const token = generateToken(id, perfil);
      userRes.status(200);
      return { auth: true, id: idPessoa, perfil: perfil, token: token };
    } else {
      userRes.status(401);
      return { message: "Login inválido!" };
    }
  },
});

module.exports = authRouter;
