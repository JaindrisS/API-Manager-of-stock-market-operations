import { userModel } from "./user.model";
import { User } from "../../../domain/user.interfaces";
import { userRepository } from "../../../domain/user.repository";
import { UserDTO } from "../../../application/user.dto";

export class UserRepository implements userRepository {
  async getAllUser(): Promise<User[] | null> {
    const data = await userModel.find({ status: true });
    return data;
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
}
