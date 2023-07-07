## Section 04: Improved Development Workflow and Debugging

#### Table of Contents
- Module Introduction
- Understanding NPM Scripts
- Installing 3rd Party Packages
- Global Features vs Core Modules vs Third-Party Modules
- Using Nodemon for Autorestarts
- Global & Local npm Packages
- Understanding different Error Types
- Finding & Fixing Syntax Errors
- Dealing with Runtime Errors
- Logical Errors
- Using the Debugger
- Restarting the Debugger Automatically After Editing our App
- Debugging Node.js in Visual Studio Code
- Changing Variables in the Debug Console
- Wrap Up
- Useful Resources & Links



### Module Introduction

#### Debugging & Easier Development
Fixing Errors, Developing Efficiency



### Understanding NPM Scripts
```json
{
  "name": "nodejs-complete-guide",
  "version": "1.0.0",
  "description": "Complete Node.js Guide",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "start-server": "node app.js"
  },
  "author": "Lewis Chen",
  "license": "ISC"
}
```


### Installing 3rd Party Packages

Install as a production dependency
```
npm install nodemon --save-dev
```

Install as a global dependency
```
npm install nodemon -g
```

```json
{
  "name": "nodejs-complete-guide",
  "version": "1.0.0",
  "description": "Complete Node.js Guide",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "start-server": "node app.js"
  },
  "author": "Lewis Chen",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

Delete the `node_modules` folder and re-install it with command
```
npm install
```


### Global Features vs Core Modules vs Third-Party Modules

There are three types of modules:
- Gloabl modules
- Core Node.js modules
- Third-party modules

**Global modules** are always available, you don't need to import them into the files where you want to use them. Keywords like `const` or `function` but also some global objects like process

**Core Node.js Modules** don't need to be installed. That is, NO `npm install` is required, but you need to import them when you want to use features exposed by them. Examples would be the file-system module (`fs`), the path module (`path`) or the Http module (`http`).
```js
const fs = require('fs');
```

**Third-party Modules** need to be installed (via `npm install` in the project folder) and imported. You can add any kind of feature to your app.
```
npm install --save express-session
```
// In code file (e.g. app.js)
```js
const sessions = require('express-session');
```



### Using Nodemon for Autorestarts



### Global & Local npm Packages


The good thing about local dependencies is that you can share projects without the `node_modules` folder (where they are stored) and you can run `npm install` in a project to then re-create that `node_modules` folder. This allows you to share only your source code, hence reducing the size of the shared project vastly.

The command in the terminal below would not work 
```
nodemon app.js
```
This is because we don't use local dependencies there but global packages.



### Understanding different Error Types
- Syntax Errors
- Runtime Errors
- Logical Errors


### Finding & Fixing Syntax Errors

#### Syntax Errors
```js
cons server = http.createServer(routes.handler);
```


### Dealing with Runtime Errors

#### Runtime Errors

Change this line
```js
return res.end();
```
to the following
```js
res.end();
```
The terminal displays the error message
```
node:_http_outgoing:645
    throw new ERR_HTTP_HEADERS_SENT('set');
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 
    at new NodeError (node:internal/errors:399:5)
    at ServerResponse.setHeader (node:_http_outgoing:645:11)
    at Server.requestHandler (C:\Users\lcyc2\dev\nodejs\practice\routes.js:31:7)    
    at Server.emit (node:events:513:28)
    at parserOnIncoming (node:_http_server:1091:12)
    at HTTPParser.parserOnHeadersComplete (node:_http_common:119:17) {
  code: 'ERR_HTTP_HEADERS_SENT'
}
```

### Logical Errors

Change the line 
```js
const message = parsedBody.split('=')[1];
```
to the following
```js
const message = parsedBody.split('=')[0];
```



### Using the Debugger



### Restarting the Debugger Automatically After Editing our App



### Debugging Node.js in Visual Studio Code



### Changing Variables in the Debug Console



### Wrap Up

#### NPM
- npm stands for "Node Package Manager" and it allows you to manage your Node project and its dependencies
- You can initialize a project with `npm init`
- npm scripts can be defined in the package.json to give you "shortcuts" to common tasks or commands

#### 3rd Party Packages
- Node projects typically don't just use core modules and custom and custom code but also third-party packages
- You install them via npm
- You can differentiate between production dependencies (--save), development dependencies (--save-dev) and global dependencies (-g)

#### Types of Errors
- Syntax, runtime and logical errors can break your app
- Syntax and runtime errors throw (helpful) error messages (with line numbers)
- Logical errors can be fixed with testing and the help of the debugger

#### Debugging
- Use the VS Code Node debugger to step into your code and go through it step by step
- Analyze variable values at runtime 
- Look into (and manipulate) variables at runtime
- Set breakpoints cleverly (i.e. respect the async/ event-driven nature)



### Useful Resources & Links

[More on debugging Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/)

[Debugging Node in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)



