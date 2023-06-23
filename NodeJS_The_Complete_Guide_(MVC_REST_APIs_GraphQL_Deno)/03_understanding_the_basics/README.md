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

![Behind the Scene]()


### Using the Node Modules System



### Wrap Up



### Useful Resources & Links


