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
    }

    error(msg) {
        if (this.log) {
            console.error(msg);
        }
    }

}
let logger = new Logger();

module.exports = logger;