const express = require("express");
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
require("dotenv").config();
const verifyToken = require("./middleware/auth");
const UserRoutes = require("./routes/User");
const ProvinceRoutes = require("./routes/Province");
const PetRoutes = require("./routes/Pet");
const InformRoutes = require("./routes/Inform");

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
app.use(express.json());

app.options("*", cors());
//route
// app.use("/api/course", verifyToken, CourseRoutes);
// app.use("/api/manage", verifyToken, ManageRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/province", ProvinceRoutes);
app.use("/api/pet", PetRoutes);
app.use("/api/inform", InformRoutes);

app.listen(port, async () => {
  await initMySQL();
  console.log(`Server started at port ${port}`);
  console.log(process.env.DATABASE_NAME);
  console.log("cors update! 7");
});

app.get("/", async (req, res) => {
  res.send("hello from backend");
});
