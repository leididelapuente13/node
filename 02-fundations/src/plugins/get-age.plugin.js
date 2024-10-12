import getAgePlugin from 'get-age';

const getAge = (birthDate)=>{
    if(!birthDate) return new Error('BirthDate is required');
    return getAgePlugin(birthDate);
}

export {getAge};