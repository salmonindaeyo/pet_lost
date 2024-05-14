const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_KEY;
require("dotenv").config();

const postLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const [userResult] = await conn.query(
      "SELECT * from users WHERE username = ?",
      username
    );
    const user = userResult[0];
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, user.password);
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
        id: user.id,
        username: user.username,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Something went wrong Please try again." });
  }
};

module.exports = postLogin;
