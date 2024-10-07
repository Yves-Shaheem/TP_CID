import winston from 'winston';
import { format } from 'winston'

export const logger = winston.createLogger({
  level: 'http',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [new winston.transports.Console(),new winston.transports.File({ filename: 'logs/app.log' })],
});