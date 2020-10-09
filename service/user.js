/*******************************************************************************************
 * @Purpose   : Register and Login User
 * @file      : user.js
 * @overview  : Register and login buisness logic
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 *******************************************************************************************/

const userModel = require("../app/models/user");

class UserService {
  
  createService(req) {
    return new Promise((resolve, reject) => {
      userModel
        .findOne({ emailId: req.emailid })
        .then((data) => {
          if (data) {
            reject({ message: "Already email register" });
          } else
            userModel.createUser(req, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
module.exports = new UserService();
