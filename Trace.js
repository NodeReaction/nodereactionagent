const { performance } = require("perf_hooks");
const uuidv4 = require("uuid/v4");

class Trace {
  constructor(transaction, type) {
    this.transaction = transaction;
    this.type = type;
    this.uuid = uuidv4();
    this.finished = false;
  }

  start() {
    //start timer and record timestamp
    performance.mark(`${this.uuid}-start`);
    this.timestamp = process.hrtime();
  }

  end() {
    //end timer. get diff, store it, and clean up performance pool
    performance.mark(`${this.uuid}-end`);
    performance.measure(
      `${this.uuid}-duration`,
      `${this.uuid}-start`,
      `${this.uuid}-end`
    );

    this.duration = performance.getEntriesByName(
      `${this.uuid}-duration`
    )[0].duration;

    performance.clearMarks([`${this.uuid}-start`, `${this.uuid}-end`]);
    performance.clearMeasures(`${this.uuid}-duration`);

    //update our state and notify toplevel singleton of completed state
    this.finished = true;
    this.transaction.becomeGlobalTransaction();
  }
}

module.exports = Trace;