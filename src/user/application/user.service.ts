import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/httpResponse";
import { userRepository } from "../domain/user.repository";
import { UpdateUserDto, UserDTO } from "./user.dto";
import * as bcrypt from "bcrypt";

export class UserService {
  private readonly userRepository: userRepository;
  private readonly httpResponse: HttpResponse;

  constructor(UserRepository: userRepository, httpResponse: HttpResponse) {
    this.userRepository = UserRepository;
    this.httpResponse = httpResponse;
  }

  async getAllUser(res: Response) {
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

  async getByEmail(email: string) {
    const response = await this.userRepository.getByEmail(email);

    if (response?.length === 0) {
      return false;
    }

    return true;
  }

  async createUser(res: Response, data: UserDTO) {
    try {
      const { name, password, email } = data;

      const hastPass = bcrypt.hashSync(password, 10);
      const info = {
        password: hastPass.toString(),
        name: name.toUpperCase(),
        email: email,
      };

      const user = await this.userRepository.save(info);

      return this.httpResponse.Created(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updateUser(res: Response, id: string, data: UpdateUserDto) {
    try {
      const { password, name, email } = data;

      let hastPass;
      if (password) {
        hastPass = bcrypt.hashSync(password, 10).toString();
      }

      let mail;

      if (email) {
        mail = email.toUpperCase();
      }

      let nameUpper;

      if (name) {
        nameUpper = name.toUpperCase();
      }

      const dataUser = {
        password: hastPass,
        name: nameUpper,
        email: mail,
      };

      const user = await this.userRepository.updateUser(id, dataUser);

      return this.httpResponse.OK(res, user);
    } catch (error) {
      console.log(error);

      return this.httpResponse.Error(res, error);
    }
  }
}
