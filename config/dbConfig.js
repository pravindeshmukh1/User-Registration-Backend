/*******************************************************************************************
 * @Purpose   : Database Connection Configure.
 * @file      : userModel.js
 * @overview  : create database connection using mongoose.
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 *******************************************************************************************/

const mongoose = require("mongoose");
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
      console.log("Database Connect..");
    })
    .catch((error) => {
      console.error(`Database Connection Error:- ${error}`);
      process.exit();
    });
};
