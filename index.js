const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const PDFDoc = require("pdfkit");
const cors = require("cors");
require("dotenv").config();

const app = express();
const challanRoute = require("./routes/challanRoute");
const authenticationRoute = require("./routes/authenticationRoute");
const User = require("./models/user");
const userRoute = require("./routes/userRoute");
const Challan = require("./models/challan");
const contactRoute = require("./routes/contactRoute");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(challanRoute);

app.use(userRoute);

app.use(contactRoute);

app.use(authenticationRoute);

mongoose
  .connect(process.env.MONGO_CONNECTION_KEY)
  .then((result) => {
    console.log("Connected to goose");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
