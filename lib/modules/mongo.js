const NRA = require("../Agent");
const mongo = require("mongodb-core");

let original = mongo.Server.prototype.insert;
let library = "MongoDB";
//mongo insert 'Server' callback is the last parameter
let original = mongo.Server.prototype.insert;

mongo.Server.prototype.insert = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "Insert");

    const index = arguments.length - 1;
    const cb = arguments[index];

    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }

  return original.apply(this, arguments);
};
//mongo _find 'Cursor' callback is the first parameter
let findOriginal = mongo.Cursor.prototype._find;

mongo.Cursor.prototype._find = function () {
  console.log("nra agent mongo");
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "Find");

    const orig_cb = arguments[0];

    if (typeof orig_cb === "function") {
      arguments[0] = function () {
        trace.end();
        console.log("trace ended:  " + trace.traceTimer.startTimestamp);
        return orig_cb.apply(this, arguments);
      };
    }
  }

  return findOriginal.apply(this, arguments);
};
//mongo update 'Server' callback is the last parameter
let updateOriginal = mongo.Server.prototype.update

mongo.Server.prototype.update = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "Update");

    const index = arguments.length - 1;
    const cb = arguments[index];
    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return updateOriginal.apply(this, arguments);
}
//mongo remove 'Server' callback is the last parameter
let removeOriginal = mongo.Server.prototype.remove

mongo.Server.prototype.remove = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "Remove");

    const index = arguments.length - 1;
    const cb = arguments[index];
    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return removeOriginal.apply(this, arguments);
}

//mongo auth 'Server' callback is the last parameter
let authOriginal = mongo.Server.prototype.auth

mongo.Server.prototype.auth = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "Auth");

    const index = auguments.length - 1;
    const cb = arguemtns[index];
    if (typeof cb === "function") {
      arguments[index] = function () {
        trace.end();
        return cb.apply(this, arguments);
      };
    }
  }
  return authOriginal.apply(this, arguments);
}
//mongo _getmore 'Cursor' callback is the first parameter
let getMoreOriginal = mongo.Cursor.prototype._getmore;

mongo.Cursor.prototype._getmore = function () {
  if (arguments.length > 0) {
    let trace = NRA.createTrace(library, "GetMore");

    const cb = arguments[0];

    if (typeof cb === "function") {
      arguments[0] = function () {
        trace.end();
        console.log("trace ended:  " + trace.traceTimer.startTimestamp);
        return cb.apply(this, arguments);
      };
    }
  }

  return getMoreOriginal.apply(this, arguments);
};

module.exports = mongoLib
