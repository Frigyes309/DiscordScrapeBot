import {createLogger, format, transports} from 'winston';

// Create and configure a logger instance
export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => `${timestamp} ${level}: ${message}`),
    ),
    transports: [new transports.Console(), new transports.File({filename: 'bot.log'})],
});
