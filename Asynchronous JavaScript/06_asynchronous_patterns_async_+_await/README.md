## Section 06: Asynchronous Patterns - Async + Await

#### Table of Contents

- Async/Await - Basics
- Async/Await - Quiz #1
- Async/Await - No Await
- Async/Await - Async Iterators
- Async/Await - Quiz #2
- Async/Await - Warning

### Async/Await - Basics

#### How to create

```js
const doAsyncTask = () => Promise.resolve("done");
```

When using promises we attach a then

```js
const doAsyncTask = () => Promise.resolve("done");
doAsyncTask().then((val) => console.log(val));
console.log("here"); // <-- this is called first!
```

When using async/await we don't need to attach a then

```js
const doAsyncTask = () => Promise.resolve("done");
async function asim() {
  // <-- mark it as `async`
  let value = await doAsyncTask(); // <-- Don't need to call .then
  console.log(value);
}
asim();
```

can write that as an IFFE

```js
const doAsyncTask = () => Promise.resolve("done");
(async function () {
  // <-- IIFE, note the async
  let value = await doAsyncTask(); // <-- Don't need to call .then
  console.log(value);
})();
```

Also it blocks

```js
const doAsyncTask = () => Promise.resolve("1");
(async function () {
  let value = await doAsyncTask();
  console.log(value);
  console.log("2"); //----> This waits before it's printed
})();
```

vs. without the await, it prints the other way round

```js
const doAsyncTask = () => Promise.resolve("1");
(async function () {
  doAsyncTask().then(console.log);
  console.log("2");
})();
```

#### Async functions return a promise

```js
const doAsyncTask = () => Promise.resolve("1");
let asyncFunction = async function () {
  let value = await doAsyncTask();
  console.log(value);
  console.log("2");
  return "3"; // Whatever we return is like a resolve
};
asyncFunction().then((v) => console.log(v)); // We can attach a then to it
```

#### Handling Errors

Because it's now sync we can use try/catch, the catch value is what was returned
in the reject

```js
const doAsyncTask = () => Promise.reject("error");
const asyncFunction = async function () {
  try {
    const value = await doAsyncTask();
  } catch (e) {
    console.error("Moo: ", e);
    return;
  }
};
asyncFunction();
```

### Async/Await - Quiz #1

Convert the promise version of the multi-file loader over to using async/await

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./files/demofile.txt", "./files/demofile.other.txt"];

let promises = files.map((name) => readFile(name, { encoding: "utf8" }));
Promise.all(promises).then((values) => {
  // <-- Uses .all
  console.log(values);
});
```

#### Answer

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./demofile.txt", "./demofile.other.txt"];

// <-- One file loaded at a time, instead of all files at once
(async () => {
  for (let name of files) {
    console.log(await readFile(name, "utf8"));
  }
})();

const asyncFunction = async function () {
  let promises = files.map((name) => readFile(name, { encoding: "utf8" }));

  await Promise.all(promises)
    .then((values) => {
      console.log(values);
    })
    .catch((err) => {
      console.log(err);
    });
};
asyncFunction();
```

### Async/Await - No Await

#### Async isn't magic

What does the below code print?

```js
async function printLine1() {
  // console.log("1");
  setImmediate((_) => console.log("1"));
}

async function printLine2() {
  console.log("2");
}

async function main() {
  printLine1();
  printLine2();
}
main();
console.log("Finished");
```

If you are not going to use `await`, don't use `async`.

### Async/Await - Async Iterators

#### Async Iterators

This feature is still in experimental phases, it hasn't been fully rolled out to
all browser and it's only avaiable in node at least 9.1 behind a flag.

It's a subtle difference, but now you can iterate over iterators that return
promises, like so:

```js
(async () => {
  const util = require("util");
  const fs = require("fs");
  const readFile = util.promisify(fs.readFile);

  const files = ["./demofile.txt", "./demofile.other.txt"];
  const promises = files.map((name) => readFile(name, "utf8"));
  for await (let content of promises) {
    //<-- See the await is on the for
    console.log(content);
  }
})();
```

#### Custom Iterators

We can loop over a pre-built array of promises with `for-await-of`.

An array is an iterator, which just means that it's an object that has a
property with name `Symbol.iterator` that points to an object with a `next()`
function that returns an object with `{ done: false, value: ? }` for each value.
When you want the iterator to complete just return `done: true` instead.

Then you can use it where you would use any iterator, like `for-of`.

```js
const customIterator = () => ({
  [Symbol.iterator]: () => ({
    x: 0,
    next() {
      if (this.x > 100) {
        return {
          done: true,
          value: this.x,
        };
      }
      return {
        done: false,
        value: this.x++,
      };
    },
  }),
});

for (let x of customIterator()) {
  console.log(x);
}
```

#### Custom Async Iterators

We can also use custom iterators with the new `for-await-of` syntax by using
`Symbol.asyncIterator` and making sure the value returned is a `Promise`, like
so:

```js
const customAsyncIterator = () => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      if (this.x > 100) {
        return Promise.resolve({
          done: true,
          value: this.x,
        });
      }

      return Promise.resolve({
        done: false,
        value: this.x++,
      });
    },
  }),
});

(async () => {
  for await (let x of customAsyncIterator()) {
    console.log(x);
  }
})();
```

### Async/Await - Quiz #2

Again convert the promise version of the multi-file loader over to using
async/await but using a custom async iterator with the following syntax

```js
const fileIterator = (files) => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      // TODO
    },
  }),
});

(async () => {
  for await (let x of fileIterator([
    "./demofile.txt",
    "./demofile.other.txt",
  ])) {
    console.log(x);
  }
})();
```

#### Answer

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const fileIterator = (files) => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      if (this.x >= files.length) {
        return Promise.resolve({
          done: true,
          value: this.x,
        });
      }

      let file = files[this.x++];
      return readFile(file, "utf8").then((data) => ({
        done: false,
        value: data,
      }));
    },
  }),
});

files = ["./demofile.txt", "./demofile.other.txt"];

(async () => {
  for await (let x of fileIterator(files)) {
    console.log(x);
  }
})();
```

### Async/Await - Warning

Async functions are performant

Write async functions in small blocks
