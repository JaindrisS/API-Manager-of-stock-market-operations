import { Response } from "express";
import * as bcrypt from "bcrypt";
import { HttpResponse } from "../../shared/response/httpResponse";
import { authRepository } from "../domain/auth.repository";
import { generateJwt } from "./generateJwt";

const invalidatedTokens = new Set();

export class AuthService {
  private readonly authRepository: authRepository;
  private readonly httpResponse: HttpResponse;

  constructor(authRepository: authRepository, httpResponse: HttpResponse) {
    this.authRepository = authRepository;
    this.httpResponse = httpResponse;
  }

  async login(email: string, password: string, res: Response) {
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

  async blacklistToken(token: string) {
    invalidatedTokens.add(token);
  }

  async isTokenBlacklisted(token: string) {
    return invalidatedTokens.has(token);
  }
}
