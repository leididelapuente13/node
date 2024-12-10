import {ServerApp} from "../../presentation/server-app";

describe('server-app tests', ()=>{
    test('should create serverApp instance', ()=>{
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')
    })
})