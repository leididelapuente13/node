import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import {LogRepository} from "../../domain/repositories/log.repository";
import {LogDataSource} from "../../domain/datasources/log.datasource";



export class LogRepositoryImpl implements LogRepository {

    constructor(private readonly logDatasource: LogDataSource) {}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log)
    }

    async getLogs(logSeverity: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(logSeverity);
    }

}