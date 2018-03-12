const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  'requestUrl': String,
  'requestMethod': String, 
  'routeName': String,
  'transactionId': String,
  'rawHeaders': String,
  'cookies': String,
  'userAgent': String,
  'remoteAddress': String,
  'startTime': Number,
  'startTimestamp': Date,
  'endTime': Number, 
  'endTimestamp': Date, 
  'duration': Number, 
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
