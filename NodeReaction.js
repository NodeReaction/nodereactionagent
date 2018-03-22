const d = new Date(Date.now()).toISOString().slice(0, 23).replace("T", " ");
console.log(`
=========== Node Reaction Agent 0.2.4 ===========\n
time data sent: ${d}
`);
const Agent = require("./lib/Agent");
const libraries = require("./lib/LibraryLoader");
module.exports = Agent;
