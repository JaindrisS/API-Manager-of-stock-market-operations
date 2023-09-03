import { User } from "../../shared/interfaces/user.interfaces";
import { Request } from "express";

export interface RequestWithUserRol extends Request {
  user?: User;
}
