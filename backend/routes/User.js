const { Router } = require("express");
const router = Router();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const authControllers = require("../controllers/auth/authControllers");

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  username: Joi.string().required(),
});
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);
router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

module.exports = router;
