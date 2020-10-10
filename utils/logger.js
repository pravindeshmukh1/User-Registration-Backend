/********************************************************************************************
 * @Purpose   : Config the logger.
 * @file      : logger.js
 * @overview  : setup the winston logger to log user registration.
 * @author    : PRAVIN DESHMUKH
 * @since     : 10/10/2020
 ********************************************************************************************/

const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      handleExceptions: true,
      colorize: true,
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      level: "error",
      handleExceptions: true,
      colorize: true,
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      name: "info.log",
      level: "info",
      filename: "./logs/info.log",
      handleExceptions: true,
      format: format.combine(format.timestamp(), format.simple()),
    }),
    new transports.File({
      name: "error.log",
      level: "error",
      filename: "./logs/error.log",
      handleExceptions: true,
      format: format.combine(format.timestamp(), format.simple()),
    }),
  ],
});
module.exports = logger;
