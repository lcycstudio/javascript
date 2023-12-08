## Section 05: Working with Express.js

#### Table of Contents

- Module Introduction
- What is Express.js?
- Installing Express.js
- Adding Middleware
- How Middleware Works
- Express.js - Looking Behind the Scenes
- Handling Different Routes
- Assignment 1: Time to Practice - Express.js
- Parsing Incoming Requests
- Limiting Middleware Execution to POST Requests
- Using Express Router
- Adding a 404 Error Page
- Filtering Paths
- Creating HTML Pages
- Serving HTML Pages
- Returning a 404 Page
- A Hint!
- Using a Helper Function for Navigation
- Styling our Pages
- Serving Files Statically
- Assignment 2: Time to Practice - Navigation
- Wrap Up
- Useful Resources & Links

### Module Introduction

- What is Express.js?
- Using Middleware
- Working with Requests & Responses
- Routing
- Returning HTML Pages

### What is Express.js?

#### Why use Express.js

- Server logic is complex
- You want to focus on your business logic, not on the details
- Use a framework for the heavy lifting

#### Alternatives to Express.js

- Vanilla Node.js
- Adonis.js
- Koa
- Sails.js

### Installing Express.js

```
npm install --save express
```

### Adding Middleware

#### It's all about Middleware

```
Request
    |
    |
Middleware (req, res, next) => { ... }
    | next()
    |
Middleware (req, res, next) => { ... }
    | res.send()
    |
Response
    |
    |
```

### How Middleware Works

### Express.js - Looking Behind the Scenes

### Handling Different Routes

https://expressjs.com/en/4x/api.html#app

### Assignment 1: Time to Practice - Express.js

1. Create a npm project and install Express.js (Nodemon if you want)
2. Create an Express.js app which funnels the requests through 2 middleware
   functions that log something to the console and return one response.
3. Handle requests to "/" and "/users" such that each request only has one
   handler/middleware that does something with it (e.g. send dummy response).

### Parsing Incoming Requests

```
npm install --save body-parser
```

### Limiting Middleware Execution to POST Requests

```js
const app = express();
```

app methods

```
app.all()
app.delete()
app.disable()
app.disabled()
app.enable()
app.enabled()
app.engine()
app.get()
app.get()
app.listen()
app.METHOD()
app.param()
app.path()
app.post()
app.put()
app.render()
app.route()
app.set()
app.use()
```

### Using Express Router

### Adding a 404 Error Page

### Filtering Paths

### Creating HTML Pages

### Serving HTML Pages

### Returning a 404 Page

### A Hint!

### Using a Helper Function for Navigation

### Styling our Pages

### Serving Files Statically

### Assignment 2: Time to Practice - Navigation

1. Create a npm project and install Express.js (Nodemon if you want)
2. Create an Express.js app which serves two HTML files (of your choice with
   your content) for "/" and "/users".
3. Add some static (.js or .css) files to your project that should be required
   by at least one of your HTML files.

### Wrap Up

#### What is Express.js?

- Express.js is a Node.js framework - a package that adds a bunch of utility
  functions and tools and a clear set of rules on how the app should be built
  (middleware)
- It's highly extensible and other packages can be plugged into it (middleware)

#### Routing

- You can filter requests by path and method
- If you filter by method, paths are matched exactly; otherwise, the first
  segment of a URL is matched
- You can use the `express.Router` to split your routes across files elegantly

#### Middleware, next() and use()

- Express.js relies heavily on middleware functions - you can easily add them by
  calling `use()`
- Middlware functions handle a request and should call `next()` to forward the
  request to the next function in line or send a response

#### Serve Files

- You are not limited to serving dummy text as a response
- You can `sendFile()` to your users - e.g. HTML files
- If a request is directly made for a file (e.g. a `.css` file is requested),
  you can enable static serving for such files via `express.static()`

### Useful Resources & Links

#### Express.js Official Docs

https://expressjs.com/en/starter/installing.html
