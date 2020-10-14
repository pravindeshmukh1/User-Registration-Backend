/*******************************************************************************************
 * @Purpose   : Register and Login User
 * @file      : user.js
 * @overview  : Register and login buisness logic
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 *******************************************************************************************/

const userModel = require("../app/models/user");
const logger = require("../utils/logger");
const util = require("../utils/util");

class UserService {
  createService(req) {
    return new Promise((resolve, reject) => {
      userModel
        .findOne({ emailId: req.emailid })
        .then((data) => {
          if (data) {
            reject({
              message: `Already '${data.emailId}' email register`,
              status: false,
              statusCode: 409,
            });
          } else {
            let hash = util.hashPassword(req.password);
            hash.then((data) => {
              let userData = {
                firstname: req.firstname,
                lastname: req.lastname,
                emailid: req.emailid,
                password: data,
              };
              userModel.createUser(userData, (err, result) => {
                if (err) {
                  logger.error("User not create ");
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            });
          }
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  loginService(req, callback) {
    const resResult = {};
    userModel
      .findOne({ emailId: req.emailid })
      .then((data) => {
        util.comparePassword(req.password, data.password, (err, result) => {
          if (err) {
            callback(err);
          } else if (result) {
            userModel.loginUser(data, (err, res) => {
              if (err) callback(err);
              else callback(null, res);
            });
          } else {
            callback({
              message: `Password Does not match`,
              status: false,
              statusCode: 401,
            });
          }
        });
      })
      .catch((error) => {
        logger.error(`User not found ${error}`);
        callback({ message: "User not found", status: false, statusCode: 401 });
      });
  }
}
module.exports = new UserService();
