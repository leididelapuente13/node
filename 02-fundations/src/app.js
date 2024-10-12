import {getAge, getId} from "./plugins/index.js";
import {buildPerson} from "./1.js";

const makePerson = buildPerson({getAge, getId})
const person = makePerson({name: 'Aaron', birthDate: '10-8-5'})
console.log(person);