const mysql = require("mysql2/promise");
require("dotenv").config();

const initMySQL = async () => {
  try {
    conn = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      timezone: "th",
    });
    console.log("database connected");
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
    setTimeout(initMySQL, 5000);
  }
};

module.exports = {
  initMySQL,
};
