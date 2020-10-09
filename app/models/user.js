/*******************************************************************************************
 * @Purpose   : User Database Schema create and Validation
 * @file      : userModel.js
 * @overview  : create schema for user registration and schema level validation
 * @author    : PRAVIN DESHMUKH
 * @since     : 08/10/2020
 *******************************************************************************************/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
      length: { min: 3, max: 10 },
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
      length: { min: 3, max: 10 },
      trim: true,
    },
    emailId: {
      type: String,
      required: [true, "Email Id is required"],
      index: {
        unique: true,
      },
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 character"],
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);

class UserModel {
  createUser(data, callback) {
    let createUser = new user({
      firstName: data.firstname,
      lastName: data.lastname,
      emailId: data.emailid,
      password: data.password,
    });
    createUser.save((err, res) => {
      if (err) {
        callback(err);
      }
      if (res) {
        callback(null, res);
      }
    });
  }

  findOne(req) {
    return new Promise((resolve, reject) => {
      user
        .findOne(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = new UserModel();
