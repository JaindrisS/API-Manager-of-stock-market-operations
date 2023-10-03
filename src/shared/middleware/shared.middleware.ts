import { Response, NextFunction } from "express";
import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { RoleType } from "../../user/application/user.dto";
import { HttpResponse } from "../response/httpResponse";
import { RequestWithUserRol } from "./shared.Interfaces";

const { combine, timestamp, label, printf } = format;

const logFilePath = path.join("logs/custom-logs");

export class SharedMiddleware {
  public httpResponse: HttpResponse;
  constructor(httpResponse: HttpResponse) {
    this.httpResponse = httpResponse;
  }

  checkUserRole(req: RequestWithUserRol, res: Response, next: NextFunction) {
    const user = req.user;

    if (user?.rol !== RoleType.USER) {
      return this.httpResponse.Unauthorized(res, "You do not have permission");
    }

    return next;
  }

  checkAdminRole(req: RequestWithUserRol, res: Response, next: NextFunction) {
    const user = req.user;

    if (user?.rol !== RoleType.ADMIN) {
      return this.httpResponse.Unauthorized(res, "You do not have permission");
    }

    return next;
  }

  customLoggerMiddleware = (
    req: RequestWithUserRol,
    _res: Response,
    next: NextFunction
  ) => {
    const myFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message} `;
    });

    req.logger = createLogger({
      level: "info",
      format: combine(
        format.colorize(),
        label({ label: "right meow!" }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
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

    next();
  };
}
