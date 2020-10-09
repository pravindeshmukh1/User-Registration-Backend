/*******************************************************************************************
 * @Purpose   : Register and Login User
 * @file      : user.js
 * @overview  : Register and login buisness logic
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 *******************************************************************************************/

const userModel = require("../app/models/user");
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
              statusCode: 422,
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
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
module.exports = new UserService();
