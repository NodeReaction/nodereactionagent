const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const traceSchema = new Schema({
  route: String,
  method: String,
  library: String,
  type: String,
  startTimestamp: Date,
  endTimestamp: Date,
  duration: Number
});

const transactionSchema = new Schema({
  route: String,
  method: String,
  userAgent: String,
  rawHeaders: String,
  cookies: String,
  remoteAddress: String,
  startTimestamp: Date,
  endTimestamp: Date,
  duration: Number,
  traces: [traceSchema]
});

const Transaction = mongoose.model("Transaction", transactionSchema);
const Trace = mongoose.model("Trace", traceSchema);
module.exports = { Transaction, Trace };
