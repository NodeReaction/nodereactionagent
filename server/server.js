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

// CONTROLLERS
const agentController = require("./controllers/agentController");
const apiController = require("./controllers/apiController");

// API - ONLY TAKES JSON
app.use(bodyParser.json());

// AGENT - POSTS DATA TO SERVER
app.post(
  "/api/agent/data/save",
  agentController.validate,
  agentController.create,
  (req, res) => {
    res.end();
  }
);

// ROUTES
app.get("/api/getData", apiController.getTransactions, (req, res) => {
  res.json(res.locals.transactions);
});
app.get("/api/deleteData", apiController.deleteTransactions, (req, res) => {
  res.json({ msg: "allset" });
});

// START EXPRESS
app.listen(PORT, () => {
  console.log(
    `===========NODE REACTION SERVER===========\n\nListening on port: ${PORT}`
  );
});
