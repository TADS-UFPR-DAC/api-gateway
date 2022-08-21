const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(id, type) {
  process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
  const token = jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
}

module.exports = {
  async login(req, res) {
    const authServiceProxy = httpProxy("http://localhost:5000", {
      proxyReqBodyDecorator: function (bodyContent, srcReq) {
        try {
          retBody = {};
          retBody.login = bodyContent.user;
          retBody.senha = bodyContent.password;
          bodyContent = retBody;
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
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300, // expira em 5min
          });
          userRes.status(200);
          return { auth: true, token: token, data: objBody };
        } else {
          userRes.status(401);
          return { message: "Login inválido!" };
        }
      },
    });
  },
  async logout(req, res) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    return res.status(200).json({ msg: "Usuario deslogou!" });
  },
};
