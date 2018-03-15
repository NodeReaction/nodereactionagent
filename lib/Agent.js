const Transaction = require("./Transaction");
const ExportData = require("./DataExporter");

class NodeReactionSingleton {
  // possibly add appId, userId, token for cloud hosted configuration
  constructor() {
    this.currentTransaction = null;
    this.activeTransactionCount = 0;
    this.transactionFlushInterval;
    this.transactionFlushIntervalTime = 10000;
    this.minimumTransactionsToSend = 10;
    this.maximumTransactionsToQueue = 100;
    this.transactions = [];
    this.setApiCrendentials();
    this.resetTransactionFlushInterval();
  }

  // store api crendentials for calls to server
  setApiCrendentials(appId, userId, apiToken) {
    this.appId = appId ? appId : "defaultAppId";
    this.userId = userId ? userId : "defaultUserId";
    this.apiToken = apiToken ? apiToken : "defaultApiToken";
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

  // have our current Transaction return a new internal trace reference
  // TODO: currently our wrapping strategy assumes createTrace is called 
  // from inside a transaction that doesn't always happen so we need a graceful 
  // way to avoid logging traces that don't originate from a transaction
  createTrace(library, type) {
    console.log(
      `Node Reaction Agent - createTrace - this.currentTransaction: ${
        this.currentTransaction
      }`
    );
    return this.currentTransaction.createTrace(library, type);
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
    if (this.transactionFlushInterval) clearInterval(this.transactionFlushInterval);
    this.transactionFlushInterval = setInterval(() => this.flushTransactions(true), this.transactionFlushIntervalTime);
  }

  // clean out finshed transactions,remove circular reference, and push to server
  flushTransactions(hardFlush) {
    // const d = new Date(Date.now()).toISOString().slice(0, 23).replace('T', ' ');    
    // console.log(`===========agent - flushTransactions===========\ntime: ${d}`);
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
        ExportData.sendToServer({
          appId: this.appId,
          userId: this.userId,
          apiToken: this.apiToken,
          transactions: completedTransactions
        });
      }
    }
    this.resetTransactionFlushInterval();
  }
}

let singleton = new NodeReactionSingleton();

module.exports = singleton;
