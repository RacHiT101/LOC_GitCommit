const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString);

const { firebaseAuth } = require("./middlewares/firebaseAuth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.use(firebaseAuth)

app.get("/api/secure", [firebaseAuth], (req, res) => {
    res.json(`Authentication succeed. Hi ${req.user.name}`);
  });
  
  module.exports = app;
