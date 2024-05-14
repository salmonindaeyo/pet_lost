const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_KEY;
require("dotenv").config();

const postInform = async (req, res) => {
  const { message, image, pets_id, users_id } = req.body;

  const InformData = {
    image: image,
    message: message,
    users_id: users_id,
    pets_id: pets_id,
  };

  try {
    const result = await conn.query("INSERT INTO informs SET ?", InformData);

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
module.exports = postInform;
