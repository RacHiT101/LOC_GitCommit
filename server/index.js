const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();

const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString);

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const publicRoomRouter = require("./routes/publicRoomRoutes");
const privateRoomRouter = require("./routes/privateRoomRoutes");
const chatRouter = require("./routes/chatRoute");
const friendRouter = require("./routes/friendRoute");


const { firebaseAuth } = require("./middlewares/firebaseAuth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/publicRooms", publicRoomRouter);
app.use("/api/privateRooms", privateRoomRouter);
app.use("/api/products", productRouter);
app.use("/api/chats", chatRouter);
app.use("/api/friends", friendRouter);





// app.use(firebaseAuth)

app.get("/api/secure", (req, res) => {
    res.json(`Authentication succeed. Hi ${req.user.name}`);
  });
  
  module.exports = app;
