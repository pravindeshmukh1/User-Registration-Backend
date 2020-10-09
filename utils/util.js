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
