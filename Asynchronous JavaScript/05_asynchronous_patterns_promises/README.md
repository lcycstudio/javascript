## Section 05: Asynchronous Patterns - Promises

#### Table of Contents

- Promises - Basics
- Promises - Quiz #1
- Promises - Chaining
- Promises - Quiz #2
- Promises - Returning Promises
- Promises - Quiz #3
- Promises - Error Handling
- Promises - Quiz #4
- Promises - Finally
- Promises - All
- Promises - Race
- Promises - Quiz #5
- Promises - Quiz #6

### Promises - Basics

#### Promise API

In ES6 we have an alternative mechanism built into the language called a
_promise_.

A _promise_ is a _placeholder_ for a future value.

It serves the same function as callbacks but has a nicer syntax and makes it
easier to handle errors.

#### Creating a Promise

We create an instance of a promise by calling `new` on the `Promise` class, like
so:

```js
const promise = new Promise((resolve, reject) => {
  // resolve? reject?
});
```

Inside this inner function we perform our asynchronous processing and then when
we are ready we call `resolve()`, like so:

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Work Complete");
    resolve(); // <-- Resolving
  }, 1000);
});
```

We usually return this promise from a function, like so:

```js
function doAsyncTask() {
  // <-- NOTE: Not passing in a callback

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Async Work Complete");
      resolve(); // <-- Resolving
    }, 1000);
  });
  return promise; // <-- Return the promise
}
```

If there was an error in the async task then we call the `reject()` function
like so:

```js
function doAsyncTask() {
  let error = false;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Async Work Complete");
      if (error) {
        reject(); // <-- Rejecting
      } else {
        resolve();
      }
    }, 1000);
  });
  return promise;
}
```

#### Promise Notifications

We can get notified when a promise `resolves` by attaching a _success_ handler
to its `then` function, like so:

```js
doAsyncTask().then(() => console.log("Task Complete!"));
```

`then` can take two arguments, the second argument is a _error_ handler that
gets called if the promise is `rejected`, like so:

```js
doAsyncTask().then(
  () => console.log("Task Complete!"),
  () => console.log("Task Errored!")
);
```

Any values we pass to the `resolve` and `reject` functions are passed along to
the _error_ and _success_ handlers, like so:

```js
function doAsyncTask() {
  let error = false;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject("error"); // pass values
      } else {
        resolve("done"); // pass values
      }
    }, 1000);
  });
}

doAsyncTask().then(
  (val) => console.log(val),
  (err) => console.error(err)
);
```

### Promises - Quiz #1

Create a promise version of the async readFile function

```js
const fs = require("fs");

function readFile(filename, encoding) {
  fs.readFile(filename, encoding, (err, data) => {
    //TODO
  });
}
readFile("./files/demofile.txt", "utf-8")
  .then(...)
```

#### Answer

```js
// const fs = require("fs");
// const util = require("util");
// const readFile = util.promisify(fs.readFile);
// The lines above are short codes to achieve the same result

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
readFile("./files/demofile.txt", "utf-8").then(
  (data) => console.log("File Read", data),
  (err) => console.error("Failed To Read File", err)
);
```

### Promises - Chaining

#### Immediate Resolution or Rejection

We can create an immediately _resolved_ Promise by using the `Promise.resolve()`
method, like so:

```js
let promise = Promise.resolve("done");
```

And an immediately _rejected_ Promise by using the `Promise.reject()` method,
like so:

```js
let promise = Promise.reject("fail");
```

One of the nice things about Promises is that if we add a `then` handler _after_
the promise resolves or rejects the handler _still_ gets called.

```js
let promise = Promise.resolve("done");

let promise = Promise.resolve("done");
promise.then((val) => console.log(val)); // 'done'
```

In the above example, even though the Promise has resolved _before_ we added the
success handler, the promise framework still calls the success handler.

#### Promise is really async

```js
function doAsyncTask() {
  return Promise.resolve();
}

