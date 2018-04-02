# Node Reaction Agent


## Overview

NodeReactionAgent is an open source performance monitoring framework, included in application code to analyzes http requests and asynchronous operations while working in conjunction with a cloud service NodeReaction.com to store  analyze and display information the agent gathers. 

NodeReaction.com provides a detailed performance breakdown of a developer’s Node.js web applications and better understand where bottlenecks exist in their application. 

## Installation
Using npm:
```shell
$ npm install nodereactionagent
```

## Agent Configuration Options
Default confguration (place on line 1 of your server.js):
```shell
const NRA = require('nodereactionagent').setApiToken('TokenFromNodeReaction.com');
```
### Set Agent URL
The agent is set up to post to our cloud servers, however, the agent can post to a URL of your choosing. 
```shell
NRA.setAgentUrl('localhost:3000/YourEndPoint');
```
### Post Transactions to Server
The agent can be prevented from posting any information to servers and can be used as a screen logger or to log information to a file.
```shell
NRA.sendTransactionsToServer(false); // defaults: true;
```

### Save logs to disk
The agent can optionally save logs to disk with the following command. 
```shell
NRA.saveLogToDisk(true, pathToSave); // defaults: false and project root folder
```

### Log to Screen
```shell
NRA.logToScreen(true); // defaults: true
```

## Overriding your own Async Functions
You can use Node Reaction Agent in your any of your own async functions that occur during and HTTP request. In order to develop timing data just add the following lines into your application.

```shell
const nodeReactionAgent = require("../Agent.js");

// add this line when you want the trace to starts
let trace = nodeReactionAgent.createTrace('ModuleName', 'FunctionName');


// add this line when async function completes;
trace.end();
```

## Adding a module
You can write your own modules for Node Reaction to further extend it's utility. 


## Contributions
We welcome contributions. Please submit issues [nodereaction@gmail.com](mailto:nodereaction@gmail.com)



## Authors
- [Chris Jeon](https://github.com/blackink000)
- [Eric Fileti](https://github.com/ericfileti)
- [James Edwards](https://github.com/JamesThomasEdwards)
- [Kunal Patel](https://github.com/kunalpatel73)
- [Michael Dalton](https://github.com/modalton)
