class Logger {

    constructor() {
        this.log = false;
        this.saveToDisk = false;
        this.logFilePatH = ''
    }

    log(msg) {
        if (this.log) {
            console.log(msg);
        }
        if(this.saveToDisk) {
            
        }
    }

    error(msg) {
        if (this.log) {
            console.error(msg);
        }
    }

    saveLogToDisk(saveLog, path) {
        if(args.length && args[0] === true || args[0] === false) this.saveToDisk = args[0];
        return this.saveToDisk;
    }
}
let logger = new Logger();

module.exports = logger;