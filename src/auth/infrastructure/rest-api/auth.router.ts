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
    this.router.get(
      "/test",
      (req, res, next) => this.middleware.validateToken(req, res, next),
      (_req, res) => {
        return res.json("Test Ok");
      }
    );

    this.router.post("/login", (req, res) => this.controller.login(req, res));
    this.router.post(
      "/logout",

      (req, res) => this.controller.logout(req, res)
    );
  }
}
