import { Response, NextFunction } from "express";
import { RoleType } from "../../user/application/user.dto";
import { HttpResponse } from "../response/httpResponse";
import { RequestWithUserRol } from "./shared.Interfaces";

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
}
