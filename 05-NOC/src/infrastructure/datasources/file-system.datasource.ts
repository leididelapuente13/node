import {LogDataSource} from "../../domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import * as fs from "node:fs";

export class FileSystemDatasource implements LogDataSource {
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles()
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        try {
            const logAsJson = `${ JSON.stringify(newLog) }\n`;

            fs.appendFileSync( this.allLogsPath, logAsJson );

            if ( newLog.level === LogSeverityLevel.low ) return;

            if ( newLog.level === LogSeverityLevel.medium ) {
                fs.appendFileSync( this.mediumLogsPath, logAsJson );
            } else {
                fs.appendFileSync( this.highLogsPath, logAsJson );
            }

        } catch (error) {
            console.error('Error saving log:', error);
        }
    }

    private getLogsFromFile = (path: string): LogEntity[]=>{
        const content = fs.readFileSync(path, 'utf-8');

        if(content === '') return []

        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );
        return logs;
    }

    async getLogs(logSeverity: LogSeverityLevel): Promise<LogEntity[]> {
        switch (logSeverity){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`log severity is not implemented: ${logSeverity}`);
        }

    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path =>{
            if(fs.existsSync(path)) return

            fs.writeFileSync(path, '')
        })
    }

}