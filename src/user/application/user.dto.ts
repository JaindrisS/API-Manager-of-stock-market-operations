import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  Length,
} from "class-validator";
import { IsEmailAlreadyExist } from "./user.validations";
export enum RoleType {
  USER = "USER",
  ADMIN = "ADMIN",
}

export class UserDTO {
  @IsNotEmpty()
  name!: string;

  @IsEmailAlreadyExist({ groups: ["IsEmailAlreadyExist"] })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 12, {
    message: "The password must be between 6 and 12 characters long",
  })
  password!: string;

  @IsOptional()
  img?: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  name!: string | undefined;

  @IsOptional()
  @IsEmailAlreadyExist({ groups: ["IsEmailAlreadyExist"] })
  @IsNotEmpty()
  @IsEmail()
  email!: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(6, 12, {
    message: "The password must be between 6 and 12 characters long",
  })
  password!: string | undefined;

  @IsOptional()
  img?: string;
}
