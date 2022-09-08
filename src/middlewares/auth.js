const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ auth: false, msg: "Token indefinido." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, msg: "Falha na autenticação do token." });
    }
    if (decoded.type === "admin") req.type = "admin";
    else if (decoded.type === "gerente") req.type = "gerente";
    else if (decoded.type === "cliente") req.type = "cliente";
    else req.type = "invalido";
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;
