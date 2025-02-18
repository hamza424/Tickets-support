const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const port = 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
