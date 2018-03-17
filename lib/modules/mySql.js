const semver = require("semver");
const sqlSummary = require("sql-summary");
const nodeReactionAgent = require("../Agent");
const mysql = require("mysql");
const library = "mysql";

// Create Original Connection...
let createConnectionOriginal = mysql.createConnection;
mysql.createConnection = function() {
  if (arguments.length > 0) {
    let trace = nodeReactionAgent.createTrace(library, "createConnection");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function() {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return createConnectionOriginal.apply(this, arguments);
};

// Get Connection
let getConnectionOriginal = mysql.getConnection;
mysql.getConnection = function() {
  if (arguments.length > 0) {
    let trace = nodeReactionAgent.createTrace(library, "getConnection");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function() {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return getConnectionOriginal.apply(this, arguments);
};

// Create Original Pool...
let createPoolOriginal = mysql.createPoolOriginal;
mysql.createPoolOriginal = function() {
  if (arguments.length > 0) {
    let trace = nodeReactionAgent.createTrace(library, "createPoolOriginal");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function() {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return createPoolOriginal.apply(this, arguments);
};

// Create Pool CLuster...
let createPoolClusterOriginal = mysql.createPoolCluster;
mysql.createPoolCluster = function() {
  if (arguments.length > 0) {
    let trace = nodeReactionAgent.createTrace(library, "createPoolCluster");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function() {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return createPoolClusterOriginal.apply(this, arguments);
};

// Queryable...
let queryableOriginal = mysql.queryable;
mysql.queryable = function() {
  if (arguments.length > 0) {
    let trace = nodeReactionAgent.createTrace(library, "queryable");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function() {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return queryableOriginal.apply(this, arguments);
};

module.exports = mysql;
