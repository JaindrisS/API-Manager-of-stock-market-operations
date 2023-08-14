import { BaseRouter } from "../../../shared/router/router";
import { userController } from "../dependecies";
import { UserController } from "../rest-api/user.controller";
import { userMiddleware } from "../dependecies";
import { UserMiddleware } from "../user.middleware";

export class UserRouters extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(userController, userMiddleware);
  }

  routes(): void {
    this.router.get("/users", (req, res) => this.controller.getUsers(req, res));
    this.router.post(
      "/users",
      (req, res, next) => this.middleware.userValidator(req, res, next),
      (req, res) => this.controller.createUser(req, res)
    );
  }
}
