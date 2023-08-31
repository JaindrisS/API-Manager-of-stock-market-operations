import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { UserService } from "../../application/user.service";

@ValidatorConstraint({ name: "IsEmailAlreadyExistConstrain", async: true })
export class IsEmailAlreadyExistConstrain
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  async validate(email: any, _arg: ValidationArguments): Promise<boolean> {
    return !(await this.userService.getByEmail(email));
  }

  defaultMessage(
    _validationArguments?: ValidationArguments | undefined
  ): string {
    return `${_validationArguments?.value} mail already exists`;
  }
}

@ValidatorConstraint({ name: "MongoIdDoesNotExist", async: true })
export class MongoIdDoesNotExistConstrain
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  async validate(id: any, _arg: ValidationArguments): Promise<boolean> {
    const user = await this.userService.getById(id);

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  defaultMessage(
    _validationArguments?: ValidationArguments | undefined
  ): string {
    return `${_validationArguments?.value} id does not exist`;
  }
}
