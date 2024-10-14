interface BuildMakerPersonOptions {
    getID: ()=>string;
    getAge: (birthDate: string)=>number;
}

interface PersonOptions {
    name: string;
    birthDate: string;
}

export const buildMakePerson = ({getAge, getID} : BuildMakerPersonOptions)=>{
    return ({name, birthDate} : PersonOptions)=>{
        return {
            id: getID(),
            name,
            birthDate: birthDate,
            age: getAge(birthDate),
        }
    }
}