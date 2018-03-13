const NRA = require('../Agent.js');
const http = require('http');

let original = http.Server.prototype.emit;

http.Server.prototype.emit = function(event,req,res){
  if (event === "request") {
    let trans = NRA.createTransaction(req);
    
    res.on("finish", function() {
      trans.endTransaction();
    });
  }
  return original.apply(this, arguments);
}
 
