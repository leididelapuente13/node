import {LogEntity, LogSeverityLevel} from "../entities/log.entity";

export abstract class LogDataSource {
    abstract saveLog (log: LogEntity): Promise<void>;
    abstract getLogs (logSeverity: LogSeverityLevel): Promise<LogEntity[]>;
}