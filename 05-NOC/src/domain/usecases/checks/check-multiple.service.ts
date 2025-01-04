import {LogRepository} from "../../repositories/log.repository";
import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";

interface ShapeServiceUseCase {
    execute: (url: string) => Promise<boolean>
}

type SuccessCallBack = (() => void | undefined);
type ErrorCallback = ((error: string) => void | undefined);

export class CheckMultipleService implements ShapeServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallBack,
        private readonly errorCallback: ErrorCallback
    ) {
    }

    private callLogsRepository(log: LogEntity){
        this.logRepository.forEach(logRepository => logRepository.saveLog(log));
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }
            const log: LogEntity = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Service ${url} working`,
                origin: 'check.service.ts'
            });
            await this.callLogsRepository(log)
            this.successCallback && this.successCallback()
            return true;
        } catch (error) {
            const errorMessage = `${error} on ${url}`
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Service ${url} is not working`,
                origin: 'check.service.ts'
            })
            await this.callLogsRepository(log)
            this.errorCallback && this.errorCallback(errorMessage)
            return false;
        }
    }
}