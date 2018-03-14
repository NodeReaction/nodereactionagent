"use strict";

const sql = require("../dbconfig.js");
const sqlstring = require("sqlstring");

const agentController = {};

agentController.validate = (req, res, next) => {
  next();
};

agentController.create = (req, res, next) => {
  const transactions = req.body.transactions;
  const d = new Date();
  console.log(`
    ===========Server received data from Agent===========\n
    time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
    transactions sent: ${JSON.stringify(transactions.length)}
    `);

  transactions.forEach(transaction => {
   // console.log('=========================\n' + JSON.stringify(transaction) + '=========================\n');
    const applicationId = 9;
    sql.query(
      sqlstring.format(
        "INSERT INTO transactions (application_id, route, method, user_agent, cookies, remote_address, start_timestamp, end_timestamp, duration) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          applicationId,
          transaction.route,
          transaction.method,
          transaction.userAgent,
          transaction.cookies,
          transaction.remoteAddress,
          transaction.traceTimer.startTimestamp,
          transaction.traceTimer.endTimestamp,
          transaction.traceTimer.duration
        ]
      ),
      function(error, results, fields) {
        if (error) {
          console.log("database error: ", error);
          next(error);
        }
        console.log("database save: ", results.insertId);
      }
    );
  });

  next();
};

module.exports = agentController;

/*//

sql.query(
        // sqlstring.format(
        //   "INSERT INTO transactions (route,method) VALUES (?,?)",
        //   [transaction.route, transaction.method]
        // ),
        sqlstring.format(
            "SELECT * from transactions"
          ),
        function(error, results, fields) {
          if (error) {
            // let err = new Error('Database Error');
            // err.functionName = 'agentController.create';
            // err.status = 400;
            console.log('db error ======', error)
            
          }
          console.log('database save: ', results);
          //res.locals.id = results.insertId;
        }
      );
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
  //*/
