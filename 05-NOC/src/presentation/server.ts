import {CronService} from "./cron/cron.service";
import {CheckService} from "../domain/usecases/checks/check.service";

export class Server {
    public static start(): void {
        console.log("Server started...");

        CronService.createJob('*/5 * * * * *', () => {
            const url = 'http://localhost:3000/posts';
            new CheckService(
                () => {
                    console.log('success', url)
                },
                (error) => {
                    console.error(`Error: ${error} in ${url}`)
                }
            ).execute(url)
        });
    }
}