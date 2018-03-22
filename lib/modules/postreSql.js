const nodeReactionAgent = require("../Agent");
const pg = require("pg");
const library = "pg";

let queryOriginal = pg.Client.prototype.query;

pg.Client.prototype.query = function(sql) {
  if (arguments.length > 0) {
    let queryType = arguments[0].substr(0,arguments[0].indexOf(' '));
    console.log(`Node Reaction Agent - ${library} - ${queryType}`);
    let trace = nodeReactionAgent.createTrace(library, queryType);
    const index = arguments.length - 1;
    const cb = arguments[index];

    if (typeof cb === "function") {
      arguments[index] = function() {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return queryOriginal.apply(this, arguments);
};

module.exports = pg;
