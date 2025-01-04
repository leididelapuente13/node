export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public message: string;
    public level: LogSeverityLevel;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const {message, level, createdAt = new Date(), origin} = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json;
        const {message, level, createdAt, origin} = JSON.parse(json);

        // if(!message) throw new Error('Message is required');
        // if(!level) throw new Error('Level is required');
        // if(!createdAt) throw new Error('Created at is required');

        let log = new LogEntity({level, message, createdAt, origin});
        log.createdAt = new Date(createdAt);

        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const {message, level, createdAt, origin} = object;

        const log = new LogEntity({level, message, createdAt, origin})

        return log;
    }

}