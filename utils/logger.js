/********************************************************************************************
 * @Purpose   : Config the logger.
 * @file      : logger.js
 * @overview  : setup the winston logger to log user registration.
 * @author    : PRAVIN DESHMUKH
 * @since     : 10/10/2020
 ********************************************************************************************/

const { transports, format } = require("winston");
const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "./logs/errorMessage.log",
      level: "error",
      format: winston.format.json(),
    }),

    new winston.transports.File({
      filename: "./logs/infoMessage.log",
      level: "info",
      format: winston.format.json(),
    }),
  ],
});
module.exports = logger;
