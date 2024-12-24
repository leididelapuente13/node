import {ServerApp} from "../presentation/server-app";

describe("Test App.ts", () => {
    test('Should call Server.run with values', async ()=>{
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-n', 'test-file', '-d', 'test'];

        await import('../app');

        expect(serverRunMock).toHaveBeenCalledWith({base: 10, limit: 5, showTable: false, fileName: 'test-file', fileDestination: 'test'})
    })
})