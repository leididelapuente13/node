import {getUserById} from "../../foundations/03-callbacks";

describe('03-callbacks', () => {
    test('getUserById should return an error if user does not exist ', (done)=>{
        const id = 10;

        getUserById(id, (err, user) => {
            expect(err).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();
            done();
        });
    });

    test('getUserBiId should return John Doe', (done)=>{
        const id = 1;

        const userMock = {
            id: 1,
            name: 'John Doe',
        }

        getUserById(id, (err, user) => {
            expect(err).toBeUndefined();
            expect(user).toMatchObject(userMock);
            done();
        })
    })
})