Promise
---

References: [javascript.info/promise-basics](https://javascript.info/promise-basics)


* A promise is a JavaScript object. It links two parts of the code:
  * The **producing code**. It does a job that takes time (example: load data from a network).
  * The **consuming code**. It waits for the result of that job.
* The producing code makes the result. The promise gives the result to all the consuming code that waits for it.
* Analogy: a singer promises a song. Fans put their email on a list. When the song is ready, all fans get it. The promise is the list.

Create a promise
---

```
let promise = new Promise(function(resolve, reject) {
  // executing code
});
```

* The function inside **new Promise** is the **executor**.
* The executor runs *automatically and at once* when you create the promise.
* **resolve** and **reject** are callbacks. JavaScript gives them to you. You do not make them.
* When the executor has a result (soon or late), it must call one of these:
  * **resolve(value)**: the job finished well. **value** is the result.
  * **reject(error)**: the job failed. **error** is the error object.

State and result
---

A promise object has two internal properties:

* **state**
  * Starts as **"pending"**.
  * Changes to **"fulfilled"** when **resolve** is called.
  * Changes to **"rejected"** when **reject** is called.
* **result**
  * Starts as **undefined**.
  * Changes to **value** when **resolve(value)** is called.
  * Changes to **error** when **reject(error)** is called.

*Notes:*

* You cannot read **state** and **result** in your code. They are internal. You can see them if you log the promise in the console.
* To use them, call **.then**, **.catch**, or **.finally**.
* A promise that is fulfilled or rejected is **settled**. A promise that waits is **pending**.

Promise lifecycle:

![promise-resolve](images/promise-resolve.png)

Examples of the executor
---

Success after 1 second:

```
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});
```

Failure after 1 second:

```
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
```

Result at once, with no waiting:

```
let promise = new Promise(function(resolve, reject) {
  resolve(123);
});
```

* Use this when the job is already done (example: the data is in a cache).

Rules for resolve and reject
---

* A promise has **one** result or **one** error. A state change is final.
* The executor must call **resolve** or **reject** only one time. All other calls are *ignored*.
* **resolve** and **reject** take one argument, or none. They ignore extra arguments.
* You can call **reject** with any value. But always use an **Error** object. It is the best practice.

Example of the "first call wins" rule:

```
let promise = new Promise(function(resolve, reject) {
  resolve("done");
  reject(new Error("..."));         // ignored
  setTimeout(() => resolve("..."));  // ignored
});
```

Consumers: then and catch
---

**.then** subscribes a function to the promise:

```
promise.then(
  function(result) { /* handle success */ },
  function(error) { /* handle error */ }
);
```

* The first function runs when the promise is **resolved**. It gets the result.
* The second function runs when the promise is **rejected**. It gets the error.
* The second function is optional. If you only want success, pass one function.
* **.catch(f)** is the same as **.then(null, f)**. It is a short way to handle only errors.

Cleanup: finally
---

* **.finally(f)** runs **f** when the promise is settled. It does not matter if the result is good or bad.
* Use it for general cleanup. Examples: stop a loading indicator, close a connection.
* It is like **.then(f, f)**, but there are three differences:
  * The **finally** handler has *no arguments*. It does not know if the promise worked or failed.
  * The result or error *passes through* **finally** to the next **.then** or **.catch**.
  * The **finally** handler should not return a value. A returned value is ignored.
* One exception: if **finally** throws an error, that error goes to the next error handler. It replaces the old result.

Example of the pass-through:

```
new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => console.log("Promise ready")) // runs first
  .then(result => console.log(result));        // shows "value"
```

Handlers on a settled promise
---

* If a promise is pending, the handlers wait for the result.
* If a promise is *already settled*, a new handler still runs. It runs as soon as the current code ends.
* So you can add handlers at any time. This is better than a real subscription list. In real life, you must subscribe *before* the song is out.

Example: loadScript
---

Callback version:

```
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}
```

Promise version:

```
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.append(script);
  });
}
```

Why promises are better than callbacks:

* **Natural order.** First call **loadScript()**. Then use **.then** for the result. With callbacks, you must know what to do with the result *before* you call the function.
* **Many handlers.** You can call **.then** many times on one promise. A callback API has only one callback.

Practice: delay
---

Make a promise version of **setTimeout**:

```
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => console.log('runs after 3 seconds'));
```

* **resolve** has no argument here. We only need the delay. We do not need a value.

async-await
---

*This part is not from the page above. It is from my own knowledge.*

* It is special syntax to work with promises.
* An **async** function *always returns a promise*.
* If the function returns a normal value, JavaScript wraps it in a resolved promise.

```
async function f() {
  return 1;
}

f().then(console.log); // 1
```

* **await** can only be used inside an **async** function. (Top-level **await** works in ES modules.)
* **await** pauses the function until the promise is settled. Then it gives the result.
* The pause does not block the thread. Other code can run while the function waits.
* If the promise is rejected, **await** throws the error. Use **try/catch** to handle it.

```
async function g() {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
```

