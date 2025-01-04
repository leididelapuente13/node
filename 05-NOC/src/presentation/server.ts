import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository";
import {EmailService} from "./email/email.service";
import {PostgresDatasource} from "../infrastructure/datasources/postgres.datasource";
import {CheckMultipleService} from "../domain/usecases/checks/check-multiple.service";
import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";
import {MongoDatasource} from "../infrastructure/datasources/mongo.datasource";
import {CronService} from "./cron/cron.service";

const logRepositoryFS = new LogRepositoryImpl(new FileSystemDatasource);
const logRepositoryMDB = new LogRepositoryImpl(new MongoDatasource);
const logRepositoryPSQL = new LogRepositoryImpl(new PostgresDatasource);

const emailService = new EmailService();

export class Server {
    public static async start(): Promise<void> {

        // console.log("Server started...");

        // new SendLogEmailLogs(emailService, logRepository).execute(
        //     ['leididanielapg2004@gmail.com', 'leididelapuente3@gmail.com']
        // );
        CronService.createJob('*/5 * * * * *', () => {
            const url = 'http://localhost:3000/postss';
            new CheckMultipleService([logRepositoryMDB, logRepositoryPSQL, logRepositoryFS],
                () => {
                    console.log(`success in ${url}`);
                },
                (error) => {
                    console.error(`Error: ${error} in ${url}`);
                }).execute(url);
        });
    }
}