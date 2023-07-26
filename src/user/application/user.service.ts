import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/httpResponse";
import { userRepository } from "../domain/user.repository";

export class UserService {
  private readonly userRepository: userRepository;
  private readonly httpResponse: HttpResponse;

  constructor(UserRepository: userRepository, httpResponse: HttpResponse) {
    this.userRepository = UserRepository;
    this.httpResponse = httpResponse;
  }

  async getAllUser(_req: Request, res: Response) {
    try {
      const response = await this.userRepository.getAllUser();
      if (response?.length === 0) {
        return this.httpResponse.NotFound(res, "No data");
      }
      return this.httpResponse.OK(res, response);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
