import winston from "winston";

const {combine, timestamp, json} = winston.format;

const logger = winston.createLogger({
    // level of log
    level: 'info',
    // this combines various types of formats
    format: combine(
        timestamp(),
        json()
    ),

    // with this you can set a default service meaning the part of the application where there was an error
    // defaultMeta: {service: 'user-service'},

    // the way the logs will be saved or display in case of the console
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
    ]
});

// to add a new way to display the logs
logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}))

// winston adapter
const buildLogger = (service) => {
    return {
        log: (message) => {
            logger.log('info', {message, service})
        },
        error: (message) => {
            logger.error('error',
                {
                    message,
                    service,
                    at: new Date().toISOString(),
                })
        }
    }
}

export default buildLogger;