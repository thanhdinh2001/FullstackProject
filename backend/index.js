const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/tetris",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("DB Connected!");
    }
  }
);

const router = require("./api");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(router);

app.listen(5000, () => {
  console.log("Server is running");
});
