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

  async getUsers(_req: Request, res: Response) {
    try {
      const response = await this.userService.getAllUser(res);

      return response;
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const response = await this.userService.createUser(res, req.body);
      return response;
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.userService.updateUser(res, id, req.body);

      return response;
    } catch (error) {
      return this.httpResponse.Error(res, console.error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.userService.deleteUser(res,id);

      return response;
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
