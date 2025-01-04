import {LogDataSource} from "../../domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {LogModel} from "../../data/mongo";

export class MongoDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('log created', newLog);
    }

    async getLogs(logSeverity: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({level: logSeverity});
        return logs.map(mongolog => LogEntity.fromObject(mongolog));
    }
}