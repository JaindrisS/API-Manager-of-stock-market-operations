import { User } from "./user.interfaces";
import { Request } from "express";
import { Logger } from "winston";

export interface CustomizedRequest extends Request {
  user?: User | any;
  logger?: Logger;
}
