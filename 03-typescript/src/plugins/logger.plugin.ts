import winston, {format} from "winston";

const {combine, timestamp, json} = format;

export const logger = winston.createLogger({
    level: "info",
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
    ]
});

logger.add(
    new winston.transports.Console({
        format: format.simple(),
    })
)

const buildLogger = (service: string)=>{
    return {
        log: (message: string)=>{
            logger.log('info', {message, service})
        },
        error: (message: string)=>{
            logger.error('error', {
                message,
                service,
                at: new Date().toISOString()
            })
        }
    }
}

export default buildLogger;