input = document.getElementById("inp")


async function processQuery(query){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve("search result : "+query),500)
  })
}


const debounce = function (){
  let timer; 
  return async (query, time)=>{
    return new Promise((resolve, reject)=>{
      clearTimeout(timer)
      timer = setTimeout(()=>{
        resolve(await processQuery(query))
      }, time)
    })
  }
}


let useDebounce = debounce()
input.addEventListener('input', (event) => {
  const valueTyped = event.target.value
  const result = await useDebounce(valueTyped, 500)
  console.log(valueTyped)
});
