const { performance } = require("perf_hooks");

class TraceTimer {
    constructor(uuid) {
      this.uuid;
      this.startTime;
      this.duration;
      this.startTimestamp;
      this.endTimestamp;
    }
    start() {
      this.startTimestamp = Date.now();
      this.startTime = process.hrtime();
      //performance.mark(`${this.uuid}-start`);
    }
    end(){
      // performance.mark(`${this.uuid}-end`);
      // performance.measure(
      //   `${this.uuid}-duration`,
      //   `${this.uuid}-start`,
      //   `${this.uuid}-end`
      // );
      // this.duration = performance.getEntriesByName(`${this.uuid}-duration`)[0].duration; 
      this.endTimestamp = Date.now();
      this.duration = Math.abs(this.endTimestamp - this.startTimestamp);
      
      // performance.clearMarks([`${this.uuid}-start`, `${this.uuid}-end`]);
      // performance.clearMeasures(`${this.uuid}-duration`);
    }
  }

module.exports = TraceTimer;