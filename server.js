/********************************************************************************************
 * @Purpose   : Config the Server.
 * @file      : server.js
 * @overview  : start server using port and pass the all request and get respose.
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 ********************************************************************************************/

const bodyParser = require("body-parser");
const express = require("express");
const expressValidator = require("express-validator");
const routers = require("./routers/user");
const logger = require("./utils/logger");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
require("./config/dbConfig").databaseConnection();

app.use(routers);
app.use("/", (req, res) => {
  res.json("Welcome to the User Registration");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  logger.info(`Server is listen port no.${PORT}`);
});
module.exports = app;
