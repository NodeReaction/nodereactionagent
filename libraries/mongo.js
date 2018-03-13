const NRA = require("../Agent");
const mongo = require("mongodb-core");

let original = mongo.Server.prototype.insert;
let library = "MongoDB";

mongo.Server.prototype.insert = function() {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "Insert");

    const index = arguments.length - 1;
    const cb = arguments[index];

    if (typeof cb === "function") {
      arguments[index] = function() {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }

  return original.apply(this, arguments);
};

let findOriginal = mongo.Cursor.prototype._find;

mongo.Cursor.prototype._find = function() {
  console.log('nra agent mongo');
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "Find");

    const orig_cb = arguments[0];

    if (typeof orig_cb === "function") {
      arguments[0] = function() {
        trace.end();
        console.log("trace ended:  " + trace.traceTimer.startTimestamp);
        return orig_cb.apply(this, arguments);
      };
    }
  }

  return findOriginal.apply(this, arguments);
};

