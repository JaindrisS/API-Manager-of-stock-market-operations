import { BaseRouter } from "../../../shared/router/router";
import { userController } from "../dependecies";
import { UserController } from "../rest-api/user.controller";
import { sharedMiddleware } from "../../../shared/middleware/SharedDependencies";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";

export class UserRouters extends BaseRouter<UserController, SharedMiddleware> {
  constructor() {
    super(userController, sharedMiddleware);
  }

  routes(): void {
    this.router.get("/users", (req, res) => this.controller.getUsers(req, res));
  }
}
