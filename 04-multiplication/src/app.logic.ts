import fs from "fs"
import {yarg} from "./plugins/yargs.plugin";

const {b: base, l: limit, s: showTable} = yarg

let outputMessage: string = ''
const headerMessage: string = `
==================================== 
Tabla de multiplicacion del ${base}
====================================\n
`

for (let i: number = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`;
}

const outputPath = "outputs"

if(showTable){
    console.log(outputMessage);
}

fs.mkdirSync(outputPath, {recursive: true})
fs.writeFileSync(`${outputPath}/multiplication-table-${base}.txt`, `${headerMessage} \n ${outputMessage}`, 'utf8');
console.log("file created")