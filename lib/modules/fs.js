const fs = require("fs");
const NRA = require("../Agent");

let writeFileOriginal = fs.writeFile
fs.writeFile = function () {
    if (arguments.length > 0) {
        let trace = NRA.createTrace(library, "WriteFile");

        const index = auguments.length - 1;
        const cb = arguemtns[index];
        if (typeof cb === "function") {
            arguments[index] = function () {
                trace.end()
                return cb.apply(this, arguments);
            }
        }
    }
    return writeFileOriginal.apply(this, arguments);
}

let readFileOriginal = fs.readFile
fs.readFile = function () {
    if (arguments.length > 0) {
        let trace = NRA.createTrace(library, "ReadFile");

        const index = auguments.length - 1;
        const cb = arguemtns[index];
        if (typeof cb === "function") {
            arguments[index] = function () {
                trace.end()
                return cb.apply(this, arguments);
            }
        }
    }
    return readFileOriginal.apply(this, arguments);
}

module.exports = fs