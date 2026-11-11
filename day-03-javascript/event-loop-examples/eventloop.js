import fs from 'fs';
import net from 'net';

console.log(`START`);
setImmediate(() => {
  console.log("set immidiate call")
})

const readFileCallback = (err, data) => {
  console.log(`readFileCallback ${data}`);
};
const f = 'test.txt'
//in the intial phase this file will only be opened (not read)
//if it fails we immediately know, we add a callback in the poll queue with failure.
fs.readFile(f, readFileCallback);

// pending callback phase
// Create a client
const clientFail = new net.Socket();
clientFail.setTimeout(1000)

// Connect to the server (fails)
clientFail.connect(9999,'192.168.4.21', () => {
    console.log(`Connected to server at ${'192.168.4.21'}:${9999}`);
});
// Handle errors
clientFail.on('error', (err) => {
    console.error(`Connection error: ${err.message}`);
});

// timer phase
setTimeout(() => {
  console.log("timer !!")
  process.nextTick(() => {
    console.log("next tick after Timer phase")
  })
}, 500)

setTimeout(() => {
  console.log("2nd timer !!")
  process.nextTick(() => {
    console.log("next tick after 2nd Timer  phase")
  })
}, 500)

// promise
const justafunc = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise resolved")
    }, 400)
  })
}
const promise_result = await justafunc()
console.log(promise_result)


//slow down the initial phase
for (let i = 1; i <= 10000000000; i++);

process.nextTick(()=>console.log("next tick after initial phase"))
//after the loop ends and initial phase is done, we enter the poll phase and actually read the file (no callbacks ready)
console.log(`END`);
