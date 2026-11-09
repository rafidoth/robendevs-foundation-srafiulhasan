Execution Context 
-----
Javascript execution requires 2 things
* Javascript Engine : V8, SpidyMonkey, JavascriptCore
* Host Environment :  HTML DOM (browser), Node.js, deno


**Agent Execution Model**
In the JavaScript specification, each autonomous executor of JavaScript is called an agent.

agent can be 
* Window agent: the page we see, browser tab or window.
* Dedicated worker: private helper for one page.
* Shared worker: helper shared by several tabs of a site.
* Service worker: helper for offline use and notifications.
* Worklet: helper for visuals and audio.

this means the boundary of running js.


each agent has these 
* Heap : populated with objects created in code
* Queue (event loop) : enables async programming while being single-threaded
* Stack (execution context stack) : maintains execution contexts. allows transferring control flow by entering and exiting execution contexts like functions. An execution context, also known generally as a stack frame, is the smallest unit of execution.


**Realm** : Each agent owns one or more realms , an execution context points to a realm
  * intrinsic objects like Array, Array.prototype, BigInt, Error, Math
  * global object
    * Spec Properties : points to intrinsic objects
    * Host Properties : document, localstorage, setTimeout, indexed-db, fetch, history, etc.. 
    * User Properties : 
        * variable with var keyword in global scope,  
        * explicitly added properties to global object, 
        * declared functions in global scopes
  * Global Environment Record
      * [[Object Record]] -> Reference to Global Object
      * [[Declarative Record]] -> all identifier bindings that aren't using var keyword
      * [[GlobalThisValue]] -> global object 
      * [[OuterEnv]] -> null


**Global Execution Context** 
* Realm
* Lexical Environment -> 
* Variable Environment




Walkthrough of Execution Context
---- 

```js
var firstName = "Rafiul"
let lastName = "Hasan"


function greet(fName){
  const fullName = fName + " " + lastName; 
  return "Hello " + fullName;
}


greet(firstName)

```

Steps..
1. script loads 
2. Global Execution Context (Creation Phase) - GEC1
```
Lexical Environment ->  [[Declarative Record]] 
lastName = [TDZ]
```

```
Variable Environment -> [[Object Record]]
Global Object : 
  * greet = fn
  * firstName = undefined
```

3. Global Execution Context (Execution Phase)
Call Stack = [GEC1]
```
Lexical Environment ->  [[Declarative Record]] 
* lastName = "Hasan"
```

```
Variable Environment -> [[Object Record]]
Global Object : 
    * greet = fn -> called with argument -> "Creates Function Execution Context (FEC1)"
    * firstName = "Rafiul"
```


4. Function Execution Context (Creation Phase) - FEC1
```
Lexical Environment -> Function Environment Record
* arguments : fname = "Rafiul"
* fullName = [TDZ]

```

```
[[OuterEnv]] ->  Global Environment Record
```


5. Function Execution Context (Execution Phase)
Call Stack = [GEC1, FEC1]
```
Lexical Environment -> Function Environment Record
* arguments : fname = "Rafiul"
* fullName = "Rafiul Hasan"  ("Hasan" comes from outerEnv property which reference global environment record)

```
6. FEC1 exits call stack
7. GEC1 exits call stack





Here 
**Hoisting** : in creation phases the variables are not initialized, for let, const its marked as TDZ and for var its uninitialized.

**Closure**: Inner function env context keeps reference of outer function env in its function env record object.
