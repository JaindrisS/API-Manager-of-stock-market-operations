import { Response } from "express";
import * as bcrypt from "bcrypt";
import { HttpResponse } from "../../shared/response/httpResponse";
import { authRepository } from "../domain/auth.repository";
import { generateJwt } from "./generateJwt";
import { LoginDto } from "../domain/auth.dto";
import { TokenService } from "./token.service";
import { CustomizedRequest } from "../../shared/interfaces/shared.Interfaces";

export class AuthService {
  private readonly authRepository: authRepository;
  private readonly httpResponse: HttpResponse;
  private readonly tokenService: TokenService;

  constructor(
    authRepository: authRepository,
    tokenService: TokenService,
    httpResponse: HttpResponse
  ) {
    this.authRepository = authRepository;
    this.httpResponse = httpResponse;
    this.tokenService = tokenService;
  }

  async login(data: LoginDto, req: CustomizedRequest, res: Response) {
    const { email, password } = data;
    const { originalUrl, ip, method } = req;
    let blockingTime = 60;
    let maximumAttempts = 3;
    let timeNow = new Date().getTime() / 1000;

    try {
      const user = await this.authRepository.getUser(email);

      // check if the user was blocked for unsuccessful attempts, the counter of unsuccessful attempts is reset
      if (user?.blockedUntil) {
        if (user?.blockedUntil > timeNow) {
          await this.authRepository.updateUnsuccessfulAttempts(
            user.id,
            null,
            0
          );
          return this.httpResponse.Unauthorized(
            res,
            `try again in  ${blockingTime} seconds 1`
          );
        }
      }

      const errorMsg = "Invalid email or password";

      if (user?.password === undefined || user?.email === undefined) {
        req.logger?.info(` ${errorMsg} -  Url:${originalUrl}`);

        return this.httpResponse.BadRequest(res, errorMsg);
      }

      const comparePassword = bcrypt.compareSync(password, user?.password);

      if (!user?.status || !user || !comparePassword) {
        req.logger?.info(
          `MSG: ${errorMsg}  -  URL: ${method} ${originalUrl} - IP: ${ip} - StatusCode: ${400} `
        );

        // update the properties of unsuccessfulAttempts + 1
        await this.authRepository.updateUnsuccessfulAttempts(user.id, 1, null);

        // verify that the UnsuccessfulAttempts property is at least equal to or greater than the number of attempts allowed before blocking
        if (user.unsuccessfulAttempts >= maximumAttempts) {
          await this.authRepository.blockedUntil(
            user.id,
            timeNow + blockingTime
          );
          return this.httpResponse.Unauthorized(
            res,
            `try again in  ${blockingTime} seconds 2`
          );
        }
        return this.httpResponse.BadRequest(res, "Invalid email or password");
      }

      // the counter of unsuccessful attempts is reset
      await this.authRepository.updateUnsuccessfulAttempts(user.id, null, 0);

      const token = await generateJwt(user.id);

      req.logger?.info(
        `MSG: Login ok  -  URL: ${method} ${originalUrl} - IP: ${ip} - StatusCode: ${200} `
      );

      return this.httpResponse.OK(res, {
        msg: "Login ok",
        user,
        token: token,
      });
    } catch (error) {
      req.logger?.error(
        `MSG: Error  -  URL: ${method} ${originalUrl} - IP: ${ip} - StatusCode: ${500} `
      );

      return this.httpResponse.Error(res, error);
    }
  }

  async logout(token: string, res: Response) {
    if (token) {
      await this.tokenService.blacklistToken(token);

      return this.httpResponse.OK(res, "Token invalidated");
    } else {
      return this.httpResponse.BadRequest(res, "No token provided");
    }
  }
}
