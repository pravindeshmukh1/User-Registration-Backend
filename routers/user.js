/*******************************************************************************************
 * @Purpose   : Define user registration app routes
 * @file      : user.js
 * @overview  : define routes for api
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 *******************************************************************************************/

const router = require("express").Router();
const userController = require("../controller/user");

router.post("/register", userController.registerUser);

module.exports = router;
