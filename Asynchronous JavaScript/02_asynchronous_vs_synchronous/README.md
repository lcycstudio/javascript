## Section 02: Asynchronous vs Synchronous

#### Table of Contents

- Introduction
- What is Asynchronous?
- Blocking vs Non-Blocking
- Multi-Threaded Programming
- Event Driven Programming

### Introduction

### What is Asynchronous?

```js
contents = readFile("./thefile.txt");
connection = openConnection("host", 8080);
write(contents, connection);
close(connection);
```

```js
http.get({ path: "..." }, (response) => {
  let body = "";
  response.on("data", (part) => {
    body + part;
  });
  response.ond("end", () => {
    let parsed = JSON.parse(body);
  });
});
console.log("this gets printed first");
```

**Synchronous programming**means the code runs in a particular sequence of
instructions given in the program. Each instruction waits for the previous
instruction to complete its execution.

**Asynchronous programming** is a technique that enables your program to start a
potentially long-running task and still be able to be responsive to other events
while that task runs, rather than having to wait until that task has finished.

#### Summary

- Sychronous code is easier to predict
- Asynchronous code is harder to predict
- Asynchronous code better for performance

### Blocking vs Non-Blocking

Blocking is Sync

Non-Blocking is Async

```js
contents = readFile("./thefile.txt"); // this blocks the following
connection = openConnection("host", 8080);
write(contents, connection);
close(connection);
```

Blocking is an idea we invented to make writing software easier, but it is not
necessarily how hardwares work. A blocking code means that if the main thread is
occupied with a certain task, all the other "todo's" will be put to the side.
From a user experience point of view, this is something we want to avoid,
because a blocking task will obviously prohibit all kinds of user interaction.

Hardware is non-blocking

Hardware is asynchronous

|            Hardware            | Actual Time | Human Time  |
| :----------------------------: | :---------: | :---------: |
|          1 CPU cycle           |   0.3 ns    |     1 s     |
|      Level 1 cache access      |   0.9 ns    |     3 s     |
|      Level 2 cache access      |   2.8 ns    |     9 s     |
|      Level 3 cache access      |   12.9 ns   |    43 s     |
|       Main memory access       |   120 ns    |    6 min    |
|      Solid-state disk I/O      | 50-150 mus  |  2-6 days   |
|      Rotational disk I/O       |   1-10 ms   | 1-12 months |
|      Internet: SF to NYC       |    40 ms    |   4 years   |
|       Internet: SF to UK       |    81 ms    |   8 years   |
|   Internet: SF to Australia    |   183 ms    |  19 years   |
|    OS virtualization reboot    |     4 s     |  423 years  |
|     SCSI command time-out      |    30 s     | 3000 years  |
| Hardware virtualization reboot |    40 s     | 4000 years  |
|     Physical system reboot     |     5 m     | 32 millenia |

Non-blocking is far better for performance. Non-blocking calls are the calls
that do not block the execution of other operations. In non-blocking operations,
a single process is allowed to serve multiple requests simultaneously. Instead
of waiting for completion, functions are delegated to the system to execute the
next piece of code.

What happens when you block?

### Multi-Threaded Programming

Threads are just processes with shared memory

Threads are hard to get right!

Shared memory means race conditions

Using locks mean deadlocks/livelocks

Another thread takes over when a thread blocks

Writing performant multi-threaded code is hard

### Event Driven Programming

In computer programming, **event-driven programming** is a programming paradigm
in which the flow of the program is determined by events such as user actions
from mice, keyboards, touchpads and touchscreens. Non-user initiated events can
involve sensor inputs, or be programmatically generated (message passing) from
other programs or threads. Event-driven programming is the dominant paradigm
used in **graphical user interfaces** and other applications (e.g., JavaScript
web applications) that are centered on performing certain actions in response to
user input. This is also true of programming for device drivers (e.g., P in USB
device driver stacks).

In an event-driven application, there is generally a **main loop** that listens
for events and then triggers a callback function when one of those events is
detected. In embedded systems, the same may be achieved using **hardware
interrupts** instead of a constantly running main loop. Event-driven programs
can be written in any programming language, although the task is easier in
languages that provide high-level abstractions, such as **await** and
**closures**.

Node abstracts **all** I/O operations into **events** that are handled on an
implicit **eventloop**.

Node is **single threaded**

Your JavaScript code is **single threaded**.

```js
setTimeout(() => {}, 3000);
```

Node does use threads but only the main thread. It use events to sync state.

```js
const fs = require("fs");

fs.readFile("somefile.txt", (err, data) => {
  // Do this once file loaded
});

console.log("this gets called before file loaded");
```

Code doesn't block means there is **always** something that is running.

Node makes it **easy** to write **performant** code

#### Summary

- Node/Chrome do use threads
- Your JavaScript code runs into a single thread
- Asynchronicity is provided by Events
- Event loop

### What Is Multithreading: A Guide to Multithreaded Applications

#### What is a Thread in Programming?

A thread is an independent unit of execution created within the context of a
process (or application that is being executed). When multiple threads are
executing in a process at the same time, we get the term "multithreading." Think
of it as the application's version of multitasking.

#### What Is Multithreading?

Multithreading is a model of program execution that allows for multiple threads
to be created within a process, executing independently but concurrently sharing
process resources. Depending on the hardware, threads can run fully parallel if
they are distributed to their own CPU core.

#### What Is Multithreading Used For?

The main reason for incorporating threads into an application is to improve its
performance. Performance can be expressed in multiple ways:

- A web server will utilize multiple threads to simultaneous process requests
  for data at the same time.
- An image analysis algorithm will spawn multiple threads at a time and segment
  an image into quadrants to apply filtering to the image.
- A ray-tracing application will launch multiple threads to compute the visual
  effects while the main GUI thread draws the final results.

Multithreading also leads to minimization and more efficient use of computing
resources. Application responsiveness is improved as requests from one thread do
not block requests from other threads.

Additionally, multithreading is less resource-intensive than running multiple
processes at the same time. There is much more overhead, time consumption, and
management involved in creating processes as compared to creating and managing
threads.

#### What Is an Example of Multithreading?

Most of the applications that you use on a daily basis have multiple threads
running behind the scenes. Consider your internet browser. At any given time,
you may have numerous tabs open, each one displaying various types of content.
Multiple threads of execution are used to load content, display animations, play
a video, and so on.

Another example of a multithreaded program that we are all familiar with is a
word processor. While you are typing, multiple threads are used to display your
document, asynchronously check the spelling and grammar of your document,
generate a PDF version of the document. These are all happening concurrently,
with independent threads performing these tasks internally.

#### Common Issues in Multithreaded Applications

For all the advantages of using multiple threads, they add complexity and can
create tough bugs to solve. There are some common scenarios where you may
encounter challenges with debugging multithreaded applications. These include:

- Investigating data access issues where two threads are reading and modifying
  the same data. Without the proper use of locking mechanisms, data
  inconsistency and dead-lock situations can arise.
- Thread starvation and resource contention issues arise if many threads are
  trying to access a shared resource.
- Display issues can surface if threads are not coordinated correctly when
  displaying data.

See how both TotalView and GDB features handle these scenarios in a
demonstration of the differences between the two debugging tools.
[Read the white paper](https://totalview.io/sites/totalview/files/pdfs/white-paper-totalview-debugging-multithreaded-apps.pdf)
