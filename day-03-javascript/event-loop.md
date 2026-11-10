Event Loop
---
* Node.js uses one JavaScript thread by default.
* The event loop lets Node.js do non-blocking I/O with this one thread.
* Node.js gives the I/O work to the operating system kernel when it can.
* The kernel does the work in the background. When the work is done, the kernel tells Node.js.
* Node.js then puts the callback in the **poll** queue. The callback runs later.

What happens at start
---

* Node.js starts the event loop.
* Node.js runs your main script. The script can start async calls, set timers, or call **process.nextTick()**.
* Node.js starts the loop.
* Each time the loop ends, Node.js checks for pending I/O or timers. If there are none, Node.js exits.

Phases
---

Each phase has its own FIFO queue of callbacks. In each phase, the loop does this:

* It does the work that is special to that phase.
* It runs callbacks until the queue is empty or a limit is reached.
* It goes to the next phase.

The phases, in order:

* **timers**: runs callbacks from **setTimeout()** and **setInterval()**.
* **pending callbacks**: runs some system callbacks that were delayed to this loop (example: some TCP errors).
* **idle, prepare**: internal use only. I can ignore it.
* **poll**: gets new I/O events and runs most I/O callbacks. Node.js can block here.
* **check**: runs **setImmediate()** callbacks.
* **close callbacks**: runs some close events (example: **socket.destroy()**).

*Version note:*

* Node.js 20 uses libuv 1.45.0. Since this version, timers run **after** poll in each loop.
* Before this version, timers ran **before** poll.
* libuv still runs timers one time before it enters the loop, for backwards compatibility.
* The old diagram shows timers first. This change can affect the order of **setImmediate()** and timers.

Poll phase in detail
---

Poll has two jobs:

* Decide how long to block and wait for I/O.
* Run the callbacks in the poll queue.

*If the poll queue has callbacks:*

* The loop runs them one by one.
* It stops when the queue is empty or a system limit is reached.
* The limit stops poll from starving the rest of the loop.

*If the poll queue is empty:*

* If a **setImmediate()** callback is waiting, the loop goes to the **check** phase.
* If not, the loop waits for new callbacks and runs them right away.
* The loop also checks the timers. If a timer is ready, the loop goes back to the **timers** phase.

Timers
---

* A timer delay is a **minimum** time. It is not an exact time.
* A timer callback runs as early as possible after the delay. The operating system or other callbacks can make it late.
* Poll controls when timers run.

*Example from the source:*

* A timer is set for 100 ms.
* A file read takes 95 ms. Its callback then takes 10 ms to run.
* The loop waits in poll. The file read ends at 95 ms. The callback runs until 105 ms.
* Then the loop goes back to timers.
* The timer callback runs at about 105 ms, not 100 ms.

setImmediate() vs setTimeout(fn, 0)
---

* **setImmediate()** runs after the current poll phase.
* **setTimeout()** runs after a minimum time passes.
* In the main module, the order is *not predictable*. It depends on how fast the process runs.
* Inside an I/O callback, **setImmediate()** *always* runs first. This is true for any number of timers.
* Example: read a file with **fs.readFile()**. In its callback, call **setTimeout(fn, 0)** and **setImmediate()**. The output is always "immediate", then "timeout".

process.nextTick()
---

* **process.nextTick()** is **not** a phase of the event loop.
* Node.js runs the nextTick queue when the current operation ends. It does this in any phase.
* All nextTick callbacks run before the loop goes on.
* *Danger:* if you call **process.nextTick()** again and again in a recursive way, the loop cannot reach poll. This starves I/O.

Why nextTick exists
---

* *Rule:* an API must be always async, or always sync. It must not be both.
* Bad example: a function looks async, but it calls the callback at once. The callback reads a variable before the main script sets it. The value is still null.
* Fix: put the callback in **process.nextTick()**. The call stack unwinds first, so the rest of the script finishes. Then the callback runs. It reads the correct value.
* This also happens before the event loop continues.

*Real example: net.createServer().listen(8080)*

* Node.js binds the port at once.
* The "listening" event could fire before you add your handler.
* Node.js puts the event in a nextTick. Your handler is then ready.

nextTick vs setImmediate()
---

* **process.nextTick()** runs in the *same phase*, right after the current operation.
* **setImmediate()** runs in the *next loop iteration* (the check phase).
* The names are the wrong way round. nextTick is "more immediate".
* Node.js will not rename them. A rename would break many npm packages.
* *The docs recommend* **setImmediate()** *in all cases.* It is easier to understand.

When to use nextTick
---

* Give the user time to handle errors, clean up, or retry before the loop continues.
* Run a callback after the call stack unwinds but before the loop continues.
* *EventEmitter example:* you cannot call **emit()** in a constructor. The user has not added a handler yet.
* Fix: in the constructor, call **process.nextTick()** and emit the event inside it. The constructor ends first. Then the event fires.

