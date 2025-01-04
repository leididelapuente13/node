import {LogDataSource} from "../../domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {PrismaClient, Severitylevel} from "@prisma/client";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: Severitylevel.LOW,
    medium: Severitylevel.MEDIUM,
    high: Severitylevel.HIGH
}

export class PostgresDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level]
        const newLog = await prismaClient.logModel.create({
            data: {...log, level: level}
        })
        console.log('log saved in postgresql');
    }

    async getLogs(logSeverity: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({where: {level: severityEnum[logSeverity]}})
        return logs.map(log => LogEntity.fromObject(log))
    }
}
