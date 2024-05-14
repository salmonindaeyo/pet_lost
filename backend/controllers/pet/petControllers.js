const postPet = require("./postPet");
const getPets = require("./getPets");
const getMyPets = require("./getMypets");
const deletePet = require("./deletePet");
const updatePet = require("./updatePet");
exports.controllers = {
  postPet,
  getPets,
  getMyPets,
  deletePet,
  updatePet,
};
