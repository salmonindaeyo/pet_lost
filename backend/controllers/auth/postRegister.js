const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_KEY;
require("dotenv").config();

const postRegister = async (req, res) => {
  const { username, email, password, phone } = req.body;

  const [rows] = await conn.query(
    "SELECT * FROM users WHERE username = ?",
    username
  );
  if (rows.length) {
    return res.status(400).send({ message: "username is already registered" });
  }

  const [rows2] = await conn.query(
    "SELECT * FROM users WHERE email = ?",
    email
  );
  if (rows2.length) {
    return res.status(400).send({ message: "email is already registered" });
  }

  const hash = await bcrypt.hash(password, 10);
  const userData = {
    username: username,
    password: hash,
    email: email,
    phone: phone,
  };

  try {
    const result = await conn.query("INSERT INTO users SET ?", userData);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "insert fail",
      error,
    });
  }

  res
    .status(201)
    .send({ status: 201, message: "User registered successfully" });
};

module.exports = postRegister;
