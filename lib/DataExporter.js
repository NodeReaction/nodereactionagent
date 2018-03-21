const fetch = require("node-fetch");

class DataExporter {
  constructor() {
    this.init();
  }

  init(sendTransactions, url) {
    this.transactionsUrl = url ? url : `http://localhost:3000/api/agent/data/save`;
    this.sendTransactions = sendTransactions ? sendTransactions : true;
  }

  sendTransactionsToServer(data) {
    const d = new Date(Date.now()).toISOString().slice(0, 23).replace("T", " ");
  console.log(`
  ===========Agent sent data to server===========\n
  time data sent: ${d}
  transactions sent: ${JSON.stringify(data.transactions.length)}
  `);
    data.transactions.forEach(transaction => {
      let str = `transaction: ${transaction.method} - ${transaction.route} \n`;
      transaction.traces.forEach(trace => {
        str += `\ttrace: ${trace.library} - ${trace.type} \n`;
        str += `\ttrace:\n\t\t ${JSON.stringify(trace)} \n`;
      });
      str += `***********************************************\n`;
      console.log(str);
    });
    
    if (this.sendTransactions) {
      fetch(this.transactionsUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
        .then(data => console.log(`Node Reaction Agent - DataExporter - data sent`)) //fix this
        .catch(err => console.log(`Node Reaction Agent - DataExporter - error - ${err}`));
    }
  }
}

let dataExporter = new DataExporter();

module.exports = dataExporter;
