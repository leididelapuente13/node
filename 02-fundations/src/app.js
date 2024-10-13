import {getAge, getId, buildLogger} from "./plugins/index.js";
import {buildPerson} from "./factory.js";

const makePerson = buildPerson({getAge, getId})
const person = makePerson({name: 'Aaron', birthDate: '10-8-5'})
console.log(person);


const logger = buildLogger('app.js');
logger.log('Hello world from logger')
logger.error('Error from logger')
