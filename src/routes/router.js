const express = require("express");
const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
const gerenteRouter = require("./gerenteRouter");
const clienteRouter = require("./clienteRouter");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("API Gateway is running!");
});

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/gerente", gerenteRouter);
router.use("/cliente", clienteRouter);

module.exports = router;