let outputMessage : string = ''
const base : number = 5;
const headerMessage : string =
    `==================================== 
     Tabla de multiplicacion del ${base}
     ====================================`

for(let i: number=1; i <= 10; i++){
    outputMessage += `${base} x ${i} = ${base * i}\n`;
}

console.log(headerMessage);
console.log(outputMessage)
