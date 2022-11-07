const array = [5, 2]
let resultado = 0

for(let i = 0; i < array.length; i++){
  console.log(resultado)
  if(i = 0){
    resultado = array[i]
    console.log(resultado)
  } else {
    resultado = resultado - array[i]
    console.log(resultado)
  };
}

console.log(resultado)