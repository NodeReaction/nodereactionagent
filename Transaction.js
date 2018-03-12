const uuidv4 = require("uuid/v4");
const Trace = require("./Trace");
const { performance } = require("perf_hooks");

class Transaction {
  constructor(singleton, request) {
    this.singleton = singleton;
    this.request = request;
    this.uuid = uuidv4();
    this.finshed = false;
    this.traces = [];
    this.url = this.request.url;
    this.method = this.request.method;
    this.date = Date.now();
    this.timestamp = this.date;    
    performance.mark(`${this.uuid}-start`);
  }

  createTrace(type) {
    let trace = new Trace(this, type);
    this.traces.push(trace);
    return trace;
  }

  //restore ourselves in singleton state. Called by Trace so state is changed before user cb
  becomeGlobalTransaction() {
    this.singleton.restoreCurrentTransaction(this);
  }

  //set flag so singleton can flush us out and get GC'd
  endTransaction() {
    this.finished = true;

    performance.mark(`${this.uuid}-end`);
    performance.measure(
      `${this.uuid}-duration`,
      `${this.uuid}-start`,
      `${this.uuid}-end`
    );

    this.duration = (performance.getEntriesByName(
      `${this.uuid}-duration`
    )[0].duration)/100000000000;

    performance.clearMarks([`${this.uuid}-start`, `${this.uuid}-end`]);
    performance.clearMeasures(`${this.uuid}-duration`);
  }
}

module.exports = Transaction;
