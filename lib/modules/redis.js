const redis = require("redis");
const NRA = require("../Agent");


let internalSendCommandOriginal = redis.RedisClient.prototype.internal_send_command

redis.RedisClient.prototype.internal_send_command = function () {
    if (arguments.length > 0) {
        let trace = NRA.createTrace(library, "InternalSendCommand");

        const index = arguments.length - 1;
        const cb = arguments[index];

        if (typeof cb === "function") {
            arguments[index] = function () {
                trace.end();
                return cb.apply(this, arguments);
            };
        }
    }

    return internalSendCommandOriginal.apply(this, arguments);
};

let sendCommandOriginal = redis.RedisClient.prototype.send_command

redis.RedisClient.prototype.send_command = function () {
    if (arguments.length > 0) {
        let trace = NRA.createTrace(library, "SendCommand");

        const index = arguments.length - 1;
        const cb = arguments[index];

        if (typeof cb === "function") {
            arguments[index] = function () {
                trace.end();
                return cb.apply(this, arguments);
            };
        }
    }

    return sendCommandOriginal.apply(this, arguments);
};

module.exports = redisLib