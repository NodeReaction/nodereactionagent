const uuidv4 = require("uuid/v4");
const TraceTimer = require("./TraceTimer");

class Trace {
  constructor(transaction, library, type) {
    this.transaction = transaction;
    this.library = library;
    this.type = type;
    this.uuid = uuidv4();
    this.finished = false;
    this.traceTimer = new TraceTimer(this.uuid);
    this.traceTimer.start();
  }

  end() {
    this.traceTimer.end();
    // update our state and notify toplevel singleton of completed state
    this.finished = true;
    this.transaction.becomeGlobalTransaction();
  }
}

module.exports = Trace;
