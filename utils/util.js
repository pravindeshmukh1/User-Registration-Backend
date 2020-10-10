/********************************************************************************************
 * @Purpose   : Bcrypt for password convet the hash.
 * @file      : util.js
 * @overview  : Password is used for encrypt and decrypt password using SHA-256 algorithm.
 * @author    : PRAVIN DESHMUKH
 * @since     : 10/10/2020
 ********************************************************************************************/
const bcrypt = require("bcrypt");

let hashPassword = (req) => {
  return new Promise((reslove, reject) => {
    bcrypt
      .hash(req, 10)
      .then((data) => {
        reslove(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let comparePassword = (req, data, callback) => {
  bcrypt.compare(req, data, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { hashPassword, comparePassword };
