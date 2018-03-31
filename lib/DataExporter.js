const Logger = require("./logger.js");
const fetch = require("node-fetch");
class DataExporter {
  constructor(sendTransactions) {
    this.setUrl();
  }

  setUrl(url) {
    this.transactionsUrl = url
      ? url
      : `http://www.nodereaction.com/api/agent/data/save`;
  }

  sendTransactionsToServer(data) {
    Logger.logTransactions(data);
    fetch(this.transactionsUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(data => {
        Logger.logDataSent(data);
      }) //fix this
      .catch(err => Logger.errorSendingData(err));
  }
}

let dataExporter = new DataExporter();

module.exports = dataExporter;
