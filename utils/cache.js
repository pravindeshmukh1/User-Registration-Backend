/*******************************************************************************************
 * @Purpose   : Cache used for login.
 * @file      : cache.js
 * @overview  : cache service
 * @author    : PRAVIN DESHMUKH
 * @since     : 10/10/2020
 *******************************************************************************************/

const redis = require("redis");
const logger = require("./logger");
const redisClient = redis.createClient();

redisClient.on("connect", () => {
  logger.info("redis client connected");
});

redisClient.on("error", () => {
  logger.error(`Something wrong ${error}`);
});

class CacheService {
  set(key, value, callback) {
    redisClient.set(key, value, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}
module.exports = new CacheService();
