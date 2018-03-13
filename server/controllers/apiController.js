"use strict";

const apiController = {};
const Transaction = require("./../models/TransactionModel").Transaction;
const Trace = require("./../models/TransactionModel").Trace;

apiController.getTransactions = (req, res, next) => {
  Transaction.find({})
    .then(transactions => {
      console.log("TransactionModel.getRoutes: ", transactions);
      res.locals.transactions = transactions;
      next();
    })
    .catch(err => {
      console.log("TransactionModel.getRoutes - database error: " + err);
      next(err);
    });
};

// RouteList - (timeRange) - simple list of unique routeNames over the time range
apiController.deleteTransactions = (req, res, next) => {
  Transaction.deleteMany({})
    .then(data => {
      console.log("Successful delete: ", data);
      res.send("Successful delete");
    })
    .catch(err => {
      console.log("Error delete: ", err);
      res.send("Error delete");
    });
};

module.exports = apiController;
