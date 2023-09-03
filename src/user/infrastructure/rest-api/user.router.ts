import { BaseRouter } from "../../../shared/router/router";
import { userController } from "../dependecies";
import { UserController } from "../rest-api/user.controller";
import {
  userMiddleware,
  userDTO,
  updateUserDto,
  idParam,
} from "../dependecies";
import { UserMiddleware } from "../user.middleware";

export class UserRouters extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(userController, userMiddleware);
  }

  routes(): void {
    this.router.get(
      "/users",
      (req, res,next) => this.middleware.checkAdminRole(req, res,next),
      (req, res) => this.controller.getUsers(req, res)
    );
    this.router.post(
      "/users",
      (req, res, next) =>
        this.middleware.createValidator(req, res, next, userDTO),
      (req, res) => this.controller.createUser(req, res)
    );
    this.router.put(
      "/users/:id",
      (req, res, next) =>
        this.middleware.createValidator(req, res, next, updateUserDto),
      (req, res, next) =>
        this.middleware.idParamValidator(req, res, next, idParam),
      (req, res) => this.controller.updateUser(req, res)
    );

    this.router.delete(
      "/users/:id",
      (req, res, next) =>
        this.middleware.idParamValidator(req, res, next, idParam),
      (req, res) => this.controller.deleteUser(req, res)
    );
  }
}
