import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { SharedMiddleware } from "../../shared/middleware/shared.middleware";
import { UserDTO } from "../application/user.dto";
import { httpResponse } from "./dependecies";

export class UserMiddleware extends SharedMiddleware {
  constructor() {
    super(httpResponse);
  }

  userValidator(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, img } = req.body;

    const valid = new UserDTO();

    valid.name = name;
    valid.email = email;
    valid.password = password;
    valid.img = img;

    validate(valid, { groups: ["IsEmailAlreadyExist"] }).then((err) => {
      const data = err.map((error) => {
        return error.constraints;
      });

      if (err.length > 0) {
        return this.httpResponse.BadRequest(res, data);
      } else {
        return next();
      }
    });
  }
}
