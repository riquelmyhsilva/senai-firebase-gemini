const num1 = 1
const num2 = 2

const resultado = num1 + num2

console.log(resultado)

function somar_classic(a,b){
    return console.log((a + b))
}

const somar_arrow = (a,b) => {
    return console.log((a + b))
}

somar_classic(10,2)

somar_arrow(2,2)

sqrt = (x) => x ** 2 

sqrt(2)
