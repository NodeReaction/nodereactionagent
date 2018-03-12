const fetch = require("node-fetch");

function sendToServer(data) {
  console.log(data);
  let serverData = { packet: data };
  fetch("http://localhost:3000/serverdata", {
    method: "POST",
    body: JSON.stringify(serverData),
    headers: { "Content-Type": "application/json" }
  })
    .then(data => {}) //fix this
    .catch(err => console.log("NodeRA error", err));
}

module.exports = { sendToServer };
