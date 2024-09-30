// Factory functions
/**
 *  Functions that create another function
 *  Are useful to make your code more tolerable to change so is not dependant to external dependencies and too har to change
 */

// Adapter pattern
/**
 * 
 * 
 */

import {v4 as uuid} from 'uuid';
// noinspection JSUnresolvedReference
import {getAge} from 'get-age';
const buildPerson = ({name, birthDate})=>{
    return {
        id: uuid(),
        name,
        birthDate,
        age: getAge(birthDa|te)
    }
}
const obj = {name: "John Doe", birthDate: '2004-10-13'}

const newPerson = buildPerson(obj);

console.log(newPerson)