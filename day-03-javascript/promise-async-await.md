Promise 
---
[promise](https://javascript.info/promise-basics)


```
let promise = new Promise(function(resolve, reject) {
  // executing code
});
```

When the executor obtains the result, be it soon or late, doesn’t matter, it should call one of these callbacks:
* resolve(value) :  if the job is finished successfully, with result value.
* reject(error) : if an error has occurred, error is the error object.



promise object contains 2 properties (can be seen by console log the promise)
* state 
* result

so, promise lifecycle
![promise-resolve](images/promise-resolve.png)




