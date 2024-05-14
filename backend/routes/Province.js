const { Router } = require("express");
const router = Router();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const provinceControllers = require("../controllers/province/provinceControllers");

router.get("/", provinceControllers.controllers.getProvince);
router.get(
  "/amphures/:provinceId",
  provinceControllers.controllers.getAmphures
);
router.get("/tambons/:amphureId", provinceControllers.controllers.getTambons);

module.exports = router;
