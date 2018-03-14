// MYSQL
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: "nodereaction",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    // port     : process.env.RDS_PORT
  });
  connection.connect(function(err) {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }
    console.log("Connected to database.");
  });

  module.exports = connection;