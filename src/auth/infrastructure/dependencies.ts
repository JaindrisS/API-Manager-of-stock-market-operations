import { HttpResponse } from "../../shared/response/httpResponse";
import { AuthService } from "../application/auth.service";
import { AuthMiddleware } from "./auth.middleware";
import { AuthRepository } from "./auth.repository/mongo/DbAuth.Repository";
import { AuthController } from "./rest-api/auth.controller";

const authRepository = new AuthRepository();
const httpResponse = new HttpResponse();
const authService = new AuthService(authRepository, httpResponse);

export const authController = new AuthController(authService, httpResponse);
export const authMiddleware = new AuthMiddleware(httpResponse);
