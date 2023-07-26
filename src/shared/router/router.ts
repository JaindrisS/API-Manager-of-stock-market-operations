import { Router } from "express";

export class BaseRouter<T, U> {
  public router: Router;
  public controller: T;
  public middleware: U;

  constructor(TController: T, UMiddleware: U) {
    this.router = Router();
    this.controller = TController;
    this.middleware = UMiddleware;
    this.routes();
  }

  routes() {}
}
