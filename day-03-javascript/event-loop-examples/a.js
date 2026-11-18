const timer = {
  seconds: 0,
  start() {
    setInterval(function () {
      this.seconds++
    }, 1000)
  }
}


const timer2 = {
  seconds: 0,
  start() {
    setInterval(() =>{
      this.seconds++
    }, 1000)
  }
}


timer.start()
timer2.start()
console.log(timer.seconds)
console.log(timer2.seconds)
