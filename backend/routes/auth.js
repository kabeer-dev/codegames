const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middlewares/validateRequest");
const { body } = require("express-validator");
const { adminLogin } = require("../controllers/auth");

router.post(
  '/login',
  [
    body('email').notEmpty().withMessage('Email is required').if(body("new_email").notEmpty()).isEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  adminLogin
);

module.exports = router;
