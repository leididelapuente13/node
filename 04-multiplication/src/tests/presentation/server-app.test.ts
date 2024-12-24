import {ServerApp} from "../../presentation/server-app";
import {CreateTable} from "../../domain/usecases/create-table.usecase";
import {SaveFile} from "../../domain/usecases/save-file.usecase";

describe('server-app tests', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-filename'
    }

    test('should create serverApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')
    });

    test('should run serverApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenCalledWith('Successfully Created');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileName: options.fileName,
            fileDestination: options.fileDestination
        });
    });

    test('should run with customs values mocked', ()=>{
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(false);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith("Server running...");
        expect(createMock).toHaveBeenCalledWith({"base": 2, "limit": 10});
        expect(saveFileMock).toHaveBeenCalledWith({"fileContent": '1 x 2 = 2', "fileDestination": "test-destination", "fileName": "test-filename"})
        // expect(logMock).toHaveBeenCalledWith("Successfully Created");
        expect(logErrorMock).not.toHaveBeenCalledWith()


    })
})