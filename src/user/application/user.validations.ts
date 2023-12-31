import { registerDecorator, ValidationOptions } from "class-validator";

import { HttpResponse } from "../../shared/response/httpResponse";
import { UserService } from "../application/user.service";
import { UserRepository } from "../infrastructure/user-repository/mongo/DbUser.Repository";
import {
  IsEmailAlreadyExistConstrain,
  MongoIdDoesNotExistConstrain,
} from "../infrastructure/validations/user.validations.constraint";

const httpResponse = new HttpResponse();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, httpResponse);

const isEmailAlreadyExistConstrain = new IsEmailAlreadyExistConstrain(
  userService
);

const mongoIdDoesNotExistConstrain = new MongoIdDoesNotExistConstrain(
  userService
);

export const IsEmailAlreadyExist = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: isEmailAlreadyExistConstrain,
    });
  };
};

export const MongoIdDoesNotExist = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: mongoIdDoesNotExistConstrain,
    });
  };
};
