import {getAge} from "../../plugins";

describe("get-age.plugin.test.ts", () => {
    test('getAge should return the age of a person', ()=>{
        const birthDate = '2004-10-13';
        const age = getAge(birthDate);
        expect(typeof age).toBe('number');
    });

    test('getAge should return the current age of the person', ()=>{
        const birthDate = '2004-10-13';
        const age = getAge(birthDate);
        const calculatedAge = new Date().getFullYear() - new Date(birthDate).getFullYear()
        expect(age).toBe(calculatedAge);
    })

    test('getAge should return 0 years', ()=>{
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1985);

        const birthDate = '1985-10-13';
        const age = getAge(birthDate);

        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
    });
})