"use strict";

// EXPRESS
const express = require("express");
const request = require("request");
const router = express.Router();

// CONTROLLERS
const agentController = require("./../controllers/agentController");
const applicationController = require("./../controllers/applicationController");
const routeController = require("./../controllers/routeController");
const traceController = require("./../controllers/traceController");
const apiController = require("./../controllers/apiController");

// ROUTES
// AGENT - POSTS DATA TO SERVER
router.post(
  "/agent/data/save",
  agentController.validate,
  agentController.create,
  (req, res) => {
    res.end();
  }
);

// ROUTES
router.get("/getData", apiController.getTransactions, (req, res) => {
  res.json(res.locals.transactions);
});
router.get("/deleteData", apiController.deleteTransactions, (req, res) => {
  res.json({ msg: "allset" });
});

// DEFAULT ROUTES
router.all("*", (req, res, next) => {
  const err = new Error(`apiRouter.js - default catch all route - not found - ${req.url}`);
  err.status = 404;
  next(err);
});

module.exports = router;
