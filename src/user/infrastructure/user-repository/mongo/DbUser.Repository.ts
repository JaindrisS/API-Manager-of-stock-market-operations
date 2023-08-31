import { userModel } from "./user.model";
import { User } from "../../../domain/user.interfaces";
import { userRepository } from "../../../domain/user.repository";
import { UserDTO, UpdateUserDto, IdParam } from "../../../application/user.dto";

export class UserRepository implements userRepository {
  async getAllUser(): Promise<User[] | null> {
    const data = await userModel.find({ status: true });
    return data;
  }

  async getByEmail(email: string): Promise<User[] | null> {
    const response = await userModel.find({ email: email });

    return response;
  }

  async save(data: UserDTO): Promise<unknown> {
    try {
      const response = new userModel(data);
      await response.save();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<unknown> {
    const response = await userModel.findOneAndUpdate({ _id: id }, data, {
      returnDocument: "after",
    });

    return response;
  }

  async getById(id: IdParam) {
    try {
      const response = await userModel.findById(id);
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteUser(id: string): Promise<unknown> {
    const response = await userModel.findOneAndUpdate(
      { _id: id, status: true },
      { status: false }
    );

    return response;
  }
}
