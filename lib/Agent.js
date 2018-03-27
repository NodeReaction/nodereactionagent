const Transaction = require("./Transaction");
const DataExporter = require("./DataExporter");
const logger = require("./logger.js"); 

class NodeReactionAgent {
  // possibly add appId, userId, token for cloud hosted configuration
  constructor() {
    this.currentTransaction = null;
    this.activeTransactionCount = 0;
    this.transactions = [];
    this.transactionFlushInterval;
    this.transactionFlushIntervalTime = 10000;
    this.minimumTransactionsToSend = 10;
    this.maximumTransactionsToQueue = 100;
    this.setApiCrendentials();
    this.resetTransactionFlushInterval();
  }

  // store api crendentials for calls to server
  setApiCrendentials(appId, userId, apiToken) {
    this.credentials = {};
    this.credentials.appId = appId ? appId : "defaultAppId";
    this.credentials.userId = userId ? userId : "defaultUserId";
    this.credentials.apiToken = apiToken ? apiToken : "defaultApiToken";
  }

  saveTransactionsToFile(){saveToDisk, path
    // logger.saveLogToDisk(saveToDisk, path);
  }

  // create a new transaction and check to see if it's time to clear out some
  createTransaction(req) {
    let transaction = new Transaction(this, req);
    this.currentTransaction = transaction;
    this.transactions.push(transaction);
    this.activeTransactionCount += 1;
    this.checkTransactionsQueue();
    return transaction;
  }

  // have our current transaction return a new internal trace reference
  createTrace(library, type) {
    // prevents traces from being made outside of an existing transaction which causes agent failure
    if (this.currentTransaction !== null) {
      return this.currentTransaction.createTrace(library, type);
    }
  }

  // will receive transaction from end of trace and restore
  restoreCurrentTransaction(transaction) {
    this.currentTransaction = transaction;
  }

  // forces a flush of completed transactions if there are more than 100 in the queue
  checkTransactionsQueue() {
    if (this.activeTransactionCount >= this.maximumTransactionsToQueue) {
      this.flushTransactions();
    }
  }

  // resets the interval to clear the transaction queue
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
    if (
      completedTransactions.length >= this.minimumTransactionsToSend ||
      hardFlush
    ) {
      if (completedTransactions.length > 0) {
        this.transactions = activeTransactions;
        // remove circular refrences
        completedTransactions.forEach(t => t.prepareExport());
        // add appId, userId and token in the future
        DataExporter.sendTransactionsToServer({
          credentials: this.credentials,
          transactions: completedTransactions
        });
      }
    }
    this.resetTransactionFlushInterval();
  }
}

// create a singleton and export it
let nodeReactionAgent = new NodeReactionAgent();

module.exports = nodeReactionAgent;
