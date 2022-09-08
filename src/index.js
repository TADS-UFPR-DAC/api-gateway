const express = require("express");
const app = express();
const router = require("./routes/router");
const Broker = require("./services/rabbitmq");

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
app.use(logger('dev'));
app.use(helmet());
app.use(cookieParser);


app.use(async (req, res, next) => {
  try {
    const RMQProducer = await new Broker().init();
    // we now have access to rabbitMQ
    next();
  } catch (error) {
    process.exit(1);
  }
});
app.use((req, res, next) => {
  next(creatError.NotFound());
});

app.listen(process.env.SYSTEM_PORT, () => {
  console.log("Server running on port ", process.env.SYSTEM_PORT);
});

module.exports = app;
