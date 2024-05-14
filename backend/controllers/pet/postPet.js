const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_KEY;
require("dotenv").config();

const postPet = async (req, res) => {
  const {
    name,
    image,
    status,
    species,
    color,
    age,
    description,
    reward,
    gender,
    type,
    petCategory_id,
    areas_id,
    users_id,
    provinces_id,
    amphures_id,
    tambons_id,
    address,
    lost_date,
  } = req.body;

  const petData = {
    name: name,
    image: image,
    status: status,
    species: species,
    color: color,
    age: age,
    description: description,
    reward: reward,
    gender: gender,
    type: type,
    petCategory_id: petCategory_id,
    users_id: users_id,
    lost_date: lost_date,
  };

  const area = {
    province_id: provinces_id,
    amphure_id: amphures_id,
    tambon_id: tambons_id,
    address: address,
  };

  try {
    const result = await conn.query("INSERT INTO areas SET ?", area);
    petData.areas_id = result[0].insertId;
    const resultPet = await conn.query("INSERT INTO pets SET ?", petData);

    res
      .status(201)
      .json({ status: 201, message: "areas inserted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: "Failed to insert pet",
      error: error,
    });
  }
};
module.exports = postPet;
