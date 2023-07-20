require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/dbConnect");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

dbConnect();
app.use("/posts", require("./routes/postsRoutes"));

app.use("/users", require("./routes/userRoutes"));

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(process.env.PORT, () => {
    console.log("server running");
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
