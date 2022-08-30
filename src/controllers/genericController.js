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
    // Esse teste deve ser feito invocando um serviço apropriado
    if (req.body.user === "admin" && req.body.password === "admin") {
      // auth ok
      const id = 1; // esse id viria do serviço de autenticação
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300, // expira em 5min
      });
      return res.json({ auth: true, token: token });
    }
    res.status(500).json({ message: "Login inválido!" });
  },
  async logout(req, res) {
    res.json({ auth: false, token: null });
  },
};
