import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/httpResponse";
import { UserService } from "../../application/user.service";

export class UserController {
  public readonly userService: UserService;
  public readonly httpResponse: HttpResponse;

  constructor(userService: UserService, httpResponse: HttpResponse) {
    this.userService = userService;
    this.httpResponse = httpResponse;
  }

  async getUsers(req: Request, res: Response) {
    try {
      const response = await this.userService.getAllUser(req, res);

      return response;
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
