## Section 08: Event Loops

#### Table of Contents

- Introduction
- Node Event Loop
- Node Event Loop Example
- Node Event Loop Live Demo
- Node Event Loop Quiz #1
- Node Event Loop Quiz #2
- Chrome Event Loop

### Introduction

### Node Event Loop

![Event Loop](/Asynchronous%20JavaScript/08_event_loops/event_loop.png)

![Macro & Macro Tasks](/Asynchronous%20JavaScript/08_event_loops/macro_micro_tasks.png)

### Node Event Loop Example

```js
/* Event Loop / Macro & Micro Tasks */

console.log("start"); // macro task

// macro task
const interval = setInterval(() => {
  debugger;
  console.log("setInterval");
}, 0);

// macro task
setTimeout(() => {
  debugger;
  console.log("setTimeout 1"); // macro task
  Promise.resolve()
    .then(() => {
      debugger;
      console.log("promise 3"); // micro task
    })
    .then(() => {
      debugger;
      console.log("promise 4"); // micro task
    })
    .then(() => {
      setTimeout(() => {
        debugger;
        console.log("setTimeout 2"); // macro task
        Promise.resolve()
          .then(() => {
            debugger;
            console.log("promise 5"); // micro task
          })
          .then(() => {
            debugger;
            console.log("promise 6"); // micro task
          })
          .then(() => {
            debugger;
            clearInterval(interval); // micro task
          });
      });
    });
});

// micro task
Promise.resolve()
  .then(() => {
    debugger;
    console.log("promise 1");
  })
  .then(() => {
    debugger;
    console.log("promise 2");
  });

console.log("end");
```

Output

```bash
start
end
promise 1
promise 2
setInterval
setTimeout 1
promise 3
promise 4
setInterval
setTimeout 2
promise 5
promise 6
```

### Node Event Loop Live Demo

### Node Event Loop Quiz #1

# Quizz 1

Using you're knowledge of the event loop, create a program which prints out the
below. If the log line mentions a `setInterval` it must be printed inside a
`setInterval` etc..

```bash
start
end
setInterval 1
promise 1
promise 2
```

```js
console.log("start");
const interval = setInterval(() => {
  console.log("setInterval 1");
  clearInterval(interval);
}, 0);
console.log("end");
```

#### Answer

```js
console.log("start");
const interval = setInterval(() => {
  console.log("setInterval 1");
  Promise.resolve()
    .then(() => {
      console.log("promise 1");
    })
    .then(() => {
      console.log("promise 2");
    });
  clearInterval(interval);
}, 0);
console.log("end");
```

### Node Event Loop Quiz #2

Extend the previous example to print out the following log lines, use
`process.nextTick` and `setImmediate`

```bash
start
end
setInterval 1
promise 1
promise 2
processNextTick 1
setImmediate 1
promise 3
promise 4
```

#### Answer 1

```js
console.log("start");
const interval = setInterval(() => {
  console.log("setInterval 1");
  Promise.resolve()
    .then(() => {
      console.log("promise 1");
    })
    .then(() => {
      console.log("promise 2");
    })
    .then(() => {
      setImmediate(() => {
        console.log("setImmediate 1");
        Promise.resolve()
          .then(() => {
            debugger;
            console.log("promise 3");
          })
          .then(() => {
            debugger;
            console.log("promise 4");
          })
          .then(() => {
            debugger;
            clearInterval(interval);
          });
      });
      process.nextTick(() => console.log("processNextTick 1"));
    });
  clearInterval(interval);
}, 0);
console.log("end");
```

#### Answer 2

```js
console.log("start");
const interval = setInterval(() => {
  console.log("setInterval 1");
  Promise.resolve()
    .then(() => {
      console.log("promise 1");
      setImmediate(() => {
        console.log("setImmediate 1");
        Promise.resolve()
          .then(() => {
            console.log("promise 3");
          })
          .then(() => {
            console.log("promise 4");
          })
          .then(() => {
            clearInterval(interval);
          });
      });
      process.nextTick(() => console.log("processNextTick 1"));
    })
    .then(() => {
      console.log("promise 2");
    });
}, 0);

console.log("end");
```

### Chrome Event Loop

![Chrome Event Loop](/Asynchronous%20JavaScript/08_event_loops/chrome.png)

```js
while (true) {
  task = eventLoop.nextTask();
  if (task) {
    task.execute();
  }
  eventLoop.executeMicrotasks();
  if (eventLoop.needsRendering()) {
    eventLoop.render();
  }
}
```

[Raf vs setTimeout](/Asynchronous%20JavaScript/08_event_loops/raf-vs-set-timeout.html)
