const buildPerson = ({getAge, getId})=>{
    return ({name, birthDate})=>{
        return {
            id: getId(),
            name,
            birthDate,
            age: getAge(birthDate),
        }
    }
}

export {buildPerson};