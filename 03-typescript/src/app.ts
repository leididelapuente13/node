import heroes from './data/heroes'
import {findHeroById} from "./services/hero.service";
import {buildLogger, getAge, getId} from './plugins/index'
import {buildMakePerson} from "./factories/buildPerson";

const hero = findHeroById(1);
console.log(hero?.name ?? 'Hero Not Found');

const logger = buildLogger('app.ts');
logger.log('Hello world');
logger.error('something went wrong');

const makePerson = buildMakePerson({getID: getId, getAge: getAge});
const person = makePerson({name: "Aaron", birthDate: "10-10-10"});
console.log('Person data: ', person)