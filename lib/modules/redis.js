const redis = require("redis");
const NRA = require("../Agent");
const library = "redis";

let internalSendCommandOriginal = redis.RedisClient.prototype.internal_send_command

redis.RedisClient.prototype.internal_send_command = function () {

    let trace = NRA.createTrace(library, "InternalSendCommand");
    const index = arguments[0];
    const cbArr = [];

    for (key in index) {
        cbArr.push(index[key])
    }

    const cb = cbArr[3];

    cbArr[3] = function () {
        trace.end();
        return cb.apply(this, arguments);
    };

    return internalSendCommandOriginal.apply(this, arguments);
};

// Send Command...
let sendCommandOriginal = redis.RedisClient.prototype.send_command

redis.RedisClient.prototype.send_command = function () {
    let trace = NRA.createTrace(library, "SendCommand");
    const index = arguments[0];
    const cbArr = [];

    for (key in index) {
        cbArr.push(index[key])
    }

    const cb = cbArr[3];

    cbArr[3] = function () {
        trace.end();
        return cb.apply(this, arguments);
    };

    return sendCommandOriginal.apply(this, arguments);
};

module.exports = redis