doAsyncTask().then((_) => console.log(message)); // <-- Unlike callbacks, promises are always async
let message = "Promise Resolved";
```

#### Chaining

We can also connect a series of `then` handlers together in a chain, like so:

```js
const prom = Promise.resolve("done");
prom
  .then((val) => {
    console.log(val);
    return "done2"; // <-- !NOTE: We have to return something, otherwise it doesn't get passed
  })
  .then((val) => console.log(val));
// 'done'
// 'done2'
```

- We **have** to return something from each `then`, otherwise it doesn't get
  passed to the next `then`

```js
const prom = Promise.resolve("done");
prom
  .then((val) => {
    console.log(val);
  })
  .then((val) => console.log(val));
// 'done'
// 'undefined'
```

- This is different to forking a promise chain

```js
const prom = Promise.resolve("done");
prom.then((val) => {
  console.log(val);
  return "done2";
});

prom.then((val) => console.log(val)); // <-- Doesn't get passed the result of the previous then
// 'done'
// 'done'
```

### Promises - Quiz #2

Load a file from disk using readFile and then compress it using the async zlib
node library, use a promise chain to process this work.

```js
const fs = require("fs");
const zlib = require("zlib");

function zlibPromise(data) {
  zlib.gzip(data, (error, result) => {
    //TODO
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./files/demofile.txt", "utf-8")
  .then(...) // --> Load it then zip it and then print it to screen
```

#### Answer

```js
const fs = require("fs");
const zlib = require("zlib");

function zlibPromise(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./demofile.txt", "utf-8").then(
  (data) => {
    zlibPromise(data).then(
      result => console.log(result),
      err => console.log(err)
    );
  },
  (err) => console.log(err);
);
```

### Promises - Returning Promises

We can also pause execution waiting for another promise to resolve

```js
Promise.resolve("done")
  .then((val) => {
    console.log(val);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("1 second");
        resolve("done2");
      }, 1000);
    });

    // The next then waits for this promise to resolve before continueing
  })
  .then((val) => console.log(val));
```

### Promises - Quiz #3

Convert the previous code so that it now chains the promise as well.

#### Answer

```js
const fs = require("fs");
const zlib = require("zlib");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const zlibPromise = util.promisify(zlib.gzip);

readFile("./demofile.txt", "utf-8")
  .then(
    (data) => {
      return zlibPromise(data);
    },
    (err) => {
      console.error("Failed To Read", err);
    }
  )
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.error("Failed To Zip", err);
    }
  );
```

### Promises - Error Handling

Promises pass an error along the chain till it finds an error handler. So we
don't need to define an error handler for each `then` function, we can just add
one at the end like so:

```js
Promise.reject("fail")
  .then((val) => console.log(val)) // <-- Note we dont have an error handler here!
  .then(
    (val) => console.log(val),
    (err) => console.error(err)
  );
```

If we _throw_ an exception from our promise function or one of the success
handlers, the promise gets rejected and the error handler is called, like so:

```js
new Promise((resolve, reject) => {
  throw "fail";
})
  .then((val) => {
    console.log(val);
  })
  .then(
    (val) => console.log(val),
    (err) => console.error(err)
  );
// [Error: fail]
```

```js
Promise.resolve("done")
  .then((val) => {
    throw "fail";
  })
  .then(
    (val) => console.log(val),
    (err) => console.error(err)
  );
// [Error: fail]
```

The `catch` function works exactly the same way as the `then` error handler,
it's just clearer and more explicitly describes our intent to handle errors.

```js
Promise.resolve("done")
  .then((val) => {
    throw "fail";
  })
  .then((val) => console.log(val))
  .catch((err) => console.error(err));
```

### Promises - Quiz #4

Convert the previous code so that it now handles errors using the catch handler

```js
const fs = require("fs");
const zlib = require("zlib");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const zlibPromise = util.promisify(zlib.gzip);

readFile("./demofiled.txt", "utf-8")
  .then((data) => {
    return zlibPromise(data);
  })
  .catch((err) => {
    console.error("Failed To Read: ", err);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error("Failed to Zip: ", err);
  });
