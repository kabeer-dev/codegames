const express = require("express");
const { handleResponse, handleError } = require('../utils/responses')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const User = require('../models/user')

exports.adminLogin = async (req, res) => {
  const body = req.body;
  try {
    User.findOne({
      email: body.email
    }).then((user) => {
      if (!user) {
        return handleError(res, "User Not found.", 404);
      }

      var passwordIsValid = bcrypt.compareSync(body.password, user.password);

      if (!passwordIsValid) {
        return handleError(res, "Invalid Password!", 401)
      }

      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      if (token) {
        handleResponse(res, {
          user,
          accessToken: token,
        })
      }
    })
  } catch (error) {
    console.error("Error occurred:", error);
    return handleError(res, "An error occurred.", 500);
  }
}


