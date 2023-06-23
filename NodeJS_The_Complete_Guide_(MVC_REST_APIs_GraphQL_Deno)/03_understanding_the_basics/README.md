## Section 03: Understanding the Basics

#### Table of Contents
- Module Introduction
- How The Web Works
- Creating a Node Server
- The Node Lifecycle & Event Loop
- Controlling the Node.js Process
- Understanding Requests
- Sending Responses
- Request & Response Headers
- Routing Requests
- Redirecting Requests
- Parsing Request Bodies
- Understanding Event Driven Code Execution
- Blocking and Non-Blocking Code
- Node.js - Looking Behind the Scenes
- Using the Node Modules System
- Wrap Up
- Assignment 1: Time to Practice - The Basics Start
- Useful Resources & Links



### Module Introduction
- How does the Web Work (Refresher)?
- Creating a Node.js Server
- Using Node Core Modules
- Working with Requests & Responses (Basics)
- Asynchronous Code & The Event Loop


### How The Web Works
```
User / Client -----------  
    |                   |
  enters                |
    |                   |
http://my-page.com      |
    |                   |
    |                   | Response
Domain Lookup           | (HTML page)
    |                   |
    |                   |
    |                   |
Request -----------> Server
                (at 10.212.212.12)
                        |
                        |
                      Node.js
                        |
                        |
                      Database
```

#### HTTP
Hyper Text Transfer Protocol
A protocol for transferring data which is understood by Browser and Server

#### HTTPS
Hyper Text Transfer Protocol
HTTP + Data Encryption (during Transmission)


### Creating a Node Server

#### Core Modules
| Type  | Function                       |
|-------|--------------------------------|
| http  | Launch a server, send requests |
| https | Launch a SSL server            |

- fs
- path
- os

### The Node Lifecycle & Event Loop

```
node app.js ---------> Start Script
                            |
                            |
                  Parse Code, Register
                  Variables & Functions
                            |
                            |
                        Event Loop
                        (Node App)
                            |
                            |
Keeps on running as<---------
long as there are 
event listeners
registered
```

### Controlling the Node.js Process



### Understanding Requests



### Sending Responses



### Request & Response Headers

[HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

### Routing Requests



### Redirecting Requests



### Parsing Request Bodies

#### Streams & Buffers

Example: Incoming Request
```
Stream -------- Idea: Start working
   |             on the Data early
   |
   |
   |
 Request
Body Part 1
   |
   |
   |
 Request
Body Part 2
   |
   |
   |
 Request --------|
Body Part 3      |
   |             |
   |             | Your Code
   |             |     |
 Request         |     |
Body Part 4 -----|     |
   |                   |
   |            Work with chunks
   |               of data
   |                  |
   |                  |
 Fully  ------------ Buffer
 Parsed 
```

### Understanding Event Driven Code Execution



### Blocking and Non-Blocking Code



### Node.js - Looking Behind the Scenes

#### Single Thread, Event Loop & Blocking Code

![Behind the Scene](https://github.com/lcycstudio/nodejs/blob/master/NodeJS_The_Complete_Guide_(MVC_REST_APIs_GraphQL_Deno)/03_understanding_the_basics/behind_the_scene.png)


#### The Event Loop
- **Timer Execution**
  - Execute setTimeout, setInterval callbacks
- **Pending Callbacks**
  - Execute I/O-related callbacks that were deferred
  - I/O: Input & Output, disk & network operations (~blocking operations)
- **Poll**
  - Retrieve new I/O events, execute their callbacks
  - Jump to Timer Execution or defer execution
- **Check**
  - Execute setImmediate() callbacks
- **Close Callbacks**
  - Online server: `refs == 0`
  - Local server: `process.exit()`




### Using the Node Modules System

#### Exports
```js
module.exports = requestHandler;


module.exports = {
  handler: requestHandler,
  someText: 'Some hard coded text',
};

module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded tex';


exports.handler = requestHandler;
exports.someText = 'Some hard coded tex';
```


### Module Summary

#### How the Web Works

Client ==> Request ==> Server ==> Response ==> Client

#### Program Lifecycle & Event Loop

- Node.js runs non-blocking JS code and uses an event-driven code ("Event Loop")
  for running your logic
- A Node program exists as soon as there is no more work to do
- Note: the `createServer()` event never finishes by default

#### Asynchronous Code
- JS code is non-blocking
- Use callbacks and events ==> Order changes!

#### Requests & Responses
- Parse request data in chunks (Streams & Buffers)
- Avoid "double responses"

#### Node.js & Core Modules
- Node.js ships multiple core modules (htt, fs, path, ...)
- Core modules can be imported into any file to be used there
- Import via `require('module')`

#### The Node Module System
- Import via `require('./path-to-file')` for custom files or `require('module')`
  for core & third-party modules
- Export via `modules.exports` or just exports (for multiple exports)

### Assignment 1: The Basics Start

1. Spin up a Node.js-driven Server (on port 3000)
2. Handle two Routes: "/" and "/users"
  - Return some greeting text on "/"
  - Return a list of dummy users (e.g. `<ul><li>User 1</li></ul>`)
3. Add a form with a "username" `<input>` to the "/" page and submit a
  POST request to "/create-user" upon a button click
4. Add the "/create-user" route and parse the incoming data (i.e. the
  username) and simply log it to the console

  

### Useful Resources & Links


