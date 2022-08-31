const express = require("express");
const app = express();
const router = require("./routes/router");

const jwt = require("jsonwebtoken");
var http = require("http");
const httpProxy = require("express-http-proxy");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
const helmet = require("helmet");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);



app.listen(process.env.SYSTEM_PORT, () => {
    console.log("Server running on port ", process.env.SYSTEM_PORT);
});

module.exports = app;