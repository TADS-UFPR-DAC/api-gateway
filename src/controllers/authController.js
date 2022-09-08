const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async logout(req, res) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    return res
      .status(200)
      .json({ auth: false, token: null, msg: "Usuario deslogou!" });
  },
};
