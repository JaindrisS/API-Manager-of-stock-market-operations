import { HttpResponse } from "../../shared/response/httpResponse";
import { UserService } from "../application/user.service";
import { UserController } from "./rest-api/user.controller";
import { UserRepository } from "../infrastructure/user-repository/mongo/DbUser.Repository";
import { UserMiddleware } from "./user.middleware";

export const httpResponse = new HttpResponse();

const userRepository = new UserRepository();

const userService = new UserService(userRepository, httpResponse);

export const userController = new UserController(userService, httpResponse);


export const userMiddleware = new UserMiddleware()