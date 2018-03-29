class Logger {
    constructor() {
      this.logToDisk = false;
      this.showScreenLog = true;
      this.logFilePath = "";
    }
  
    log(msg) {
      if (this.logToScreen) {
        console.log(msg);
      }
      // if (this.logToDisk){}
      // pass the msg on to function that saves file
      // append log file
      // save up a bunch of logs or log periodically?
      // jump to root directory
      // const packageJsonPath = __dirname + "/../../../";
      // let packageJsonExists = fs.statSync(packageJsonPath);
      // if (packageJsonExists) {}
    }
  
    error(msg) {
      if (this.logToScreen) {
        console.error(msg);
      }
    }
  
    saveLogToDisk(logToDisk, path){
      this.logToDisk = logToDisk;
    }
  
    logToScreen(showScreenLog){
      this.showScreenLog = showScreenLog;
    }
  
    logStartup() {
      const d = new Date(Date.now())
        .toISOString()
        .slice(0, 23)
        .replace("T", " ");
      const str = `
      =========== Node Reaction Agent 0.2.9 ===========\n
      
      time data sent: ${d}
      `;
      this.log(str);
    }
  
    logNoPackageJsonDependencies() {
      this.log(`Node Reaction Agent - Library Loader - no modules loaded. no dependencies found in packageJson`);
    }
  
    logModuleLoaded(module) {
      this.log(`Node Reaction Agent - Library Loader - module loaded - ${module}`);
    }
  
    logInvalidRequest(url, method) {
      this.log(`Node Reaction Agent - RequestValidator - request ignored - method: ${method} url: ${url}`);
    }
  
    logTransactions(data) {
      const d = new Date(Date.now()).toISOString().slice(0, 23).replace("T", " ");
      let str = `
      =========== Agent sent data to server ===========\n
      time data sent: ${d}
      transactions sent: ${JSON.stringify(data.transactions.length)}
      \n\n`;
      data.transactions.forEach(transaction => {
          str += `transaction: ${transaction.method} - ${transaction.route} 
            - ${transaction.traceTimer.duration}ms - ${
          transaction.traceTimer.startTimestamp
        }\n`;
        // trace info
        transaction.traces.forEach(trace => {
          str += `\ttrace: ${trace.library} - ${trace.type} - 
              ${trace.traceTimer.duration}ms - ${
            trace.traceTimer.startTimestamp
          } \n`;
          //str += `\ttrace:\n\t\t ${JSON.stringify(trace)} \n`;
        });
        str += `=================================================\n`;
      });
      this.log(str);
    }
  
    logDataSent(data){
      const str = `Node Reaction Agent - DataExporter - data sent`;
      this.log(str);
    }
  
    logErrorSendingData(err) {
      const str = `Node Reaction Agent - DataExporter - error - ${err}`;
      this.log(str);
    }
        
  }
  let logger = new Logger();
  
  module.exports = logger;
