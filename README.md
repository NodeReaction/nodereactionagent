# Node Reaction Agent


## Overview

## Installation
Using npm:
```shell
$ npm install nodereactionagent
```

## Agent Configuration Options
###Set Agent URL
The agent is set up to post to our cloud servers, however, the agent can post to a URL of your choosing by passing in a url. 
```shell
NRA.setAgentUrl('localhost:3000/YourEndPoint');
```
###Post Transactions to Server
The agent can be prevented from posting any information to our servers and simple be used as a screen logger or to log information to a file.
```shell
NRA.sendTransactionsToServer(false); // defaults: true;
```

###Save logs to disk
The agent can optionally save logs to disk with the following command. 
```shell
NRA.saveLogToDisk(true, pathToSave); // defaults: false and project root folder
```

###Log to Screen
```shell
NRA.saveLogToDisk(true, pathToSave); // defaults: false and project root folder
```

## Overriding your own Async Functions
You can use Node Reaction Agent in your any of your own async functions that occur during and HTTP request. In order to develop timing data just add the following lines into your application.

```shell
const nodeReactionAgent = require("../Agent.js");

 let trace = nodeReactionAgent.createTrace('ModuleName', 'FunctionName');
    const index = arguments.length - 1;
    const cb = arguments[index];
    if (typeof cb === "function") {
        arguments[index] = function () {
            //end trace in the callback;
            if(trace) trace.end()
            return cb.apply(this, arguments);
        }
    }

NRA.saveLogToDisk(true, pathToSave); // defaults: false and project root folder
```

## Adding a module
You can write your own modules for Node Reaction to further extend it's utility. We welcome contributions.


## Authors
- [Chris Jeon](https://github.com/blackink000)
- [Eric Fileti](https://github.com/ericfileti)
- [James Edwards](https://github.com/JamesThomasEdwards)
- [Kunal Patel](https://github.com/kunalpatel73)
- [Michael Dalton](https://github.com/modalton)
