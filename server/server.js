// NRA - running the agent on this server for testing
const NRA = require("./../NodeReaction");

// ENV FILES
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();
const PORT = 3000;

// MIDDLEWARE
const path = require("path");
const bodyParser = require("body-parser");

// MONOGO
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dogs");

// MYSQL
const connection = require('./dbconfig');

// ROUTERS
const apiRouter = require("./routers/apiRouter");

// API - ONLY TAKES JSON
app.use(bodyParser.json());

// ROUTES
app.use("/api", apiRouter);

// START EXPRESS
app.listen(PORT, () => {
  console.log(
    `===========NODE REACTION SERVER===========\n\nListening on port: ${PORT}`
  );
});
     