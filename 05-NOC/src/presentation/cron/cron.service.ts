import {CronJob} from "cron";

type cronTime = string | Date;
type onTick = ()=>void;

export class CronService {
    static createJob(cronTime: cronTime, onTick: onTick) {
        const job = new CronJob(
            cronTime,
            onTick
        )

        job.start();

        return job;
    }
}