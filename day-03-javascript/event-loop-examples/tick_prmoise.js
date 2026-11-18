

console.log("start")
const fn1 = async () => {
  const factResponse = await fetch("https://catfact.ninja/fact");
  const fact = await factResponse.json();
  console.log(fact);
};

fn1()

process.nextTick(() => {
  console.log("next tick")
})

console.log("end")