```

### Promises - Finally

In preview

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

```js
Promise.resolve("done")
  .then((val) => {
    throw new Error("fail");
  })
  .then((val) => console.log(val))
  .catch((err) => console.error(err))
  .finally((_) => console.log("Cleaning Up")); // <-- Comming soon!
```

```bash
cd './Asynchronous JavaScript/05_asynchronous_patterns_promises/'
node working.js
```

### Promises - All

#### Multiple Promises

`Promise.all` will resolve or reject all of the promises that are passed into
the parameter.

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./demofile.txt", "./demofile.other.txt"];

let promises = files.map((name) => readFile(name, "utf8"));
Promise.all(promises)
  .then((values) => {
    // <-- Uses .all
    console.log(values);
  })
  .catch((err) => console.error("Error: ", err)); // returns only one error
```

### Promises - Race

Resolves or rejects when the first promise in the array resolved or rejects

```js
let car1 = new Promise((resolve) => setTimeout(resolve, 1000, "Car 1."));
let car2 = new Promise((resolve) => setTimeout(resolve, 2000, "Car 2."));
let car3 = new Promise((resolve) => setTimeout(resolve, 3000, "Car 3."));

Promise.race([car1, car2, car3]).then((value) => {
  console.log("Promise Resolved", value);
});
```

<!-- More usefull if requesting a lot of data that all needs to return. -->

```js
let car1 = new Promise((_, reject) =>
  setTimeout(reject, 2000, "Car 1 Crashed.")
);
let car2 = new Promise((resolve) => setTimeout(resolve, 1000, "Car 2."));
let car3 = new Promise((resolve) => setTimeout(resolve, 3000, "Car 3."));

Promise.race([car1, car2, car3])
  .then((value) => {
    console.log("Promise Resolved", value);
  })
  .catch((err) => {
    console.log("Promise Rejected", err);
  });
```

### Promises - Quiz #5

Create some code that tries to read from disk a file and times out if it takes
longer than 1 seconds, use `Promise.race`

```js
function readFileFake(sleep) {
  return new Promise((resolve) => setTimeout(resolve, sleep));
}

readFileFake(5000); // This resolves a promise after 5 seconds, pretend it's a large file being read from disk
```

#### Answer

```js
function readFileFake(timer) {
  return new Promise((resolve) => setTimeout(resolve, timer, "read"));
}

function timeout(timer) {
  return new Promise((_, reject) => setTimeout(reject, timer, "timeout"));
}

Promise.race([readFileFake(5000), timeout(1000)])
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

### Promises - Quiz #6

Create a process flow which publishes a file from a server, then realises the
user needs to login, then makes a login request, the whole chain should error
out if it takes longer than 1 seconds. Use `catch` to handle errors and
timeouts.

#### Answer

```js
function authenticate() {
  console.log("Authenticating");
  return new Promise((resolve) => setTimeout(resolve, 2000, { status: 200 }));
}

function publish() {
  console.log("Publishing");
  return new Promise((resolve) => setTimeout(resolve, 2000, { status: 403 }));
}

function timeout(sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
}

function safePublish() {
  return publish().then((res) => {
    if (res.status === 403) {
      return authenticate();
    }
    return res;
  });
}

// This solution doesn't compare timeout with both publish
// and authenticate as the whole chain
const badSolution = () => {
  return Promise.race([publish(), timeout(3000)])
    .then((res) => {
      if (res.status === 403) {
        return authenticate();
      }
      return res;
    })
    .then((res) => {
      // Process save responce
      console.log("Published");
    })
    .catch((err) => {
      if (err === "timeout") {
        console.error("Request timed out");
      } else {
        console.error(err);
      }
    });
};

const goodSolution = () => {
  Promise.race([safePublish(), timeout(3000)])
    .then((res) => {
      // Process save responce
      console.log("Published");
    })
    .catch((err) => {
      if (err === "timeout") {
        console.error("Request timed out");
      } else {
        console.error(err);
      }
    });
};

goodSolution();
```
