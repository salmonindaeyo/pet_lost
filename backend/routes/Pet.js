const { Router } = require("express");
const router = Router();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const petControllers = require("../controllers/pet/petControllers");

const createPetSchema = Joi.object({
  name: Joi.string().min(1).max(45).required(),
  image: Joi.string().required(),
  status: Joi.string().valid("LOST", "FOUND").required(),
  species: Joi.string().min(1).max(45).required(),
  color: Joi.string().min(1).max(45).required(),
  age: Joi.number().integer().min(0).required(),
  description: Joi.string().required(),
  reward: Joi.string().max(300).required(),
  gender: Joi.string().valid("Male", "Female").required(),
  type: Joi.string().valid("LOOK_FOR_OWNER", "LOST_PET").required(),
  petCategory_id: Joi.number().integer().required(),
  users_id: Joi.number().integer().required(),
  provinces_id: Joi.number().integer().required(),
  amphures_id: Joi.number().integer().required(),
  tambons_id: Joi.number().integer().required(),
  address: Joi.string().min(1).required(),
  lost_date: Joi.date().required(),
});

router.post(
  "/",
  validator.body(createPetSchema),
  petControllers.controllers.postPet
);
router.get("/", petControllers.controllers.getPets);
router.get("/:id", petControllers.controllers.getMyPets);
router.delete("/:id", petControllers.controllers.deletePet);
router.put("/:id", petControllers.controllers.updatePet);

module.exports = router;
