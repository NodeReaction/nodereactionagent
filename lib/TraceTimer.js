

class TraceTimer {
    constructor(uuid) {
      this.uuid;
      this.startTime;
      this.duration;
      this.startTimestamp;
      this.endTimestamp;
    }
    start() {
      this.startTimestamp = new Date(Date.now()).toISOString().slice(0, 23).replace('T', ' ');
      this.startTime = process.hrtime();
    }
    end(){
      let durationArr = process.hrtime(this.startTime);
      this.duration = durationArr[0] / 1000 + durationArr[1] / 1000000;
      this.endTimestamp = new Date(Date.now()).toISOString().slice(0, 23).replace('T', ' ');
    }
  }

module.exports = TraceTimer;