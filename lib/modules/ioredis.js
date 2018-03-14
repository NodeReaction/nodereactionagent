const Redis = require('ioredis');
const NRA = require("../Agent");


let initPromise = ioredis.Command.prototype.initPromise

ioredis.Command.prototype.initPromise = function () {
    if (arguments.length > 0) {
        let trace = NRA.createTrace(library, "InitPromise");

        const command = this
        var cb = this.callback

        if (typeof cb === "function") {
            this.callback = function () {
                trace.end();
                return cb.apply(this, arguments);
            };
        }
    }

    return initPromise.apply(this, arguments);
};


let sendCommand = ioredis.prototype.sendcommand

ioredis.prototype.sendcommand = function () {
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

    return sendCommand.apply(this, arguments);
};

module.exports = ioredisLib
