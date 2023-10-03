import { User } from "../../shared/interfaces/user.interfaces";
import { Request } from "express";
import { Logger } from "winston";

export interface RequestWithUserRol extends Request {
  user?: User | any;
  logger?:Logger;
}
