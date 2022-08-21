const express = require("express");
const genericRouter = require("./genericRouter");
const adminRouter = require("./adminRouter");
const managerRouter = require("./managerRouter");
const clientRouter = require("./clientRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("API Gateway is running!");
});

router.use("/generic", genericRouter);
router.use("/admin", adminRouter);
router.use("/manager", managerRouter);
router.use("/client", clientRouter);

module.exports = router;