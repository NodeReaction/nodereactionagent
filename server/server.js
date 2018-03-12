
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const Transaction = require("./models/TransactionModel").Transaction;
const Trace = require("./models/TransactionModel").Trace;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dogs");

app.use(express.static(__dirname + "./../"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data dump from agent
app.post("/api/agent/data/save", (req, res) => {
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
    console.log(`Attempting transaction save to database: ${transaction.method} ${transaction.route}`);
    trans.save((err, data) => {
      if (err) return console.log(err);
      return res.end();
    });
  });
  res.send("thank ya kindly");
});

// Data request from app
app.get("/getData", (req, res) => {
  console.log("Request recieved for data");
  Transaction.find({})
    .then(data => {
      console.log("Success");
      res.json(data);
    })
    .catch(err => {
      console.log("Error: ", err);
    });
});

app.get('/deleteData', (req, res) => {
    Transaction.deleteMany({})
        .then(data => {
            console.log('Successful delete: ', data);
            res.send('Successful delete')})
        .catch(err => {
            console.log('Error delete: ', err);
            res.send('Error delete')
        });
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`===========NODE REACTION SERVER===========\n\nListening on port: ${PORT}`);
});
