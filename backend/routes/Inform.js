const { Router } = require("express");
const router = Router();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const informControllers = require("../controllers/Inform/informControllers");

const createInformSchema = Joi.object({
  message: Joi.string().min(1).max(505).required(),
  pets_id: Joi.number().integer().required(),
  users_id: Joi.number().integer().required(),
  image: Joi.string().min(1).required(),
});
router.post(
  "/",
  validator.body(createInformSchema),
  informControllers.controllers.postInform
);
router.get("/:petId", informControllers.controllers.getInforms);

module.exports = router;
