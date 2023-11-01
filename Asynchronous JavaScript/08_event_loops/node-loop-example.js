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

/*
Output: 

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
*/
