import { Request, Response } from "express";
import { CustomizedRequest } from "../../../shared/interfaces/shared.Interfaces";
import { HttpResponse } from "../../../shared/response/httpResponse";
import { AuthService } from "../../application/auth.service";
import { PasswordService } from "../../application/password.service";

export class AuthController {
  public readonly authService: AuthService;
  public readonly passwordService: PasswordService;

  public readonly httpResponse: HttpResponse;

  constructor(
    authService: AuthService,
    passwordService: PasswordService,
    httpResponse: HttpResponse
  ) {
    this.authService = authService;
    this.passwordService = passwordService;
    this.httpResponse = httpResponse;
  }

  async login(req: CustomizedRequest, res: Response) {
    try {
      const response = await this.authService.login(req.body, req, res);

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
    const response = this.passwordService.sendMail(req.body, res);

    return response;
  }

  async resetPassword(req: Request, res: Response) {
    const token = <string>req.header("Authorization");

    const response = this.passwordService.resetPassword(res, token, req.body);

    return response;
  }
}
