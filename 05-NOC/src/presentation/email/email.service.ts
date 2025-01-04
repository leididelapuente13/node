import nodemailer from 'nodemailer';
import {envs} from "../../config/plugins/envs.plugin";
import {LogRepository} from "../../domain/repositories/log.repository";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";

interface sendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {user: envs.MAILER_EMAIL, pass: envs.MAILER_SECRET_KEY}
    });

    async sendEmail(options: sendEmailOptions): Promise<boolean> {
        const {to, subject, htmlBody, attachments = []} = options;

        try{
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            })
            return true;
        }catch(error){
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody = '<h1>Here are your logs</h1>';
        const attachments: Attachment[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log',
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log',
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log',
            }
        ];
        await this.sendEmail({to, subject, htmlBody, attachments});
    }

}