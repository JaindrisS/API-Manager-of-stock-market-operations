import { HttpResponse } from "../../shared/response/httpResponse";
import { UserService } from "../application/user.service";
import { UserController } from "./rest-api/user.controller";
import { UserRepository } from "../infrastructure/user-repository/mongo/DbUser.Repository";

const hhtpResponse = new HttpResponse();

const userRepository = new UserRepository();

const userService = new UserService(userRepository, hhtpResponse);

export const userController = new UserController(userService, hhtpResponse);
