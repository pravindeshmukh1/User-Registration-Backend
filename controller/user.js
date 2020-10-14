/****************************************************************************************************************
 * Purpose    : Read the user Input as Request and send the Respose to user
 * @file      : userController.js
 * @overview  : accept the user input and validate request to pass services layer and send respose form service layer
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 ****************************************************************************************************************/
const userService = require("../service/user");
const logger = require("../utils/logger");
const authentication = require("../auth/auth");
const cache = require("../utils/cache");

class UserController {
  async registerUser(req, res) {
    const resResult = {};
    try {
      req.check("firstName", "firstname should be valid").isLength({ min: 3 }),
        req.check("lastName", "lastname should be valid").isLength({ min: 3 }),
        req.check("emailId", "email id should be valid").isEmail(),
        req.check("password", "password should be valid").isLength({ min: 8 });
      let errors = await req.validationErrors();
      if (errors) {
        resResult.error = errors;
        resResult.status = false;
        res.status(422).send(resResult);
      } else {
        let userData = {
          firstname: req.body.firstName,
          lastname: req.body.lastName,
          emailid: req.body.emailId,
          password: req.body.password,
        };

        userService
          .createService(userData)
          .then((data) => {
            resResult.message = "Successfully registered";
            resResult.status = true;
            resResult.data = data;
            return res.status(200).send(resResult);
          })
          .catch((error) => {
            resResult.error = error;
            resResult.message = "Error at create new user";
            return res.status(422).send(resResult);
          });
      }
    } catch (error) {
      resResult.error = error;
      resResult.message = "Error Occurred";
      return res.status(500).send(resResult);
    }
  }

  async loginUser(req, res) {
    const resResult = {};
    try {
      req.check("emailId", "email id should be valid").isEmail(),
        req.check("password", "password should be valid").isLength({ min: 8 });
      let errors = await req.validationErrors();
      if (errors) {
        resResult.error = errors;
        resResult.status = false;
        res.status(422).send(resResult);
      }
      let loginData = {
        emailid: req.body.emailId,
        password: req.body.password,
      };
      userService.loginService(loginData, (err, data) => {
        if (err) {
          logger.error(err);
          return res.status(401).send(err);
        } else if (data) {
          let key = data.id + "loginSuccess";
          let payload = {
            id: data.id,
            emailid: data.emailid,
          };
          let token = authentication.generateToken(payload);
          cache.set(key, token, (err, success) => {
            if (err) {
              logger.error(err);
            } else {
              logger.info(success);
            }
          });

          logger.info("Successfully Login User");
          resResult.message = "Successfully Login User";
          resResult.status = true;
          resResult.session = token;
          resResult.response = data;
          return res.status(200).send(resResult);
        }
      });
    } catch (err) {
      resResult.success = false;
      resResult.data = err;
      res.status(404).send(resResult);
    }
  }
}
module.exports = new UserController();
