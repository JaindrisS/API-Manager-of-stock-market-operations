import { User } from "../../user/domain/user.interfaces";
import { Request } from "express";

export interface RequestWithUserRol extends Request {
  user?: User;
}
