"use strict";

const Transaction = require("./../models/TransactionModel").Transaction;
const Trace = require("./../models/TransactionModel").Trace;

const agentController = {};

agentController.validate = (req, res, next) => {
  next();
}

agentController.create = (req, res, next) => {
  const transactions = req.body.transactions;
  const d = new Date();
  console.log(`
    ===========Server received data from Agent===========
    time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
    transactions sent: ${JSON.stringify(transactions.length)}
    `);

  transactions.forEach(transaction => {
    //console.log(JSON.stringify(transaction));

    let trans = new Transaction({
      route: transaction.route,
      method: transaction.method,
      userAgent: transaction.userAgent,
      rawHeaders: transaction.rawHeaders,
      cookies: transaction.cookies,
      remoteAddress: transaction.remoteAddress,
      startTimestamp: transaction.traceTimer.startTimestamp,
      endTimestamp: transaction.traceTimer.endTimestamp,
      duration: transaction.traceTimer.duration
    });
    transaction.traces.forEach(trace => {
      trans.traces.push({
        route: transaction.route,
        method: transaction.method,
        library: trace.library,
        type: trace.type,
        startTimestamp: trace.traceTimer.startTimestamp,
        endTimestamp: trace.traceTimer.endTimestamp,
        duration: trace.traceTimer.duration
      });
    });
    console.log(
      `Attempting transaction save to database: ${transaction.method} ${
        transaction.route
      }`
    );
    trans.save((err, data) => {
      if (err) return console.log(err);
      console.log(`Transaction saved to database: ${data.route}`)
    });
  });
  next();
};

module.exports = agentController;
