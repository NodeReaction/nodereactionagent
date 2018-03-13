const Transaction = require("./Transaction");
const Export = require("./Export");

class NodeReactionSingleton {
  // possibly add appId, userId, token for cloud hosted configuration
  constructor() {
    // this.appId = "44526a103e";
    // this.userId = "cf8a9364e2a24012aaac98a496ff06d1";
    // this.secretToken = "16047115ba8a6a23704e8ce48f8924b2f4b8ea4d";
    this.currentTransaction = null;
    this.activeTransactionCount = 0;
    this.transactions = [];
    this.transactionFlushInterval;
    this.transactionFlushIntervalTime = 20000;
    this.minimumTransactionsToSend = 10;
    this.resetTransactionFlushInterval();
  }

  createTransaction(req) {
    let transaction = new Transaction(this, req);
    this.currentTransaction = transaction;
    this.transactions.push(transaction);
    this.activeTransactionCount += 1;
    this.checkTransactionsSize();
    return transaction;
  }

  // have our current Transaction return a new internal trace reference
  createTrace(library, type) {
    return this.currentTransaction.createTrace(library, type);
  }

  // will receive transaction from end of trace and restore
  restoreCurrentTransaction(transaction) {
    this.currentTransaction = transaction;
  }

  checkTransactionsSize() {
    if (this.activeTransactionCount >= 100) {
      this.flushTransactions();
      this.resetTransactionFlushInterval();
    }
  }

  resetTransactionFlushInterval() {
    if (this.transactionFlushInterval)
      clearInterval(this.transactionFlushInterval);
    this.transactionFlushInterval = setInterval(
      () => this.flushTransactions(true),
      this.transactionFlushIntervalTime
    );
  }

  // clean out finshed transactions,remove circular reference, and push to server
  flushTransactions(hardFlush) {
    let completedTransactions = this.transactions.filter(t => t.finished);
    let activeTransactions = this.transactions.filter(t => !t.finished);
    if (completedTransactions.length >= this.minimumTransactionsToSend || hardFlush) {
      this.transactions = activeTransactions;
      // remove circular refrences
      completedTransactions.forEach(t => t.prepareExport());
      // add appId, userId and token in the future
      Export.sendToServer({ transactions: completedTransactions });
    }
  }
}

let singleton = new NodeReactionSingleton();

module.exports = singleton;
