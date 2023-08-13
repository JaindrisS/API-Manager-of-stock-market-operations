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
