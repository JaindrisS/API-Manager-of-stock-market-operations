import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailValidationDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class LoginDto extends EmailValidationDto {
  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  password2!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
