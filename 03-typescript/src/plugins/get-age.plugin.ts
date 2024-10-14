export const getAge = (birthDate: string)=>{
    if (!birthDate) throw new Error('birtDate is required');
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
}