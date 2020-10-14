/*******************************************************************************************
 * @Purpose   : Database Connection Configure.
 * @file      : userModel.js
 * @overview  : create database connection using mongoose.
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 *******************************************************************************************/

const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();

const dburl = process.env.MONGO_DB_URL;

exports.databaseConnection = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      logger.log("info", "Database Connect..");
    })
    .catch((error) => {
      logger.log("error", `Database Connection Error:- ${error}`);
      process.exit();
    });
};
