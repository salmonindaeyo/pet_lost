const express = require("express");
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
require("dotenv").config();
const verifyToken = require("./middleware/auth");
const CourseRoutes = require("./routes/Course");
const ManageRoutes = require("./routes/Manage");
const UserRoutes = require("./routes/User");
const cors = require("cors");
const { initMySQL } = require("./configs/db"); // import db module

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: true,
  })
);
app.options("*", cors());
//route
app.use("/api/course", verifyToken, CourseRoutes);
app.use("/api/manage", verifyToken, ManageRoutes);
app.use("/api/user", UserRoutes);

app.listen(port, async () => {
  await initMySQL();
  console.log(`Server started at port ${port}`);
  console.log(process.env.DATABASE_NAME);
  console.log("cors update! 7");
});

app.get("/", async (req, res) => {
  res.send("hello from backend");
});
