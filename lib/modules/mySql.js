const nodeReactionAgent = require("../Agent");
const mysql = require("mysql");
const library = "mysql";

let mysqlFunc = ['createConnection']

// ['createPool',
// 'createPoolCluster',
// 'createQuery']

//identify the mysql connection
for (let key in mysql) {
  for (let i = 0; i < mysqlFunc.length; i++) {
    //select the match
    if (key === mysqlFunc[i]) {
      //create a copy of original connection
      let orig = mysql[mysqlFunc[i]];
      mysql[mysqlFunc[i]] = function () {
        //create trace for connection
        let conn_trace = nodeReactionAgent.createTrace(library, key);
        //apply overwitten to original connection
        let conn = orig.apply(this, arguments);
        //create copy of original query
        let q_orig = conn.query;
        conn.query = function () {
          //create trace for query
          let query_trace = nodeReactionAgent.createTrace(library, "query");
          let index = arguments.length - 1;
          let qcb = arguments[index]
          if (typeof qcb === 'function') {
            arguments[index] = function () {
              //end trace for query
              if (query_trace) query_trace.end();
              //end trace for connection assoicated with the query
              if (conn_trace) conn_trace.end();
              //apply overwritten to original query callback
              return qcb.apply(this, arguments)
            }

          }
          //apply overwritten to original query
          return q_orig.apply(this, arguments);
        };
        //return connection and attach it to the query
        return conn;
      }
    }
  }
}

module.exports = mysql;
