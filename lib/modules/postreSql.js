const nodeReactionAgent = require("../Agent");
const pg = require("pg");
const library = "pg";

let queryOriginal = pg.Client.prototype.query;

pg.Client.prototype.query = function(sql) {
  if (arguments.length > 0) {
    let trace = nodeReactionAgent.createTrace(library, "Query");
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
