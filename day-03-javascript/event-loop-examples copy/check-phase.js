const fs = require(`fs`);
const net = require(`net`)

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
}, 500)

//slow down the initial phase
for (let i = 1; i <= 10000000000; i++);
//after the loop ends and initial phase is done, we enter the poll phase and actually read the file (no callbacks ready)
console.log(`END`);
