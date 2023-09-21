import { HttpResponse } from "../../shared/response/httpResponse";
import { AuthService } from "../application/auth.service";
import { AuthMiddleware } from "./auth.middleware";
import { AuthRepository } from "./auth.repository/mongo/DbAuth.Repository";
import { AuthController } from "./rest-api/auth.controller";
import {
  LoginDto,
  ResetPasswordDto,
  EmailValidationDto,
} from "../domain/auth.dto";
import { PasswordService } from "../application/password.service";
import { TokenService } from "../application/token.service";

const authRepository = new AuthRepository();
const httpResponse = new HttpResponse();
const tokenService = new TokenService();
const authService = new AuthService(authRepository, tokenService, httpResponse);

export const passwordService = new PasswordService(
  authRepository,
  httpResponse
);
export const authController = new AuthController(
  authService,
  passwordService,
  httpResponse
);
export const authMiddleware = new AuthMiddleware(httpResponse, tokenService);

export const loginDto = new LoginDto();
export const resetPasswordDto = new ResetPasswordDto();
export const emailValidationDto = new EmailValidationDto();
