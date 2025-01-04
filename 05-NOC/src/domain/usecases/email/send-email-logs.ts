import {EmailService} from "../../../presentation/email/email.service";
import {LogRepository} from "../../repositories/log.repository";
import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";

interface SendLogEmailLogsUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendLogEmailLogs implements SendLogEmailLogsUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly LogRepository: LogRepository
    ) {
    }

    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error('Email log not sent');
            }
            return true;
        } catch (error) {
            const log: LogEntity = new LogEntity({
                message: `Email was not sent ${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts'
            });
            this.LogRepository.saveLog(log);
            return false
        }
    }
}