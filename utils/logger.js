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
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.json()
      ),
    }),
    new transports.File({
      filename: "./logs/user.log",
      handleExceptions: true,
      format: format.combine(format.timestamp(), format.simple()),
    }),
  ],
});
module.exports = logger;
