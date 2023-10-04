import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { SharedMiddleware } from "../../shared/middleware/shared.middleware";
import { HttpResponse } from "../../shared/response/httpResponse";
import { AuthService } from "../application/auth.service";
import { CustomizedRequest } from "../../shared/interfaces/shared.Interfaces";
import { TokenService } from "../application/token.service";

export class AuthMiddleware extends SharedMiddleware {
  private readonly tokenService: TokenService;

  constructor(httpResponse: HttpResponse, tokenService: TokenService) {
    super(httpResponse);
    this.tokenService = tokenService;
  }

  async validateToken(
    req: CustomizedRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = <string>req.header("Authorization");

    const PrivateKey = <string>process.env.JWTPRIVATEKEY;

    if (!token) {
      return this.httpResponse.Unauthorized(
        res,
        "Unauthorized: No token provided"
      );
    }

    const invalidatedTokens = await this.tokenService.isTokenBlacklisted(token);

    if (invalidatedTokens) {
      return this.httpResponse.Unauthorized(
        res,
        "Unauthorized: Token is invalid"
      );
    }

    try {
      const decoded = jwt.verify(token, PrivateKey);
      req.user = decoded;

      return next();
    } catch (error) {
      return this.httpResponse.Unauthorized(res, "Unauthorized: Invalid Token");
    }
  }

  ValidateDto(req: Request, res: Response, next: NextFunction, dto: any) {
    const { email, password, password2 } = req.body;

    const valid = dto;

    valid.email = email;
    valid.password = password;
    valid.password2 = password2;

    validate(valid).then((err) => {
      if (err.length > 0) {
        const response = err.map((error) => {
          return {
            value: error.property,
            error: error.constraints,
          };
        });

        return this.httpResponse.BadRequest(res, response);
      } else {
        return next();
      }
    });
  }
}
