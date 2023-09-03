import { BaseRouter } from "../../../shared/router/router";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "../auth.middleware";
import { authController } from "../dependencies";
import { authMiddleware } from "../dependencies";

export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware> {
  constructor() {
    super(authController, authMiddleware);
  }

  routes(): void {
    this.router.post("/login", (req, res) => this.controller.login(req, res));
  }
}
