import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/httpResponse";
import { AuthService } from "../../application/auth.service";

export class AuthController {
  public readonly authService: AuthService;
  public readonly httpResponse: HttpResponse;

  constructor(authService: AuthService, httpResponse: HttpResponse) {
    this.authService = authService;
    this.httpResponse = httpResponse;
  }

  async login(req: Request, res: Response) {
    try {
      const response = await this.authService.login(req.body, res);

      return response;
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const token = <string>req.header("Authorization");

      const response = this.authService.logout(token, res);

      return response;
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async sendMail(req: Request, res: Response) {
    const response = this.authService.sendMail(req.body, res);

    return response;
  }

  async resetPassword(req: Request, res: Response) {
    const token = <string>req.header("Authorization");

    const response = this.authService.resetPassword(res, token, req.body);

    return response;
  }
}
