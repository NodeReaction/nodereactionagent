const uuidv4 = require("uuid/v4");
const Trace = require("./Trace");
const TraceTimer = require("./TraceTimer");

class Transaction {
  constructor(singleton, request) {
    this.uuid = uuidv4();
    this.singleton = singleton;
    this.request = request;
    this.finshed = false;
    this.traces = [];
    // pull these props out of request obj now (it is deleted before being sent to server)
    this.route = this.request.url;
    this.method = this.request.method;
    this.userAgent = '';
    this.rawHeaders = '';
    this.cookies = '';
    this.userAgent = this.request.headers['user-agent'];
    this.rawHeaders = this.request.rawHeaders;
    this.cookies = this.request.headers.cookie;
    //
    let xForwardedFor = this.request.headers['x-forwarded-for'];
    this.remoteAddress = (xForwardedFor)? xForwardedFor.split(',')[0] : this.request.connection.remoteAddress;
    // stores timer info
    this.traceTimer = new TraceTimer(this.uuid);
    this.traceTimer.start();
  }

  createTrace(library, type) {
    let trace = new Trace(this, library, type);
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
    this.traceTimer.end();
  }

  //remove circular refrences
  prepareExport() {
    delete this.singleton;
    delete this.request;
    this.traces.forEach(trace => delete trace.transaction);
  }
}

module.exports = Transaction;
