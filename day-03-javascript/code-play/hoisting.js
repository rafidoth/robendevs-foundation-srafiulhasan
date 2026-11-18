


// Funtion expressions are not hoisted
//greet()

// TypeError: greet is not a function 
// because of using var it reads undefined
// let greet = function(){
//   console.log("hello")
// }


//ReferenceError: Cannot access 'greet' before initialization
// var greet = function(){
//   console.log("hello")
// }





// Functions are hoisted : 
// entire function is hoisted (both declaration and body)
// can be called before the line its defined
greet()

function greet(){
  console.log("hello")
}
