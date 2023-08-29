import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { SharedMiddleware } from "../../shared/middleware/shared.middleware";
import { UserDTO } from "../application/user.dto";
import { httpResponse } from "./dependecies";

export class UserMiddleware extends SharedMiddleware {
  constructor() {
    super(httpResponse);
  }

  createValidator(req: Request, res: Response, next: NextFunction, dto: any) {
    const { name, email, password, img } = req.body;

    const valid = dto;

    valid.name = name;
    valid.email = email;
    valid.password = password;
    valid.img = img;

    validate(valid).then((err) => {
      if (err.length > 0) {
        const response = err.map((error) => {
          return {
            value: error.property,
            error: error.constraints,
          };
        });

        return this.httpResponse.BadRequest(res, response);
      } else {
        return next();
      }
    });
  }

  idParamValidator(req: Request, res: Response, next: NextFunction, dto: any) {
    const { id } = req.params;

    const valid = dto;

    valid.id = id;
    validate(valid).then((err) => {
      if (err.length > 0) {
        const response = err.map((error) => {
          return {
            value: error.property,
            error: error.constraints,
          };
        });

        return this.httpResponse.BadRequest(res, response);
      } else {
        return next();
      }
    });
  }
}
