const fetch = require("node-fetch");

function sendToServer(data) {
  const d = new Date();
  console.log(`
  ===========Agent sent data to server===========\n\n
  time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
  transactions sent: ${JSON.stringify(data.transactions.length)}
  `);
  fetch("http://localhost:3000/api/agent/data/save", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(data => {}) //fix this
    .catch(err => console.log("NodeRA error", err));
}

module.exports = { sendToServer };
