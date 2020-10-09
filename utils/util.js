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

module.exports = { hashPassword };
