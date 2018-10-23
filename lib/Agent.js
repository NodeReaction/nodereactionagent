const Transaction = require("./Transaction");
const DataExporter = require("./DataExporter");
const Logger = require("./Logger.js");

class NodeReactionAgent {
  constructor() {
    this.currentTransaction = null;
    this.transactions = [];
    this.activeTransactionCount = 0;
    this.transactionFlushInterval;
    this.transactionFlushIntervalTime = 10000;
    this.minimumTransactionsToSend = 10;
    this.maximumTransactionsToQueue = 100;
    this.sendToServer = true;
    this.credentials = {};
    this.resetTransactionFlushInterval();
  }

  // store api crendentials for calls to server
  setApiToken(apiToken) {
    this.credentials.apiToken = apiToken ? apiToken : "defaultApiToken";
    return this;
  };

  // set data exporter prefs
  setAgentUrl(url) {
    DataExporter.setUrl(url);
  };

  // set data exporter prefs
  sendTransactionsToServer(sendToServer) {
    this.sendToServer = sendToServer;
  };

  // set logger file saving prefs
  saveLogToDisk(saveToDisk, path) {
    Logger.saveLogToDisk(saveToDisk, path);
  };

  // set logger screen logging
  logToScreen(showScreenLog) {
    Logger.logToScreen(showScreenLog);
  };

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

  // prepare transactions for export and try to send them
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
        completedTransactions.forEach(t => t.prepareForExport());
        // add appId, userId and token in the future
        const data = {
          credentials: this.credentials,
          transactions: completedTransactions
        };
        if (this.sendToServer) {
          DataExporter.sendTransactionsToServer(data);
        }
      }
    }
    this.resetTransactionFlushInterval();
  }
}

// create a singleton and export it
let nodeReactionAgent = new NodeReactionAgent();

module.exports = nodeReactionAgent;
