import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

const logFilePath = path.join("logs/general-logs");

const logger = () => {
  const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

  return createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      label({ label: "right meow!" }),
      timestamp({ format: "HH:mm:ss" }),
      myFormat
    ),

    transports: [
      new transports.Console(),
      new DailyRotateFile({
        filename: logFilePath,
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "5m",
        maxFiles: "1d",
      }),
    ],
  });
};

export const winstonLogger = logger();
