// async function Fn (){
//   return new Promise((resolve, reject)=>{
//     setTimeout(() => {
//       resolve(1)
//     }, 4000);
//   })
// }
//
// const val = await Fn() 
// console.log(val)
//
// console.log("Hello world")
//
//
//
//
function longRunningTask(){
  let count = 0
  for(let i = 0; i < 1e10; i++){
    count++
  }
  return count
}


function longRunningTask2(){
  let count = 0
  for(let i = 0; i < 1e9; i++){
    count++
  }
  return count+2
}

async function longAsync(){
  return new Promise((resolve, reject)=>{
    resolve(longRunningTask())
  })
}


async function longAsync2(){
  return new Promise((resolve, reject)=>{
    resolve(longRunningTask2())
  })
}

console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log(await longAsync())
console.log(await longAsync2())  




