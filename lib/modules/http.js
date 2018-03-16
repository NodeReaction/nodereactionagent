const NRA = require("../Agent.js");
const http = require("http");
const RequestValidator = require("./../RequestValidator");

let original = http.Server.prototype.emit;

http.Server.prototype.emit = function(event, req, res) {
  if (event === "request") {
    if (RequestValidator.isValidRequest(req)) {
      let transaction = NRA.createTransaction(req);
      res.on("finish", function() {
        transaction.endTransaction();
      });
    }
  }
  return original.apply(this, arguments);
};
