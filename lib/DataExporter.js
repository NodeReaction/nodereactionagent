const fetch = require("node-fetch");

// if pakages get reject stop sending them and write to console
class DataExporter {
  sendToServer(data) {
    const d = new Date();
    console.log(`
    ===========Agent sent data to server===========\n
    time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
    transactions sent: ${JSON.stringify(data.transactions.length)}
    `);
    //
    let str = "";
    data.transactions.forEach(transaction => {
      str = `transaction: ${transaction.method} - ${transaction.route} \n`;
      transaction.traces.forEach(trace => {
        str += `\ttrace: ${trace.library} - ${trace.type} \n`;
      });
    });
    console.log(str);
    //
    fetch("http://localhost:3000/api/agent/data/save", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(data => {}) //fix this
      .catch(err => console.log("NodeRA error", err));
  }
}
let dataExporter = new DataExporter();

module.exports = dataExporter;
