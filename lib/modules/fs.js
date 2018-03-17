const fs = require("fs");
const NRA = require("../Agent");
const library = "fs";

let fsFunc = ['access', 'exists', 'readFile', 'close', 'open', 'read', 'write', 'rename', 'truncate'
    , 'ftruncate', 'rmdir', 'fsync', 'mkdir', 'readdir', 'fstat', 'lstat', 'stat', 'readlink'
    , 'symlink', 'link', 'unlink', 'fchmod', 'lchmod', 'chmod', 'lchown', 'fchown', 'chown'
    , 'utimes', 'futimes', 'writeFile', 'appendFile', 'realpath', 'mkdtemp', 'copyFile']

for (let key in fs) {
    //find the method that's executing;
    for (let i = 0; i < fsFunc.length; i++) {
        if (key === fsFunc[i]) {
            let originalFunction = fs[fsFunc[i]];
            fs[fsFunc[i]] = function () {
                if (arguments.length > 0) {
                    //set trace;
                    let trace = NRA.createTrace(library, key);
                    const index = arguments.length - 1;
                    const cb = arguments[index];
                    if (typeof cb === "function") {
                        arguments[index] = function () {
                            //end trace in the callback;
                            trace.end()
                            return cb.apply(this, arguments);
                        }
                    }
                }
                return originalFunction.apply(this, arguments);
            }
        }
    }
}

module.exports = fs