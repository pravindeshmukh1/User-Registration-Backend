/*******************************************************************************************
 * @Purpose   : Register and Login User
 * @file      : user.js
 * @overview  : Register and login buisness logic
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 *******************************************************************************************/

const userModel = require("../app/models/user");

class UserService {
  
  createService(data) {
    return new Promise((resolve, reject) => {
      userModel.createUser(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
module.exports = new UserService();
