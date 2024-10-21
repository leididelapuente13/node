import {buildMakePerson} from "../../factories/buildPerson";

describe("buildPerson", () => {
    const getUUID = ()=> '123';
    const getAge = ()=> 35;

    test('buildMakePerson should return a function', ()=>{
        const makePerson = buildMakePerson({getID: getUUID, getAge: getAge});

        expect(typeof makePerson).toBe('function');
    })

    test('buildMakePerson should return a person', ()=>{
        const makePerson = buildMakePerson({getID: getUUID, getAge: getAge});
        const johnDoe = makePerson({
            name: "John Doe",
            birthDate: '10-10-2004'
        })

        expect((johnDoe)).toMatchObject({
            id: '123',
            name: "John Doe",
            birthDate: '10-10-2004',
            age: 35
        })
    })
})