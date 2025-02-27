import {buildLogger} from "../../plugins";
import {logger as winstonLogger} from "../../plugins/logger.plugin";

describe("loggerPlugin", () => {
    test('buildLogger should return a function logger', ()=>{
        const logger = buildLogger('test');7 

        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');
    })

    test('logger.log should log a message', ()=>{
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');
        const message = "test message";
        const service = "test service";

        const logger = buildLogger(service);
        logger.log(message);

        expect(winstonLoggerMock).toHaveBeenCalledWith('info', expect.objectContaining({
            level: 'info',
            message,
            service
        }))
    })

    test('logger.error should log a message', ()=>{
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'error');
        const message = "test message error";
        const service = "test service";

        const logger = buildLogger(service);
        logger.error(message);

        expect(winstonLoggerMock).toHaveBeenCalledWith('error', expect.objectContaining({
            message,
            service
        }))
    })
})