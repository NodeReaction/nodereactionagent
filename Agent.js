const Transaction = require("./Transaction");
const Export = require("./Export");

//Circular dependency is affecting export FIX THIS
// //importing here will override for later invocation
// const httpLib = require("./libraries/http.js");
// const mongoLib = require("./libraries/mongo.js");

class NodeReactionSingleton {
  //possibly add app name? some other customizable input/config?
  constructor() {
    this.data = {
      "GET/dogs": {},
    };
    this.currentTransaction = null;
    this.activeTransactionCount = 0;
    this.transactions = [];

    setTimeout(() => {
      this.flushTransactions();
    }, 10000);
  }

  createTransaction(req) {
    let transaction = new Transaction(this, req);
    this.currentTransaction = transaction;
    this.transactions.push(transaction);
    this.activeTransactionCount++;
    return transaction;
  }

  //have our current Transaction return a new internal trace reference
  createTrace(type) {
    return this.currentTransaction.createTrace(type);
  }

  //will receive transaction from end of trace and restore
  restoreCurrentTransaction(transaction) {
    this.currentTransaction = transaction;
  }

  //clean out finshed transactions,remove circular reference, and push to server
  flushTransactions() {
    let finished = this.transactions.filter(t => t.finished);
    let notFinished = this.transactions.filter(t => !t.finished);
    this.transactions = notFinished;

    //remove circular refrences
    finished.forEach(t => {
      delete t.singleton;
      delete t.request;
      t.traces.forEach(trace => delete trace.transaction);
    });

    Export.sendToServer(finished);
  }
}

let singleton = new NodeReactionSingleton();

module.exports = singleton;