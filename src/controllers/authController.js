const logout = async (req, res) => {
  try {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    return res
      .status(200)
      .json({ auth: false, token: null, msg: "Usuario deslogou!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = { logout };
