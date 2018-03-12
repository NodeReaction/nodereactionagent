'use strict';

// EXPRESS
const express = require('express');
const request = require('request');
const router = express.Router();

// CONTROLLERS
const apiController = require('../controllers/apiController');

// ROUTES
router.get('/getRoutes',
  apiController.getRoutes,
  (req, res) => {
    res.send(res.locals.routes);
  }
);

// DEFAULT ROUTES
router.all('*', (req, res, next) => {
    err = new Error('apiRouter.js - default catch all route - not found');
    err.status = 404;
    next(err);
});

module.exports = router;
