## Section 05: Asynchronous Patterns - Promises

#### Table of Contents

- Promises - Basics
- Promises - Quiz #1
- Promises - Chaining
- Promises - Quiz #3
- Promises - Returning Promises
- Promises - Quiz #4
- Promises - Error Handling
- Promises - Quiz #5
- Promises - Finally
- Promises - All
- Promises - Race
- Promises - Quiz #6
- Promises - Quiz #7

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

### Promises - Chaining

### Promises - Quiz #3

### Promises - Returning Promises

### Promises - Quiz #4

### Promises - Error Handling

### Promises - Quiz #5

### Promises - Finally

### Promises - All

### Promises - Race

### Promises - Quiz #6

### Promises - Quiz #7
