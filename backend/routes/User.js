const { Router } = require("express");
const router = Router();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { initMySQL } = require("../configs/db"); // import db module

const secret = process.env.TOKEN_KEY;

router.post("/login", express.json(), async function (req, res, next) {
  try {
    const { userDetailData } = req.body;

    const [userResult] = await conn.query(
      "SELECT * from users WHERE username = ?",
      userDetailData.username
    );
    const user = userResult[0];

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(userDetailData.password, user.password);
    if (!match) {
      return res.status(400).send({ message: `Invalid username or password ` });
    }
    const token = jwt.sign(
      { userId: user.user_id, username: user.username },
      secret,
      {
        expiresIn: "24h",
      }
    );
    res.send({
      message: "Login successful",
      token,
      user: {
        id: user.userId,
        username: user.username,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Something went wrong Please try again." });
  }
});

router.post("/register", express.json(), async function (req, res, next) {
  const { userDetailRegisData } = req.body;

  const [rows] = await conn.query(
    "SELECT * FROM users WHERE username = ?",
    userDetailRegisData.username
  );
  if (rows.length) {
    return res.status(400).send({ message: "username is already registered" });
  }

  const [rows2] = await conn.query(
    "SELECT * FROM users WHERE email = ?",
    userDetailRegisData.email
  );
  if (rows2.length) {
    return res.status(400).send({ message: "email is already registered" });
  }

  const hash = await bcrypt.hash(userDetailRegisData.password, 10);
  const userData = {
    username: userDetailRegisData.username,
    password: hash,
    email: userDetailRegisData.email,
    phone: userDetailRegisData.phone,
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
});

module.exports = router;
