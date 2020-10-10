/********************************************************************************************
 * @Purpose   : Jwt Web Token Create.
 * @file      : auth.js
 * @overview  : generate token is used for web token.
 * @author    : PRAVIN DESHMUKH
 * @since     : 10/10/2020
 ********************************************************************************************/
const jwt = require("jsonwebtoken");

let generateToken = (paylod) => {
  let token = jwt.sign(paylod, "secret");
  return token;
};

module.exports = { generateToken };
