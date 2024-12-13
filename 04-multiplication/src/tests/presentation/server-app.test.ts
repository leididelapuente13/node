import {ServerApp} from "../../presentation/server-app";
import {CreateTable} from "../../domain/usecases/create-table.usecase";
import {SaveFile} from "../../domain/usecases/save-file.usecase";
import {option} from "yargs";
import any = jasmine.any;

describe('server-app tests', ()=>{

    const options = {
        base            : 2,
        limit           : 10,
        showTable       : false,
        fileDestination : 'test-destination',
        fileName        : 'test-filename'
    }

    test('should create serverApp instance', ()=>{
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')
    });

    test('should run serverApp with options', ()=>{
        const logSpy         = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy    = jest.spyOn(SaveFile.prototype, 'execute');

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
            fileContent     : expect.any(String),
            fileName        : options.fileName,
            fileDestination : options.fileDestination
        });
    });
})