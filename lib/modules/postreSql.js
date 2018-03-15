const pg = require("pg");
const NRA = require("../Agent");

const library = "pg"

let queryOriginal = pg.Client.prototype.query
pg.Client.prototype.query = function () {
    if (arguments.length > 0) {
        let trace = NRA.createTrace(library, "Query");

        const index = auguments.length - 1;
        const cb = arguemtns[index];
        if (typeof cb === "function") {
            arguments[index] = function () {
                trace.end()
                return cb.apply(this, arguments);
            }
        }
    }
    return queryOriginal.apply(this, arguments);
}

let _pulseQueryQueueOriginal = pg.Client.prototype._pulseQueryQueue
pg.Client.prototype.query = function () {
    if (arguments.length > 0) {
        let trace = NRA.createTrace(library, "PulseQueryQueue");

        const index = auguments.length - 1;
        const cb = arguemtns[index];
        if (typeof cb === "function") {
            arguments[index] = function () {
                trace.end()
                return cb.apply(this, arguments);
            }
        }
    }
    return _pulseQueryQueueOriginal.apply(this, arguments);
}

module.exports = pg