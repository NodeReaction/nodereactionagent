const logger = require("./logger.js");
const fetch = require("node-fetch");

class DataExporter {
  constructor(sendTransactions) {
    this.setUrl();
    this.sendTransactions = sendTransactions ? sendTransactions : true;
  }

  setUrl(url) {
    this.transactionsUrl = url
      ? url
      : `http://www.nodereaction.com/api/agent/data/save`;
  }

  sendTransactionsToServer(data) {
    this.logTransactions(data);
    if (this.sendTransactions) {
      fetch(this.transactionsUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
        .then(data =>
          logger.log(`Node Reaction Agent - DataExporter - data sent`)
        ) //fix this
        .catch(err =>
          logger.log(`Node Reaction Agent - DataExporter - error - ${err}`)
        );
    }
  }

  logTransactions(data) {
    const d = new Date(Date.now()).slice(0, 23).replace("T", " ");
    logger.log(`
    ===========Agent sent data to server===========\n
    time data sent: ${d}
    transactions sent: ${JSON.stringify(data.transactions.length)}
    `);
    data.transactions.forEach(transaction => {
      let str = `transaction: ${transaction.method} - ${transaction.route} 
      - ${transaction.traceTimer.duration}ms - ${transaction.traceTimer.startTimestamp}\n`;
      // trace info
      transaction.traces.forEach(trace => {
        str += `\ttrace: ${trace.library} - ${trace.type} - 
        ${trace.traceTimer.duration}ms - ${trace.traceTimer.startTimestamp} \n`;
        //str += `\ttrace:\n\t\t ${JSON.stringify(trace)} \n`;
      });
      str += `===============================================\n`;
      logger.log(str);
    });
  }
}

let dataExporter = new DataExporter();

module.exports = dataExporter;
