import { Response } from "express";
import * as bcrypt from "bcrypt";
import { HttpResponse } from "../../shared/response/httpResponse";
import { authRepository } from "../domain/auth.repository";
import { generateJwt } from "./generateJwt";
import { getEmailTemplate } from "../infrastructure/template";
import { sendEmail } from "../infrastructure/sendMail";
import {
  LoginDto,
  ResetPasswordDto,
  EmailValidationDto,
} from "../domain/auth.dto";

const invalidatedTokens = new Set();

export class AuthService {
  private readonly authRepository: authRepository;
  private readonly httpResponse: HttpResponse;

  constructor(authRepository: authRepository, httpResponse: HttpResponse) {
    this.authRepository = authRepository;
    this.httpResponse = httpResponse;
  }

  async login(data: LoginDto, res: Response) {
    const { email, password } = data;

    try {
      const user = await this.authRepository.getUser(email);

      if (user?.password === undefined || user?.email === undefined) {
        return this.httpResponse.BadRequest(res, "Invalid email or password");
      }

      const comparePassword = bcrypt.compareSync(password, user?.password);

      if (!user?.status || !user || !comparePassword) {
        return this.httpResponse.BadRequest(res, "Invalid email or password");
      }

      const token = await generateJwt(user.id);

      return this.httpResponse.OK(res, {
        msg: "Login ok",
        user,
        token: token,
      });
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async logout(token: string, res: Response) {
    if (token) {
      await this.blacklistToken(token);

      return this.httpResponse.OK(res, "Token invalidated");
    } else {
      return this.httpResponse.BadRequest(res, "No token provided");
    }
  }

  async resetPassword(res: Response, token: string, data: ResetPasswordDto) {
    const { password, password2 } = data;

    const user = await this.authRepository.getByToken(token);

    // validate if the token is already used
    if (!user) {
      return this.httpResponse.Unauthorized(
        res,
        "Must mail request or token has expired"
      );
    }

    if (password !== password2) {
      return this.httpResponse.BadRequest(res, "Passwords do not match");
    }

    // encrypt password
    const newPassword = bcrypt.hashSync(password, 10);

    await this.authRepository.updatePassword(user.id, newPassword);

    // the token already used is cancelled
    await this.authRepository.ResetPassword(user.id, null);

    return this.httpResponse.OK(res, "Password was changed successfully");
  }

  async blacklistToken(token: string) {
    invalidatedTokens.add(token);
  }

  async isTokenBlacklisted(token: string) {
    return invalidatedTokens.has(token);
  }
}
