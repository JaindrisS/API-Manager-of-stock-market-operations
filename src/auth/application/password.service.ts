import { Response } from "express";
import * as bcrypt from "bcrypt";
import { generateJwt } from "./generateJwt";
import { HttpResponse } from "../../shared/response/httpResponse";
import { getEmailTemplate } from "../infrastructure/template";
import { sendEmail } from "../infrastructure/sendMail";
import { authRepository } from "../domain/auth.repository";
import { EmailValidationDto, ResetPasswordDto } from "../domain/auth.dto";

export class PasswordService {
  private readonly authRepository: authRepository;
  private readonly httpResponse: HttpResponse;

  constructor(authRepository: authRepository, httpResponse: HttpResponse) {
    this.authRepository = authRepository;
    this.httpResponse = httpResponse;
  }

  async sendMail(data: EmailValidationDto, res: Response) {
    const { email } = data;

    try {
      const user = await this.authRepository.getUser(email);

      if (!user) {
        return this.httpResponse.BadRequest(res, "Mail is incorrect");
      }

      const token = await generateJwt(user?.id);

      const data = { email, token };

      const emailHtmlTemplate = getEmailTemplate(data);

      await sendEmail(email, "Recuperar contrasena", emailHtmlTemplate);

      this.authRepository.ResetPassword(user.id, <string>token);

      return this.httpResponse.OK(res, {
        email,
        token,
        msg: "Email sent successfully!",
      });
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async resetPassword(res: Response, token: string, data: ResetPasswordDto) {
    const { password, password2 } = data;

    const user = await this.authRepository.getByToken(token);

    // validate if the token is already used
    if (!user) {
      return this.httpResponse.Unauthorized(
        res,
        "Must mail request or token has expired"
      );
    }

    if (password !== password2) {
      return this.httpResponse.BadRequest(res, "Passwords do not match");
    }

    // encrypt password
    const newPassword = bcrypt.hashSync(password, 10);

    await this.authRepository.updatePassword(user.id, newPassword);

    // the token already used is cancelled
    await this.authRepository.ResetPassword(user.id, null);

    return this.httpResponse.OK(res, "Password was changed successfully");
  }
}
