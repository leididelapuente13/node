import winston from "winston";

const {combine, timestamp, json} = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
    // defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
    ]
});

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