const semver = require('semver')
const sqlSummary = require('sql-summary')

const NRA = require("../Agent");
const mySQL = require("mysql");


// Create Original Connection...
let createConnectionOriginal = mysql.createConnection
mysql.createConnection = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "createConnection");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end()
        return cb.apply(this, arguments);
      }
    }
  }
  return createConnectionOriginal.apply(this, arguments);
}

// Get Connection
let getConnection = mysql.getConnection
mysql.getConnection = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "getConnection");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end()
        return cb.apply(this, arguments);
      }
    }
  }
  return getConnection.apply(this, arguments);
}

// Create Original Pool...
let createPoolOriginal = mysql.createPoolOriginal
mysql.createPoolOriginal = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "createPoolOriginal");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end()
        return cb.apply(this, arguments);
      }
    }
  }
  return createPoolOriginal.apply(this, arguments);
}

// Create Pool CLuster...
let createPoolCluster = mysql.createPoolCluster
mysql.createPoolCluster = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "createPoolCluster");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end()
        return cb.apply(this, arguments);
      }
    }
  }
  return createPoolCluster.apply(this, arguments);
}

// Queryable...
let queryable = mysql.queryable
mysql.queryable = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "queryable");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end()
        return cb.apply(this, arguments);
      }
    }
  }
  return queryable.apply(this, arguments);
}

module.exports = mySqlLib